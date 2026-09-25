import { useState } from 'react';
import { SectionLabel, Empty, AdmissionBadge } from '../../components/Common';
import { usePortal } from '../../lib/PortalContext';
import { fmtDate, fmtMoney } from '../../lib/utils';
import { courseById, studentById, setEnrollmentStatus, saveEnrollmentNote } from '../../lib/actions';

export default function AdminEnrollments() {
  const portal = usePortal();
  const { data } = portal;
  const sorted = [...data.enrollments].sort((a, b) => b.enrolledAt.localeCompare(a.enrolledAt));
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  function noteFor(enrollmentId: string, saved: string) {
    return noteDrafts[enrollmentId] !== undefined ? noteDrafts[enrollmentId] : saved || '';
  }

  async function markActive(enrollmentId: string, saved: string) {
    const note = noteFor(enrollmentId, saved);
    const err = await setEnrollmentStatus(portal, enrollmentId, 'Active', note);
    if (err) portal.flash('err', err);
  }

  async function saveNote(enrollmentId: string) {
    const note = noteFor(enrollmentId, '');
    await saveEnrollmentNote(portal, enrollmentId, note);
  }

  return (
    <>
      <SectionLabel>ALL ENROLLMENTS ({data.enrollments.length})</SectionLabel>
      {sorted.length === 0 ? (
        <Empty>No enrollments yet.</Empty>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Registration ID</th><th>Student</th><th>Course</th><th>Fee</th><th>Status</th><th>Enrolled on</th>
              <th>Payment / transaction details</th><th></th>
            </tr>
            {sorted.map((e) => {
              const st = studentById(data.students, e.studentId);
              const c = courseById(data.courses, e.courseId);
              const saved = e.paymentNote || '';
              const draft = noteFor(e.id, saved);
              const canActivate = e.status === 'Active' || draft.trim().length > 0;
              return (
                <tr key={e.id}>
                  <td><span className="id-chip">{e.id}</span></td>
                  <td>{st ? st.name : '—'}</td>
                  <td>{c ? c.name : '—'}</td>
                  <td>{fmtMoney(e.fee)}</td>
                  <td><AdmissionBadge status={e.status} /></td>
                  <td>{fmtDate(e.enrolledAt.slice(0, 10))}</td>
                  <td style={{ minWidth: 220 }}>
                    <textarea
                      rows={2}
                      placeholder="e.g. UPI ref 123456789, ₹5,000 received 12 Oct"
                      style={{ width: '100%', fontSize: 12.5, padding: '6px 8px' }}
                      value={draft}
                      onChange={(ev) => setNoteDrafts((prev) => ({ ...prev, [e.id]: ev.target.value }))}
                      onBlur={() => {
                        if (draft !== saved) saveNote(e.id);
                      }}
                    />
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {e.status !== 'Active' && (
                      <button
                        className="btn small green"
                        disabled={!canActivate}
                        title={canActivate ? '' : 'Enter payment/transaction details before marking Active'}
                        onClick={() => markActive(e.id, saved)}
                      >
                        Mark Active
                      </button>
                    )}{' '}
                    {e.status !== 'Pending' && (
                      <button className="btn small secondary" onClick={() => setEnrollmentStatus(portal, e.id, 'Pending')}>
                        Mark Pending
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-soft)' }}>
        Payment/transaction details are required before a student can be marked Active — the note saves automatically when you
        click away from the field, and is stored permanently against the enrollment as a record of what was checked. The student
        is emailed automatically when their status changes.
      </div>
    </>
  );
}
