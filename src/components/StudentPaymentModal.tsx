import React, { useState } from 'react';
import { Program, StudentAccount, CoursePurchase } from '../types';
import { useYoga } from '../context/YogaContext';
import { 
  X, CheckCircle2, QrCode, CreditCard, Landmark, ShieldCheck, 
  ArrowRight, Download, Sparkles, AlertCircle, FileText, Lock
} from 'lucide-react';
import { LotusFlower } from './BotanicalAssets';

interface StudentPaymentModalProps {
  program: Program;
  student: StudentAccount;
  onClose: () => void;
  onSuccess: (purchase: CoursePurchase) => void;
}

export const StudentPaymentModal: React.FC<StudentPaymentModalProps> = ({
  program,
  student,
  onClose,
  onSuccess
}) => {
  const { purchaseCourse, updateStudentProfile } = useYoga();

  // Step flow: 'intake' -> 'payment' -> 'success'
  const [step, setStep] = useState<'intake' | 'payment' | 'success'>('intake');

  // Intake Form ("Write about themselves in a form")
  const [bioSnippet, setBioSnippet] = useState(student.bio || '');
  const [intent, setIntent] = useState(student.intentAndGoals || '');
  const [healthNotes, setHealthNotes] = useState(student.healthConditions || 'None');
  const [profession, setProfession] = useState(student.profession || '');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<CoursePurchase['paymentMethod']>('UPI / QR Code');
  const [upiId, setUpiId] = useState(`${student.name.toLowerCase().replace(/\s+/g, '')}@okaxis`);
  const [cardName, setCardName] = useState(student.name);
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('742');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedPurchase, setCompletedPurchase] = useState<CoursePurchase | null>(null);

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update student's profile with what they wrote about themselves
    updateStudentProfile({
      bio: bioSnippet,
      intentAndGoals: intent,
      healthConditions: healthNotes,
      profession: profession || student.profession
    });
    setStep('payment');
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const intakeSummary = `Enrolled via Portal. Intent: ${intent || 'Study & Certification'}. Health Notes: ${healthNotes}`;
      const purchase = purchaseCourse(program.id, paymentMethod, intakeSummary);

      setIsProcessing(false);
      if (purchase) {
        setCompletedPurchase(purchase);
        setStep('success');
        onSuccess(purchase);
      }
    }, 1200);
  };

  const handleDownloadInvoice = () => {
    if (!completedPurchase) return;
    const invoiceContent = `
===================================================================
                  ISHWARI YOGA INSTITUTE, PUNE
     Viman Nagar, Pune, Maharashtra 411014 | +91 98220 12345
                 FEE RECEIPT & TAX INVOICE
===================================================================
Receipt No: ${completedPurchase.receiptNumber}
Date of Payment: ${completedPurchase.purchaseDate}
Transaction ID: ${completedPurchase.transactionId}

STUDENT DETAILS:
Name: ${student.name}
Email: ${student.email}
Phone: ${student.phone}
City/State: ${student.city}, ${student.state}

ENROLLMENT DETAILS:
Program: ${program.name}
Duration: ${program.duration}
Batch Commencement: ${program.startingDate}
Total Fees Paid: ${completedPurchase.amountPaid}
Mode of Payment: ${completedPurchase.paymentMethod}
Payment Status: VERIFIED & CONFIRMED (PAID)

Included Features:
- Complete Live & Recorded Video Lectures (LMS Access)
- Sanskrit Sutra Commentaries & Anatomical Handbooks
- All Examination and YCB Assessment Registrations
- Direct Mentorship by Devika Bhide & Shweta Vaikunthe

Thank you for embarking on your sadhana with Ishwari Yoga Institute.
Hari Om Tat Sat.
===================================================================
    `.trim();

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ishwari_Yoga_Invoice_${completedPurchase.receiptNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      id="student-payment-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 'payment') onClose();
      }}
    >
      <div className="bg-primary-white border border-biscuit/40 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 relative text-left">
        
        {/* Header Bar */}
        <div className="p-5 border-b border-biscuit/25 bg-[#FDFCFA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-olive-green/10 text-olive-green rounded-xl">
              <LotusFlower size={24} />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-espresso">
                {step === 'intake' && 'Student Enrollment & Background Intake'}
                {step === 'payment' && 'Secure Fee Checkout'}
                {step === 'success' && 'Enrollment & Payment Confirmed'}
              </h3>
              <p className="font-sans text-xs text-espresso/60">
                {program.name} • {program.fees}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-espresso/40 hover:text-espresso p-1.5 rounded-lg hover:bg-espresso/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="px-6 py-2.5 bg-warm-beige/30 border-b border-biscuit/20 flex items-center justify-between text-xs font-sans">
          <div className={`flex items-center gap-1.5 ${step === 'intake' ? 'text-olive-green font-bold' : 'text-espresso/60'}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">1</span>
            <span>About Yourself</span>
          </div>
          <div className="h-px w-8 bg-biscuit/40" />
          <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-olive-green font-bold' : 'text-espresso/60'}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">2</span>
            <span>Fee Payment</span>
          </div>
          <div className="h-px w-8 bg-biscuit/40" />
          <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-olive-green font-bold' : 'text-espresso/60'}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">3</span>
            <span>Instant Access</span>
          </div>
        </div>

        {/* STEP 1: Intake Form ("write about themselves in a form") */}
        {step === 'intake' && (
          <form onSubmit={handleIntakeSubmit} className="p-6 space-y-5">
            <div className="p-3.5 bg-warm-beige/20 border border-biscuit/30 rounded-xl space-y-1">
              <span className="text-[11px] font-mono uppercase text-olive-green font-bold">
                Student Intake for Devika Bhide & Shweta Vaikunthe
              </span>
              <p className="font-sans text-xs text-espresso/80 leading-relaxed">
                Before commencing your sadhana, please share your yogic background, personal goals, and any health conditions so our faculty can tailor posture modifications for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={student.name}
                  className="w-full px-3 py-2 bg-warm-beige/30 border border-biscuit/30 rounded-lg text-sm font-sans text-espresso cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Profession / Occupation
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="e.g. Software Engineer, Doctor, Teacher, Homemaker"
                  className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Tell Us About Yourself (Your Yogic Bio) *
              </label>
              <textarea
                required
                rows={3}
                value={bioSnippet}
                onChange={(e) => setBioSnippet(e.target.value)}
                placeholder="Share your personal story, what brought you to yoga, your daily routine, and what inspires your practice..."
                className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Why do you wish to join this program? (Intent & Goals) *
              </label>
              <textarea
                required
                rows={2}
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="e.g. To clear YCB Level 2, start teaching in corporate spaces, deepen pranayama understanding, personal healing..."
                className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Health Notes or Physical Limitations (if any)
              </label>
              <input
                type="text"
                value={healthNotes}
                onChange={(e) => setHealthNotes(e.target.value)}
                placeholder="e.g. None, lower back stiffness, knee sensitivity, cervical spondylosis..."
                className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-biscuit/20">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-sans text-espresso/70 hover:text-espresso"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-intake-btn"
                className="px-5 py-2.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Continue to Fee Payment</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Simulator */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            
            {/* Fee summary card */}
            <div className="p-4 bg-warm-beige/30 border border-biscuit/40 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-espresso/60 block">
                  Course Enrollment Fee
                </span>
                <strong className="font-cinzel text-lg text-espresso block">{program.name}</strong>
                <span className="text-xs font-sans text-espresso/70">
                  Batches start: {program.startingDate} • Duration: {program.duration}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-bold text-olive-green block">
                  {program.fees}
                </span>
                <span className="text-[10px] font-sans text-espresso/50 uppercase">All-Inclusive</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70">
                Select Payment Mode
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI / QR Code')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'UPI / QR Code'
                      ? 'border-olive-green bg-olive-green/5 text-olive-green font-bold shadow-xs'
                      : 'border-biscuit/30 text-espresso/70 hover:bg-warm-beige/20'
                  }`}
                >
                  <QrCode size={20} className="mx-auto mb-1" />
                  <span className="text-xs font-sans block">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit / Debit Card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'Credit / Debit Card'
                      ? 'border-olive-green bg-olive-green/5 text-olive-green font-bold shadow-xs'
                      : 'border-biscuit/30 text-espresso/70 hover:bg-warm-beige/20'
                  }`}
                >
                  <CreditCard size={20} className="mx-auto mb-1" />
                  <span className="text-xs font-sans block">Debit / Credit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Net Banking')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'Net Banking'
                      ? 'border-olive-green bg-olive-green/5 text-olive-green font-bold shadow-xs'
                      : 'border-biscuit/30 text-espresso/70 hover:bg-warm-beige/20'
                  }`}
                >
                  <Landmark size={20} className="mx-auto mb-1" />
                  <span className="text-xs font-sans block">Net Banking</span>
                </button>
              </div>
            </div>

            {/* Payment Method Details */}
            {paymentMethod === 'UPI / QR Code' && (
              <div className="p-4 bg-primary-white border border-biscuit/30 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Stylized QR Code Box */}
                  <div className="p-3 bg-white border border-biscuit/40 rounded-xl shadow-xs text-center shrink-0">
                    <div className="w-28 h-28 bg-[#2A2B2A] rounded-lg p-2 flex flex-col items-center justify-center text-white text-center">
                      <QrCode size={56} className="text-primary-white" />
                      <span className="text-[8px] font-mono tracking-tighter mt-1 text-primary-white/80">
                        SCAN & PAY UPI
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-espresso/60 block mt-1">
                      HDFC Bank UPI QR
                    </span>
                  </div>

                  <div className="space-y-2 flex-grow text-center sm:text-left">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-olive-green font-bold">
                        Official VPA / UPI ID:
                      </span>
                      <div className="p-2 bg-warm-beige/40 rounded border border-biscuit/30 font-mono text-xs text-espresso select-all font-semibold">
                        ishwariyoga@okhdfcbank
                      </div>
                    </div>
                    <p className="text-xs font-sans text-espresso/70">
                      Scan using Google Pay, PhonePe, Paytm, or enter your UPI ID below.
                    </p>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-espresso/60 block mb-0.5">
                        Your UPI ID (for verification)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Credit / Debit Card' && (
              <div className="p-4 bg-primary-white border border-biscuit/30 rounded-xl space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono uppercase text-espresso/60 block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded text-xs font-sans text-espresso"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-espresso/60 block mb-1">
                    Card Number (Visa / Mastercard / RuPay)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-espresso/60 block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-espresso/60 block mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded text-xs font-mono text-espresso"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Net Banking' && (
              <div className="p-4 bg-primary-white border border-biscuit/30 rounded-xl space-y-3">
                <label className="text-xs font-mono uppercase text-espresso/70 block">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-sans transition-all cursor-pointer ${
                        selectedBank === bank
                          ? 'border-olive-green bg-olive-green/10 text-olive-green font-bold'
                          : 'border-biscuit/30 text-espresso/80 hover:bg-warm-beige/20'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Security note */}
            <div className="flex items-center gap-2 text-[11px] font-sans text-espresso/60">
              <Lock size={13} className="text-olive-green shrink-0" />
              <span>256-bit encrypted academic transaction. Instant LMS access will be activated.</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-biscuit/20">
              <button
                type="button"
                onClick={() => setStep('intake')}
                className="px-4 py-2 text-xs font-sans text-espresso/70 hover:text-espresso"
              >
                Back to Intake
              </button>
              <button
                type="button"
                id="complete-fee-payment-btn"
                disabled={isProcessing}
                onClick={handleProcessPayment}
                className="px-6 py-3 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Confirming Fee Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Pay {program.fees} & Enroll</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 'success' && completedPurchase && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-olive-green font-bold">
                Payment Confirmed • Admission Granted
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-espresso">
                Welcome to {program.name}
              </h3>
              <p className="font-sans text-xs text-espresso/70 max-w-md mx-auto">
                Your course seat has been secured. Your student dashboard now has full access to the recorded sessions, lecture notes, and curriculum syllabus.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-warm-beige/30 border border-biscuit/40 rounded-xl text-left space-y-2 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-espresso/60">Receipt Number:</span>
                <strong className="font-mono text-espresso">{completedPurchase.receiptNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Transaction ID:</span>
                <span className="font-mono text-espresso/80">{completedPurchase.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Payment Mode:</span>
                <span className="text-espresso">{completedPurchase.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-espresso/60">Fees Paid:</span>
                <strong className="font-mono text-olive-green">{completedPurchase.amountPaid}</strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="px-4 py-2.5 border border-biscuit/40 rounded-lg text-xs font-sans font-semibold text-espresso hover:bg-warm-beige/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Download Fee Receipt</span>
              </button>
              <button
                type="button"
                id="view-course-materials-btn"
                onClick={onClose}
                className="px-6 py-2.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Go to Student Learning Hub</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
