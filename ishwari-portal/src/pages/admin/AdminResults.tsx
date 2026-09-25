import { useState } from 'react';
import { Empty } from '../../components/Common';
import { usePortal } from '../../lib/PortalContext';
import { courseStatus } from '../../lib/utils';
import { buildCSV, downloadCSV, parseCSV, readFileAsText } from '../../lib/csv';
import { publishResult, processResultsCSVRows, studentById, type BulkResultsOutcome } from '../../lib/actions';
import { sendEmail } from '../../lib/notifications';
import CertificateUpload from './CertificateUpload';

const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

type RowInput = { score: string; grade: string; pass: 'pass' | 'fail' };

export default function AdminResults() {
  const portal = usePortal();
  const { data } = portal;
  const eligible = data.courses.filter((c) => courseStatus(c) !== 'upcoming');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bulkSummary, setBulkSummary] = useState<{ updated: number; notFound: string[] } | null>(null);
  const [rowInputs, setRowInputs] = useState<Record<string, RowInput>>({});
  const [rowLevel, setRowLevel] = useState<Record<string, string>>({});

  const activeId = selectedId || (eligible[0] && eligible[0].id) || null;
  const roster = activeId ? data.enrollments.filter((e) => e.courseId === activeId) : [];

  function levelFor(enrollmentId: string) {
    return rowLevel[enrollmentId] || 'L1';
  }
  function setLevel(enrollmentId: string, level: string) {
    setRowLevel((prev) => ({ ...prev, [enrollmentId]: level }));
  }

  function key(enrollmentId: string, level: string) {
    return `${enrollmentId}::${level}`;
  }

  function inputFor(enrollmentId: string, level: string): RowInput {
    const k = key(enrollmentId, level);
    if (rowInputs[k]) return rowInputs[k];
    const existing = data.results.find((r) => r.enrollmentId === enrollmentId && r.level === level);
    return {
      score: existing ? existing.score : '',
      grade: existing ? existing.grade : '',
      pass: existing ? (existing.pass ? ('pass' as const) : ('fail' as const)) : ('pass' as const),
    };
  }

  function setInput(enrollmentId: string, level: string, patch: Partial<RowInput>) {
    const k = key(enrollmentId, level);
    setRowInputs((prev) => ({ ...prev, [k]: { ...inputFor(enrollmentId, level), ...patch } }));
  }

  async function doPublish(enrollmentId: string) {
    const level = levelFor(enrollmentId);
    const input = inputFor(enrollmentId, level);
    const err = await publishResult(portal, enrollmentId, level, input.score, input.grade, input.pass === 'pass');
    if (err) portal.flash('err', err);
  }

  function downloadRoster() {
    if (!activeId) return;
    const course = data.courses.find((x) => x.id === activeId);
    const header = ['RegistrationID', 'StudentName', 'Level', 'Score', 'Course', 'Start Date', 'End Date', 'Grade', 'Result'];
    const rows: (string | number)[][] = [header];
    roster.forEach((e) => {
      const st = studentById(data.students, e.studentId);
      const existingForStudent = data.results.filter((x) => x.enrollmentId === e.id);
      if (existingForStudent.length === 0) {
        // No results yet — give the admin one blank row to fill in (they can duplicate it for extra levels).
        rows.push([e.id, st ? st.name : '', '', '', course ? course.name : '', course ? course.startDate : '', course ? course.endDate : '', '', '']);
      } else {
        existingForStudent.forEach((r) => {
          rows.push([
            e.id, st ? st.name : '', r.level, r.score,
            course ? course.name : '', course ? course.startDate : '', course ? course.endDate : '',
            r.grade, r.pass ? 'Pass' : 'Fail',
          ]);
        });
      }
    });
    downloadCSV(`roster-${course ? course.name.replace(/[^a-z0-9]+/gi, '-') : activeId}.csv`, buildCSV(rows));
  }

  async function onBulkFile(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files && evt.target.files[0];
    if (!file || !activeId) return;
    const text = await readFileAsText(file);
    const { outcome, nextResults }: { outcome: BulkResultsOutcome; nextResults: typeof data.results } = processResultsCSVRows(
      parseCSV(text),
      activeId,
      data.enrollments,
      data.results
    );
    if (outcome.error) {
      portal.flash('err', outcome.error);
      return;
    }
    await portal.setCollection('results', nextResults);
    setBulkSummary({ updated: outcome.updated, notFound: outcome.notFound });
    // Email each touched student, mirroring the original bulk-upload behaviour.
    // outcome.touched entries are "enrollmentId::level".
    outcome.touched.forEach((touchedKey) => {
      const [enrollmentId, level] = touchedKey.split('::');
      const en = data.enrollments.find((x) => x.id === enrollmentId);
      const r = nextResults.find((x) => x.enrollmentId === enrollmentId && x.level === level);
      const st = en && studentById(data.students, en.studentId);
      const c = en && data.courses.find((x) => x.id === en.courseId);
      if (st && c && r) {
        sendEmail(
          data.settings,
          st.email,
          st.name,
          'Your result is published',
          `Your ${level} result for ${c.name}: Score ${r.score}${r.grade ? ', Grade ' + r.grade : ''} — ${r.pass ? 'Pass' : 'Fail'}.`
        ).catch(() => {});
      }
    });
  }

  return (
    <>
      <div className="panel accent">
        <h2>Update results &amp; certificates</h2>
        <div className="sub">
          Each course can have several levels (L1-L6), each with its own result. Only courses that have started can have
          results recorded. To just view what's already been entered, use Review Results instead.
        </div>
        <div className="field">
          <label>Course</label>
          <select
            value={activeId || ''}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setBulkSummary(null);
            }}
          >
            {eligible.length === 0 ? (
              <option value="">No started courses yet</option>
            ) : (
              eligible.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {!activeId ? (
        <Empty>Select a course above once it has started to record results.</Empty>
      ) : (
        <>
          <div className="panel" style={{ marginBottom: 18 }}>
            <h2 style={{ fontSize: 16 }}>Bulk update via CSV</h2>
            <div className="sub">
              Download the roster (one row per level already recorded, or a blank row per student if none yet), fill in
              Level / Score / Grade / Result offline — duplicate a row to add another level for the same student — then
              upload it back. Matches rows by Registration ID + Level.
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn secondary small" onClick={downloadRoster}>Download roster CSV</button>
              <label className="btn secondary small file-btn">
                Upload results CSV
                <input type="file" accept=".csv" onChange={onBulkFile} />
              </label>
            </div>
            {bulkSummary && (
              <div className={`msg ${bulkSummary.notFound.length ? 'err' : 'ok'}`} style={{ marginTop: 12 }}>
                Updated {bulkSummary.updated} result(s).
                {bulkSummary.notFound.length ? ` Not matched to this course: ${bulkSummary.notFound.join(', ')}` : ''}
              </div>
            )}
          </div>

          {roster.length === 0 ? (
            <Empty>No students enrolled in this course yet.</Empty>
          ) : (
            <table>
              <tbody>
                <tr><th>Student</th><th>Reg. ID</th><th>Level</th><th>Score</th><th>Grade</th><th>Result</th><th></th></tr>
                {roster.map((e) => {
                  const st = studentById(data.students, e.studentId);
                  const level = levelFor(e.id);
                  const existing = data.results.find((r) => r.enrollmentId === e.id && r.level === level);
                  const input = inputFor(e.id, level);
                  const levelsWithResults = new Set(data.results.filter((r) => r.enrollmentId === e.id).map((r) => r.level));
                  return (
                    <tr key={e.id}>
                      <td>{st ? st.name : '—'}</td>
                      <td><span className="id-chip">{e.id}</span></td>
                      <td>
                        <select style={{ width: 80 }} value={level} onChange={(ev) => setLevel(e.id, ev.target.value)}>
                          {LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl}>
                              {lvl}{levelsWithResults.has(lvl) ? ' ✓' : ''}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          style={{ width: 70 }}
                          type="number"
                          min={0}
                          max={100}
                          value={input.score}
                          onChange={(ev) => setInput(e.id, level, { score: ev.target.value })}
                        />
                      </td>
                      <td>
                        <input style={{ width: 60 }} placeholder="A" value={input.grade} onChange={(ev) => setInput(e.id, level, { grade: ev.target.value })} />
                      </td>
                      <td>
                        <select style={{ width: 100 }} value={input.pass} onChange={(ev) => setInput(e.id, level, { pass: ev.target.value as 'pass' | 'fail' })}>
                          <option value="pass">Pass</option>
                          <option value="fail">Fail</option>
                        </select>
                      </td>
                      <td>
                        <button className={`btn small ${existing ? 'secondary' : 'green'}`} onClick={() => doPublish(e.id)}>
                          {existing ? 'Update' : 'Publish'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <CertificateUpload courseId={activeId} />
        </>
      )}
    </>
  );
}
