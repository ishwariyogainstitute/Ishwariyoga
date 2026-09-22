import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { StudentAccount, ExamResult } from '../types';
import { 
  GraduationCap, Award, BookOpen, Video, Plus, Trash2, 
  CheckCircle2, Clock, Calendar, User, FileText, Sparkles, X, ChevronDown, ChevronUp
} from 'lucide-react';

interface AdminStudentPortalTabProps {
  onSuccessMsg: (msg: string) => void;
  onErrorMsg: (msg: string) => void;
}

export const AdminStudentPortalTab: React.FC<AdminStudentPortalTabProps> = ({
  onSuccessMsg,
  onErrorMsg
}) => {
  const { 
    studentAccounts, 
    programs, 
    addExamResult, 
    deleteStudentAccount,
    recordedSessions,
    courseMaterials
  } = useYoga();

  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(studentAccounts[0]?.id || null);

  // Issue Exam Result Modal State
  const [gradingStudent, setGradingStudent] = useState<StudentAccount | null>(null);
  const [examProgramName, setExamProgramName] = useState(programs[0]?.name || 'Yoga Teacher Education Program (YTEP)');
  const [examYcbLevel, setExamYcbLevel] = useState('YCB Level 2 - Yoga Wellness Instructor');
  const [examTheory, setExamTheory] = useState<number>(90);
  const [examPractical, setExamPractical] = useState<number>(92);
  const [examViva, setExamViva] = useState<number>(90);
  const [examPedagogy, setExamPedagogy] = useState<number>(94);
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [evaluatorName, setEvaluatorName] = useState('Devika Bhide & Shweta Vaikunthe');
  const [evaluatorRemarks, setEvaluatorRemarks] = useState(
    'Demonstrated supreme mastery over asana alignment, scriptural shlokas from Patanjali Yoga Sutras, and classical shatkarma cleansings.'
  );

  const handleOpenGrading = (student: StudentAccount) => {
    setGradingStudent(student);
    if (student.enrolledCourses.length > 0) {
      setExamProgramName(student.enrolledCourses[0].programName);
    }
  };

  const handleIssueCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingStudent) return;

    const totalObtained = Number(examTheory) + Number(examPractical) + Number(examViva) + Number(examPedagogy);
    const totalMax = 400;
    const percentage = Number(((totalObtained / totalMax) * 100).toFixed(1));
    const grade = percentage >= 90 ? 'A+ (Distinction)' : percentage >= 80 ? 'A (Exemplary)' : 'B+ (Merit)';

    const newCertNo = `IYS-YCB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    addExamResult(gradingStudent.id, {
      programId: gradingStudent.enrolledCourses[0]?.programId || programs[0]?.id || 'prog-ytep',
      programName: examProgramName,
      ycbLevel: examYcbLevel,
      examDate: examDate,
      theoryMarks: Number(examTheory),
      practicalMarks: Number(examPractical),
      vivaMarks: Number(examViva),
      teachingPedagogyMarks: Number(examPedagogy),
      totalObtained: totalObtained,
      totalMax: totalMax,
      percentage: percentage,
      grade: grade,
      status: 'Passed with Distinction',
      certificateNumber: newCertNo,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      evaluatorName: evaluatorName,
      evaluatorRemarks: evaluatorRemarks
    });

    onSuccessMsg(`Official Certificate ${newCertNo} and exam results successfully issued to ${gradingStudent.name}!`);
    setGradingStudent(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-biscuit/20">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-espresso flex items-center gap-2">
            <GraduationCap size={20} className="text-olive-green" />
            <span>Registered Student Accounts & LMS Portal</span>
          </h2>
          <p className="text-xs text-espresso/65 font-sans">
            Review student intakes, what they wrote about themselves, their purchased courses & payments, and issue official exam certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 bg-olive-green/10 text-olive-green rounded-lg border border-olive-green/20 font-bold">
            {studentAccounts.length} Registered Sadhakas
          </span>
          <span className="px-2.5 py-1 bg-warm-beige/40 text-espresso rounded-lg border border-biscuit/30">
            {recordedSessions.length} Video Sessions
          </span>
        </div>
      </div>

      {/* Student Accounts List */}
      <div className="space-y-4">
        {studentAccounts.map((student) => {
          const isExpanded = expandedStudentId === student.id;
          return (
            <div
              key={student.id}
              className="bg-[#FCFBF7] border border-biscuit/40 rounded-xl overflow-hidden shadow-2xs transition-all"
            >
              {/* Summary Bar */}
              <div 
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-warm-beige/20 transition-colors"
                onClick={() => setExpandedStudentId(isExpanded ? null : student.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-olive-green/10 text-olive-green flex items-center justify-center font-bold font-cinzel text-sm shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="font-cinzel text-base text-espresso">{student.name}</strong>
                      <span className="text-[10px] font-mono px-2 py-0.2 bg-warm-beige/50 border border-biscuit/30 rounded text-espresso/70">
                        {student.city}, {student.state}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-espresso/60 block">
                      {student.email} • {student.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans text-espresso/70">
                    Enrolled Courses: <strong className="text-olive-green font-mono">{student.enrolledCourses.length}</strong>
                  </span>
                  <span className="text-xs font-sans text-espresso/70">
                    Certificates: <strong className="text-espresso font-mono">{student.examResults.length}</strong>
                  </span>
                  <div className="p-1 text-espresso/40">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {/* Detailed View */}
              {isExpanded && (
                <div className="p-5 border-t border-biscuit/20 bg-primary-white space-y-6">
                  
                  {/* Form Submission: "Write about themselves" */}
                  <div className="space-y-3">
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-olive-green border-b border-biscuit/20 pb-1 flex items-center gap-1.5">
                      <User size={14} />
                      <span>Student Intake Dossier (What they wrote about themselves)</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-lg space-y-1">
                        <span className="text-[10px] font-mono uppercase text-espresso/60 font-semibold block">
                          Yogic Bio & Personal Journey:
                        </span>
                        <p className="text-espresso/85 leading-relaxed">
                          {student.bio || 'No bio submitted yet.'}
                        </p>
                      </div>

                      <div className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-lg space-y-1">
                        <span className="text-[10px] font-mono uppercase text-espresso/60 font-semibold block">
                          Aspirations, Intent & Learning Goals:
                        </span>
                        <p className="text-espresso/85 leading-relaxed">
                          {student.intentAndGoals || 'Deepen sadhana and seek certification.'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
                      <div className="p-2.5 bg-warm-beige/10 border border-biscuit/20 rounded">
                        <span className="text-[10px] text-espresso/60 block uppercase font-mono">Profession</span>
                        <strong className="text-espresso">{student.profession || 'Practitioner'}</strong>
                      </div>
                      <div className="p-2.5 bg-warm-beige/10 border border-biscuit/20 rounded">
                        <span className="text-[10px] text-espresso/60 block uppercase font-mono">Experience</span>
                        <strong className="text-espresso">{student.yogicExperience}</strong>
                      </div>
                      <div className="p-2.5 bg-warm-beige/10 border border-biscuit/20 rounded">
                        <span className="text-[10px] text-espresso/60 block uppercase font-mono">Dietary</span>
                        <strong className="text-espresso">{student.dietaryPreference || 'Sattvic'}</strong>
                      </div>
                      <div className="p-2.5 bg-warm-beige/10 border border-biscuit/20 rounded">
                        <span className="text-[10px] text-espresso/60 block uppercase font-mono">Health Notes</span>
                        <strong className="text-espresso">{student.healthConditions || 'None'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Enrolled Courses & Payments */}
                  <div className="space-y-3">
                    <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-olive-green border-b border-biscuit/20 pb-1 flex items-center gap-1.5">
                      <FileText size={14} />
                      <span>Enrolled Courses & Fee Payment Status</span>
                    </h4>

                    {student.enrolledCourses.length > 0 ? (
                      <div className="space-y-2">
                        {student.enrolledCourses.map((c) => (
                          <div key={c.id} className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans">
                            <div>
                              <strong className="font-cinzel text-sm text-espresso block">{c.programName}</strong>
                              <span className="font-mono text-[11px] text-espresso/60">
                                Enrolled on {c.purchaseDate} • Payment Mode: {c.paymentMethod} • Txn ID: {c.transactionId}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded font-mono text-[11px] font-bold">
                                Paid {c.amountPaid}
                              </span>
                              <span className="px-2 py-0.5 bg-warm-beige/40 rounded border border-biscuit/30 font-mono text-[10px] text-espresso/70">
                                {c.receiptNumber}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs font-sans text-espresso/60 italic">No courses purchased yet.</p>
                    )}
                  </div>

                  {/* Issued Exam Results & Certificates */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-biscuit/20 pb-1">
                      <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-olive-green flex items-center gap-1.5">
                        <Award size={14} />
                        <span>Issued Exam Results & Certificates</span>
                      </h4>

                      <button
                        type="button"
                        onClick={() => handleOpenGrading(student)}
                        className="px-3 py-1 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-[11px] font-sans font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Plus size={13} />
                        <span>Issue Exam Result & Certificate</span>
                      </button>
                    </div>

                    {student.examResults.length > 0 ? (
                      <div className="space-y-2">
                        {student.examResults.map((res) => (
                          <div key={res.id} className="p-3 bg-olive-green/5 border border-olive-green/20 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                            <div>
                              <strong className="font-cinzel text-sm text-espresso block">{res.programName}</strong>
                              <span className="font-mono text-[11px] text-olive-green font-semibold">
                                {res.certificateNumber} • {res.ycbLevel} • Issued: {res.issueDate}
                              </span>
                              <p className="font-serif italic text-espresso/70 text-[11px] mt-0.5">
                                "{res.evaluatorRemarks}"
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-mono font-bold text-sm text-olive-green block">
                                {res.totalObtained}/{res.totalMax} ({res.percentage}%)
                              </span>
                              <span className="text-[10px] font-sans text-espresso/70 block">
                                {res.grade}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs font-sans text-espresso/60 italic">No exam result or certificate recorded yet for this student.</p>
                    )}
                  </div>

                  {/* Delete student account */}
                  <div className="pt-3 border-t border-biscuit/20 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        deleteStudentAccount(student.id);
                        onSuccessMsg(`Student account for ${student.name} deleted.`);
                      }}
                      className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-red-200"
                    >
                      <Trash2 size={13} />
                      <span>Remove Student Account</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: Issue Exam Result & Certificate */}
      {gradingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-primary-white border border-biscuit/40 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 relative text-left">
            <div className="p-5 border-b border-biscuit/25 bg-[#FDFCFA] flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-base font-bold text-espresso flex items-center gap-2">
                  <Award size={18} className="text-olive-green" />
                  <span>Issue Exam Clearance & Certificate</span>
                </h3>
                <span className="text-xs font-sans text-espresso/60">
                  Candidate: <strong>{gradingStudent.name}</strong> ({gradingStudent.email})
                </span>
              </div>
              <button
                onClick={() => setGradingStudent(null)}
                className="text-espresso/40 hover:text-espresso p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleIssueCertificateSubmit} className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono uppercase text-espresso/70 mb-1">
                  Program / Course Title
                </label>
                <input
                  type="text"
                  required
                  value={examProgramName}
                  onChange={(e) => setExamProgramName(e.target.value)}
                  className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-espresso/70 mb-1">
                  Accreditation / YCB Qualification Level
                </label>
                <select
                  value={examYcbLevel}
                  onChange={(e) => setExamYcbLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
                >
                  <option value="YCB Level 1 - Yoga Protocol Instructor">YCB Level 1 - Yoga Protocol Instructor</option>
                  <option value="YCB Level 2 - Yoga Wellness Instructor">YCB Level 2 - Yoga Wellness Instructor</option>
                  <option value="YCB Level 3 - Yoga Teacher & Evaluator">YCB Level 3 - Yoga Teacher & Evaluator</option>
                  <option value="YCB Level 4 - Yoga Master">YCB Level 4 - Yoga Master</option>
                  <option value="Institute Diploma in Yogic Sciences">Institute Diploma in Yogic Sciences</option>
                </select>
              </div>

              {/* Marks Section */}
              <div className="p-3 bg-warm-beige/25 border border-biscuit/30 rounded-xl space-y-3">
                <span className="text-[10px] font-mono uppercase text-olive-green font-bold block">
                  Examination Marks (Out of 100 Each)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[10px] text-espresso/60 block">Theory /100</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={examTheory}
                      onChange={(e) => setExamTheory(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-espresso/60 block">Practical /100</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={examPractical}
                      onChange={(e) => setExamPractical(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-espresso/60 block">Viva Shloka /100</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={examViva}
                      onChange={(e) => setExamViva(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-espresso/60 block">Pedagogy /100</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={examPedagogy}
                      onChange={(e) => setExamPedagogy(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-espresso/70 mb-1">
                  Evaluator Remarks / Commendation
                </label>
                <textarea
                  rows={2}
                  required
                  value={evaluatorRemarks}
                  onChange={(e) => setEvaluatorRemarks(e.target.value)}
                  className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-biscuit/20">
                <button
                  type="button"
                  onClick={() => setGradingStudent(null)}
                  className="px-3 py-1.5 text-espresso/60 hover:text-espresso"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Award size={14} />
                  <span>Confer Certificate & Save Marks</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
