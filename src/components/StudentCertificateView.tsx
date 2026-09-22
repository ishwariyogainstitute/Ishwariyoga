import React from 'react';
import { ExamResult, StudentAccount } from '../types';
import { Award, Download, Printer, CheckCircle2, Shield, Calendar, Sparkles } from 'lucide-react';
import { LotusFlower, PeepalLeaf } from './BotanicalAssets';

interface StudentCertificateViewProps {
  student: StudentAccount;
  examResult: ExamResult;
  onClose?: () => void;
}

export const StudentCertificateView: React.FC<StudentCertificateViewProps> = ({
  student,
  examResult,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const content = `
===================================================================
                  ISHWARI YOGA INSTITUTE, PUNE
          Accredited by Yoga Certification Board (YCB),
                 Ministry of AYUSH, Govt of India
===================================================================

CERTIFICATE OF MERIT & PROFESSIONAL CLEARANCE

This is to solemnly certify that:
${student.name.toUpperCase()}

has successfully fulfilled all prescribed academic, scriptural, and
clinical practical requirements for the program:
${examResult.programName}
Level: ${examResult.ycbLevel}

Examination Date: ${examResult.examDate}
Certificate Identification Code: ${examResult.certificateNumber}
Performance Assessment: ${examResult.percentage}% (${examResult.grade})

Scores:
- Theory Examination: ${examResult.theoryMarks}/100
- Practical Asana & Cleansing: ${examResult.practicalMarks}/100
- Scriptural Viva & Shloka: ${examResult.vivaMarks}/100
- Teaching Methodology: ${examResult.teachingPedagogyMarks}/100
- Aggregate: ${examResult.totalObtained}/${examResult.totalMax}

Evaluator Remarks:
"${examResult.evaluatorRemarks}"

Lead Faculty & Custodians:
Devika Bhide (M.A. Yogashastra, YCB Level 4 & 7)
Shweta Vaikunthe (M.A. Yogashastra, YCB Level 4 & 7)

Location: Ishwari Yoga Institute, Viman Nagar, Pune, Maharashtra
Date of Issuance: ${examResult.issueDate}
===================================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ishwari_Yoga_Certificate_${examResult.certificateNumber.replace(/\//g, '_')}_${student.name.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Certificate Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-primary-white border border-biscuit/30 rounded-xl shadow-xs print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-olive-green/10 text-olive-green rounded-lg">
            <Award size={22} />
          </div>
          <div>
            <h4 className="font-cinzel text-sm font-bold text-espresso">
              Official Verified Credential
            </h4>
            <span className="font-mono text-xs text-olive-green font-semibold">
              ID: {examResult.certificateNumber} • Status: {examResult.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-2 bg-warm-beige/50 hover:bg-warm-beige border border-biscuit/40 rounded-lg text-xs font-sans font-semibold text-espresso flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print Official Certificate"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            title="Download Certificate Dossier"
          >
            <Download size={14} />
            <span>Download Certificate</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-biscuit/30 hover:bg-espresso/5 rounded-lg text-xs font-sans text-espresso/70"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Official Certificate Visual Frame */}
      <div 
        id="printable-certificate"
        className="relative bg-[#FCFBF7] border-8 border-double border-[#8C7A5B] p-8 md:p-14 rounded-2xl shadow-xl overflow-hidden print:p-8 print:border-4 print:shadow-none"
      >
        {/* Decorative corner ornaments */}
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-olive-green pointer-events-none" />
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-olive-green pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-olive-green pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-olive-green pointer-events-none" />

        {/* Faint Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <LotusFlower size={420} className="text-olive-green" />
        </div>

        <div className="relative z-10 text-center space-y-6">
          {/* Header & Crest */}
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-warm-beige/40 text-olive-green mb-1">
              <LotusFlower size={42} />
            </div>
            <h2 className="font-cinzel text-2xl md:text-3xl font-bold tracking-[0.15em] text-espresso uppercase">
              Ishwari Yoga Institute
            </h2>
            <p className="font-sans text-xs tracking-[0.25em] text-espresso/70 uppercase">
              Pune, Maharashtra • Established 2018
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-olive-green/10 border border-olive-green/20 rounded-full text-[11px] font-sans font-semibold text-olive-green">
              <Shield size={12} />
              <span>Accredited Under Ministry of AYUSH • Yoga Certification Board (YCB) Protocols</span>
            </div>
          </div>

          <div className="py-2">
            <span className="font-serif italic text-sm md:text-base text-espresso/70">
              By the authority of the Board of Evaluators and Academic Council, this
            </span>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold tracking-[0.1em] text-[#8C7A5B] uppercase mt-1">
              Certificate of Academic & Practical Excellence
            </h3>
            <span className="font-serif italic text-sm md:text-base text-espresso/70 block mt-1">
              is solemnly conferred upon
            </span>
          </div>

          {/* Student Recipient Name */}
          <div className="py-2">
            <span className="block font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-espresso border-b-2 border-[#8C7A5B]/40 pb-3 max-w-xl mx-auto tracking-wide">
              {student.name}
            </span>
            <span className="font-sans text-xs text-espresso/60 mt-2 block tracking-wider">
              Student ID: {student.id} • Residence: {student.city}, {student.state}
            </span>
          </div>

          {/* Award Narrative */}
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="font-sans text-sm md:text-base text-espresso/85 leading-relaxed">
              who has successfully cleared the rigorous curriculum, scriptural examinations in Patanjali Yoga Sutras,
              clinical shatkarma evaluations, and demonstrated master-level pedagogical competence in:
            </p>
            <div className="p-3 bg-warm-beige/30 border border-biscuit/30 rounded-lg">
              <span className="font-cinzel text-base md:text-lg font-bold text-espresso block">
                {examResult.programName}
              </span>
              <span className="font-mono text-xs font-semibold text-olive-green mt-0.5 block">
                Official Credential Level: {examResult.ycbLevel}
              </span>
            </div>
          </div>

          {/* Examination Merit & Marks Summary */}
          <div className="max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="p-2.5 bg-primary-white border border-biscuit/30 rounded-lg">
              <span className="text-[10px] font-sans text-espresso/60 uppercase block">Theory</span>
              <strong className="font-mono text-sm text-espresso">{examResult.theoryMarks} / 100</strong>
            </div>
            <div className="p-2.5 bg-primary-white border border-biscuit/30 rounded-lg">
              <span className="text-[10px] font-sans text-espresso/60 uppercase block">Practical</span>
              <strong className="font-mono text-sm text-espresso">{examResult.practicalMarks} / 100</strong>
            </div>
            <div className="p-2.5 bg-primary-white border border-biscuit/30 rounded-lg">
              <span className="text-[10px] font-sans text-espresso/60 uppercase block">Viva Shloka</span>
              <strong className="font-mono text-sm text-espresso">{examResult.vivaMarks} / 100</strong>
            </div>
            <div className="p-2.5 bg-olive-green/10 border border-olive-green/20 rounded-lg">
              <span className="text-[10px] font-sans text-olive-green uppercase block font-semibold">Grade</span>
              <strong className="font-mono text-sm text-olive-green">{examResult.grade}</strong>
            </div>
          </div>

          {/* Evaluator Remarks Quote */}
          {examResult.evaluatorRemarks && (
            <div className="max-w-xl mx-auto px-4 py-2 border-l-2 border-olive-green bg-primary-white/80 rounded-r text-left">
              <span className="text-[10px] font-mono uppercase text-olive-green block font-bold">
                Evaluator Commendation:
              </span>
              <p className="font-serif italic text-xs text-espresso/80 mt-0.5">
                "{examResult.evaluatorRemarks}"
              </p>
            </div>
          )}

          {/* Signatures & Seal Section */}
          <div className="pt-8 grid grid-cols-3 items-end gap-4 border-t border-biscuit/40">
            {/* Signature 1 */}
            <div className="text-center space-y-1">
              <div className="h-12 flex items-center justify-center">
                <span className="font-serif italic text-lg text-espresso/90 tracking-wider">
                  Devika Bhide
                </span>
              </div>
              <div className="border-t border-espresso/30 pt-1">
                <strong className="font-sans text-xs text-espresso block">Devika Bhide</strong>
                <span className="font-sans text-[10px] text-espresso/60 block leading-tight">
                  Co-Founder & Lead Faculty<br />
                  M.A. Yogashastra • YCB L4/L7 Master
                </span>
              </div>
            </div>

            {/* Gold Embossed Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-[#8C7A5B] bg-gradient-to-br from-[#E6D5B8] via-[#F5ECE0] to-[#C9B28F] shadow-md flex flex-col items-center justify-center p-1 text-center relative">
                <Sparkles size={14} className="text-[#8C7A5B] mb-0.5" />
                <span className="font-cinzel text-[8px] font-bold text-espresso uppercase tracking-tighter leading-none">
                  Verified Seal
                </span>
                <span className="font-mono text-[7px] text-espresso/70 mt-0.5 leading-none">
                  PUNE, IN
                </span>
                <span className="font-sans text-[6px] text-olive-green font-bold mt-0.5">
                  ★ AYUSH ★
                </span>
              </div>
              <span className="font-mono text-[9px] text-espresso/60 mt-1 font-semibold">
                No: {examResult.certificateNumber}
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center space-y-1">
              <div className="h-12 flex items-center justify-center">
                <span className="font-serif italic text-lg text-espresso/90 tracking-wider">
                  Shweta Vaikunthe
                </span>
              </div>
              <div className="border-t border-espresso/30 pt-1">
                <strong className="font-sans text-xs text-espresso block">Shweta Vaikunthe</strong>
                <span className="font-sans text-[10px] text-espresso/60 block leading-tight">
                  Co-Founder & Clinical Director<br />
                  M.A. Yogashastra • YCB L4/L7 Master
                </span>
              </div>
            </div>
          </div>

          {/* Footer Validation Token */}
          <div className="pt-2 text-center text-[10px] font-mono text-espresso/50">
            Issued on {examResult.issueDate} • Verifiable at Ishwari Yoga Institute Academic Register • Security Hash: SHA256-IYS-CERT-{examResult.certificateNumber.replace(/[^a-zA-Z0-9]/g, '')}
          </div>

        </div>
      </div>
    </div>
  );
};
