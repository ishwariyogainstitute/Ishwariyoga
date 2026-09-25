import { useState } from 'react';
import { Empty } from '../../components/Common';
import { usePortal } from '../../lib/PortalContext';
import { studentById } from '../../lib/actions';
import { parseDate } from '../../lib/utils';

const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

export default function AdminReviewResults() {
  const { data } = usePortal();
  const sortedCourses = [...data.courses].sort((a, b) => parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeId = selectedId || (sortedCourses[0] && sortedCourses[0].id) || null;
  const roster = activeId ? data.enrollments.filter((e) => e.courseId === activeId) : [];
  const course = activeId ? data.courses.find((c) => c.id === activeId) : null;

  // One row per (student, level) that has a result and/or certificate for this course.
  type Row = { enrollmentId: string; level: string; score?: string; grade?: string; pass?: boolean; certUrl?: string; certType?: string };
  const rows: Row[] = [];
  roster.forEach((e) => {
    const levelsSeen = new Set<string>();
    data.results.filter((r) => r.enrollmentId === e.id).forEach((r) => levelsSeen.add(r.level));
    data.certificates.filter((c) => c.enrollmentId === e.id).forEach((c) => levelsSeen.add(c.level));
    LEVELS.filter((lvl) => levelsSeen.has(lvl)).forEach((level) => {
      const r = data.results.find((x) => x.enrollmentId === e.id && x.level === level);
      const c = data.certificates.find((x) => x.enrollmentId === e.id && x.level === level);
      rows.push({
        enrollmentId: e.id,
        level,
        score: r?.score,
        grade: r?.grade,
        pass: r?.pass,
        certUrl: c?.url,
        certType: c?.certType,
      });
    });
  });

  return (
    <>
      <div className="panel accent">
        <h2>Review results &amp; certificates</h2>
        <div className="sub">Select any course to see every enrolled student's result and certificate status, level by level, once they've been uploaded.</div>
        <div className="field">
          <label>Course</label>
          <select value={activeId || ''} onChange={(e) => setSelectedId(e.target.value)}>
            {sortedCourses.length === 0 ? (
              <option value="">No courses published yet</option>
            ) : (
              sortedCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {!activeId ? (
        <Empty>Publish a course first to review results and certificates.</Empty>
      ) : roster.length === 0 ? (
        <Empty>No students enrolled in {course?.name} yet.</Empty>
      ) : rows.length === 0 ? (
        <Empty>No results or certificates have been recorded for {course?.name} yet.</Empty>
      ) : (
        <table>
          <tbody>
            <tr><th>Student</th><th>Reg. ID</th><th>Level</th><th>Score</th><th>Grade</th><th>Result</th><th>Certificate</th></tr>
            {rows.map((row) => {
              const e = roster.find((x) => x.id === row.enrollmentId)!;
              const st = studentById(data.students, e.studentId);
              return (
                <tr key={row.enrollmentId + row.level}>
                  <td>{st ? st.name : '—'}</td>
                  <td><span className="id-chip">{row.enrollmentId}</span></td>
                  <td><span className="badge ongoing">{row.level}</span></td>
                  <td>{row.score ?? '—'}</td>
                  <td>{row.grade || '—'}</td>
                  <td>{row.pass === undefined ? '—' : row.pass ? <span className="badge ongoing">Pass</span> : <span className="badge completed">Fail</span>}</td>
                  <td>
                    {row.certUrl ? (
                      <a href={row.certUrl} target="_blank" rel="noopener noreferrer" title={row.certType}>
                        View ✓
                      </a>
                    ) : (
                      <span style={{ color: 'var(--ink-soft)' }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
