import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { StudentAccount, Program } from '../types';
import { X, LogIn, UserPlus, Sparkles, CheckCircle2, Shield, Lock, Mail, Phone, MapPin, User, BookOpen, ArrowRight } from 'lucide-react';
import { LotusFlower } from './BotanicalAssets';

interface StudentAuthModalProps {
  initialMode?: 'login' | 'register';
  initialProgramId?: string;
  onClose: () => void;
  onSuccess?: (selectedProgramId?: string) => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  initialMode = 'login',
  initialProgramId,
  onClose,
  onSuccess
}) => {
  const { studentAccounts, programs, loginStudent, registerStudent } = useYoga();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedProgramId, setSelectedProgramId] = useState<string>(initialProgramId || '');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regState, setRegState] = useState('Maharashtra');
  const [regProfession, setRegProfession] = useState('');
  const [regBio, setRegBio] = useState('');
  const [regError, setRegError] = useState('');

  const targetProgram = programs.find(p => p.id === selectedProgramId);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginStudent(loginEmail, loginPassword);
    if (success) {
      if (onSuccess) onSuccess(selectedProgramId || undefined);
      onClose();
    } else {
      setLoginError('Invalid email or password. You can also use the One-Click Demo Student button below.');
    }
  };

  const handleDemoLogin = () => {
    // Demo student is Priya Sharma
    const demo = studentAccounts[0];
    if (demo) {
      loginStudent(demo.email, demo.password);
      if (onSuccess) onSuccess(selectedProgramId || undefined);
      onClose();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regName || !regEmail || !regPassword) {
      setRegError('Please provide your name, email, and password.');
      return;
    }

    if (studentAccounts.some(s => s.email.toLowerCase() === regEmail.trim().toLowerCase())) {
      setRegError('An account with this email already exists. Please log in.');
      return;
    }

    registerStudent({
      name: regName,
      email: regEmail.trim().toLowerCase(),
      password: regPassword,
      phone: regPhone || '+91 98000 00000',
      city: regCity || 'Pune',
      state: regState || 'Maharashtra',
      country: 'India',
      bio: regBio || 'Seeker on the path of authentic traditional yoga.',
      yogicExperience: 'Beginner',
      intentAndGoals: 'Deepen personal sadhana and explore YCB certification.',
      profession: regProfession || 'Yoga Sadhaka'
    });

    if (onSuccess) onSuccess(selectedProgramId || undefined);
    onClose();
  };

  return (
    <div 
      id="student-auth-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-primary-white border border-biscuit/40 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-8 relative text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-biscuit/25 bg-[#FDFCFA] text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-espresso/40 hover:text-espresso p-1.5 rounded-lg hover:bg-espresso/5 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <div className="inline-flex items-center justify-center p-2 rounded-full bg-olive-green/10 text-olive-green mb-2">
            <LotusFlower size={28} />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-espresso">
            {targetProgram ? 'Member Login & Course Registration' : 'Student & Member Portal'}
          </h3>
          <p className="font-sans text-xs text-espresso/60 mt-0.5">
            {targetProgram 
              ? `Sign in or register to enroll in ${targetProgram.name}`
              : 'Sign in to access your enrolled courses, lectures, materials, or register for new programs'}
          </p>

          {/* Active Course Banner if selected */}
          {targetProgram && (
            <div className="mt-3 p-3 bg-olive-green/10 border border-olive-green/30 rounded-xl text-left flex items-start gap-2.5">
              <BookOpen size={16} className="text-olive-green shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[10px] font-mono text-olive-green uppercase tracking-wider font-bold block">
                  Enrolling in Course
                </span>
                <span className="font-cinzel text-xs font-bold text-espresso block">
                  {targetProgram.name}
                </span>
                <span className="text-[11px] font-sans text-espresso/70 block mt-0.5">
                  Duration: {targetProgram.duration} • Fees: {targetProgram.fees}
                </span>
              </div>
            </div>
          )}

          {/* Tab Switcher */}
          <div className="flex border border-biscuit/30 rounded-xl p-1 mt-4 bg-warm-beige/30">
            <button
              type="button"
              id="student-login-tab"
              onClick={() => { setMode('login'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-primary-white text-espresso shadow-xs'
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              Member Login
            </button>
            <button
              type="button"
              id="student-register-tab"
              onClick={() => { setMode('register'); setRegError(''); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-primary-white text-espresso shadow-xs'
                  : 'text-espresso/60 hover:text-espresso'
              }`}
            >
              New Member Registration
            </button>
          </div>
        </div>

        {/* Quick Demo Student Option */}
        <div className="px-6 pt-4 pb-2">
          <div className="p-3 bg-olive-green/5 border border-olive-green/20 rounded-xl flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-olive-green font-bold block">
                Instant Demo Access
              </span>
              <p className="text-xs font-sans text-espresso/80">
                Log in as <strong>Priya Sharma</strong> (Enrolled Sadhaka with lectures, course materials & certificate)
              </p>
            </div>
            <button
              type="button"
              id="demo-student-login-btn"
              onClick={handleDemoLogin}
              className="px-3.5 py-1.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider shrink-0 transition-colors shadow-xs cursor-pointer"
            >
              Demo Login
            </button>
          </div>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 pt-3 space-y-4">
            {loginError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-sans">
                {loginError}
              </div>
            )}

            {/* Course Selector in Login */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Course You Wish to Register For (Optional)
              </label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
              >
                <option value="">-- General Student Login / Select Later in Portal --</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.fees})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Student Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-2.5 text-espresso/40" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. priya.sharma@gurukul.in"
                  className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-2.5 text-espresso/40" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-[11px] font-sans text-espresso/50">
                  Demo password: <code className="text-olive-green font-mono">yoga123password</code>
                </span>
              </div>
            </div>

            <button
              type="submit"
              id="student-signin-submit-btn"
              className="w-full py-2.5 bg-espresso hover:bg-espresso/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <LogIn size={15} />
              <span>
                {targetProgram ? `Login & Register for ${targetProgram.name}` : 'Sign In to Student Portal'}
              </span>
            </button>
          </form>
        )}

        {/* Registration Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 pt-3 space-y-3.5 max-h-[65vh] overflow-y-auto">
            {regError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-sans">
                {regError}
              </div>
            )}

            {/* Course Selector in Registration */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Select Course to Register & Enroll In
              </label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="w-full px-3 py-2 bg-warm-beige/20 border border-biscuit/50 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green font-medium cursor-pointer"
              >
                <option value="">-- Choose Course to Enroll (or Register as General Member) --</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.fees} ({p.duration})
                  </option>
                ))}
              </select>
              {targetProgram ? (
                <p className="text-[11px] text-olive-green font-sans mt-1">
                  ✓ After account creation, you will proceed directly to course intake and payment receipt.
                </p>
              ) : (
                <p className="text-[11px] text-espresso/60 font-sans mt-1">
                  You can register for any course immediately now or choose from your portal catalog later.
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-2.5 text-espresso/40" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ananya Deshmukh"
                  className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-2.5 text-espresso/40" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-2.5 text-espresso/40" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-2.5 text-espresso/40" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-2.5 text-espresso/40" />
                  <input
                    type="text"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    placeholder="Pune, Mumbai, Delhi..."
                    className="w-full pl-9 pr-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Profession / Background
              </label>
              <input
                type="text"
                value={regProfession}
                onChange={(e) => setRegProfession(e.target.value)}
                placeholder="e.g. Architect, Yoga Practitioner, Doctor, Teacher"
                className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-espresso/70 mb-1">
                Write a brief note about yourself (Your Yogic Bio)
              </label>
              <textarea
                rows={2}
                value={regBio}
                onChange={(e) => setRegBio(e.target.value)}
                placeholder="Tell us what brought you to yoga and what you hope to learn..."
                className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green leading-relaxed"
              />
            </div>

            <button
              type="submit"
              id="student-register-submit-btn"
              className="w-full py-2.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <UserPlus size={15} />
              <span>
                {targetProgram ? `Register as Member & Enroll in Course` : 'Create Account & Enter Member Portal'}
              </span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
