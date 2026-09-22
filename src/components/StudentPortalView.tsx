import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { Program, CoursePurchase, ExamResult, RecordedSession, CourseMaterial } from '../types';
import { 
  GraduationCap, BookOpen, Video, Award, User, ShoppingBag, 
  Play, Download, CheckCircle2, Calendar, Clock, Sparkles, 
  ExternalLink, FileText, ChevronRight, LogOut, Edit3, Shield,
  CreditCard, Search, ArrowRight, Music, AlertCircle, Info
} from 'lucide-react';
import { LotusFlower, PeepalLeaf } from './BotanicalAssets';
import { StudentAuthModal } from './StudentAuthModal';
import { StudentPaymentModal } from './StudentPaymentModal';
import { StudentCertificateView } from './StudentCertificateView';

interface StudentPortalViewProps {
  onNavigateDetail?: (view: [string, string]) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({ onNavigateDetail }) => {
  const { 
    currentStudent, 
    logoutStudent, 
    updateStudentProfile, 
    programs, 
    recordedSessions, 
    courseMaterials 
  } = useYoga();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'learning' | 'materials' | 'purchase' | 'profile' | 'results'>('learning');
  
  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [purchasingProgram, setPurchasingProgram] = useState<Program | null>(null);
  
  // Video player state
  const [activeVideoSession, setActiveVideoSession] = useState<RecordedSession | null>(() => {
    return recordedSessions[0] || null;
  });

  // Selected certificate modal state
  const [selectedExamForCert, setSelectedExamForCert] = useState<ExamResult | null>(null);

  // Profile Form States ("write about themselves in a form")
  const [profileName, setProfileName] = useState(currentStudent?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentStudent?.phone || '');
  const [profileCity, setProfileCity] = useState(currentStudent?.city || '');
  const [profileState, setProfileState] = useState(currentStudent?.state || 'Maharashtra');
  const [profileProfession, setProfileProfession] = useState(currentStudent?.profession || '');
  const [profileYogicExp, setProfileYogicExp] = useState(currentStudent?.yogicExperience || 'Intermediate (2-5 Years)');
  const [profileBio, setProfileBio] = useState(currentStudent?.bio || '');
  const [profileIntent, setProfileIntent] = useState(currentStudent?.intentAndGoals || '');
  const [profileDiet, setProfileDiet] = useState(currentStudent?.dietaryPreference || 'Strict Vegetarian / Sattvic Diet');
  const [profileHealth, setProfileHealth] = useState(currentStudent?.healthConditions || 'None');
  const [profileEmergency, setProfileEmergency] = useState(currentStudent?.emergencyContact || '');
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  // Course Filter for sessions and materials
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // If student updates or changes, sync local form
  React.useEffect(() => {
    if (currentStudent) {
      setProfileName(currentStudent.name);
      setProfilePhone(currentStudent.phone);
      setProfileCity(currentStudent.city);
      setProfileState(currentStudent.state);
      setProfileProfession(currentStudent.profession);
      setProfileYogicExp(currentStudent.yogicExperience);
      setProfileBio(currentStudent.bio);
      setProfileIntent(currentStudent.intentAndGoals);
      setProfileDiet(currentStudent.dietaryPreference || 'Strict Vegetarian / Sattvic Diet');
      setProfileHealth(currentStudent.healthConditions || 'None');
      setProfileEmergency(currentStudent.emergencyContact || '');
    }
  }, [currentStudent]);

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name: profileName,
      phone: profilePhone,
      city: profileCity,
      state: profileState,
      profession: profileProfession,
      yogicExperience: profileYogicExp,
      bio: profileBio,
      intentAndGoals: profileIntent,
      dietaryPreference: profileDiet,
      healthConditions: profileHealth,
      emergencyContact: profileEmergency
    });
    setProfileSavedMsg('Your student profile and yogic background have been successfully updated.');
    setTimeout(() => setProfileSavedMsg(''), 4000);
  };

  // Check if a course is already purchased
  const isEnrolled = (progId: string) => {
    if (!currentStudent) return false;
    return currentStudent.enrolledCourses.some(c => c.programId === progId);
  };

  // Filtered recorded sessions
  const filteredSessions = recordedSessions.filter(session => {
    // If not 'all', check program
    if (selectedCourseFilter !== 'all' && session.programId !== selectedCourseFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return session.title.toLowerCase().includes(q) || 
             session.moduleName.toLowerCase().includes(q) ||
             session.summary.toLowerCase().includes(q) ||
             session.keyTopics.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  // Filtered materials
  const filteredMaterials = courseMaterials.filter(mat => {
    if (selectedCourseFilter !== 'all' && mat.programId !== selectedCourseFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return mat.title.toLowerCase().includes(q) || 
             mat.category.toLowerCase().includes(q) ||
             mat.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Material download simulator
  const handleDownloadMaterial = (mat: CourseMaterial) => {
    const text = `
===================================================================
                  ISHWARI YOGA INSTITUTE, PUNE
                      STUDY MATERIAL REPOSITORY
===================================================================
Document: ${mat.title}
Category: ${mat.category}
File Reference: ${mat.downloadFileName}
File Size: ${mat.fileSize}

DESCRIPTION:
${mat.description}

CURRICULUM EXCERPT / KEY TEACHINGS:
${mat.contentSnippet || 'Comprehensive reference study materials for Ishwari Yoga Institute registered sadhakas.'}

Faculty Custodians:
Devika Bhide (M.A. Yogashastra, YCB Level 4 & 7 Master)
Shweta Vaikunthe (M.A. Yogashastra, YCB Level 4 & 7 Master)

(c) Ishwari Yoga Institute. All Rights Reserved.
===================================================================
    `.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mat.downloadFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // IF NOT LOGGED IN: Render Welcoming Guest View with direct Login / Demo trigger
  if (!currentStudent) {
    return (
      <div className="py-16 px-4 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-olive-green/10 text-olive-green mb-2">
          <LotusFlower size={48} />
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-olive-green font-bold block">
            Ishwari Yoga Institute • Student Portal
          </span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-espresso">
            Sadhaka Learning & Examination Portal
          </h2>
          <p className="font-sans text-sm md:text-base text-espresso/75 max-w-2xl mx-auto leading-relaxed">
            Welcome to the dedicated portal for enrolled students. Access your live and recorded lectures, comprehensive Sanskrit and anatomical study material, complete your student profile, and inspect your official YCB examination results and certificates.
          </p>
        </div>

        {/* Action card */}
        <div className="bg-primary-white border border-biscuit/40 rounded-2xl p-8 max-w-md mx-auto shadow-lg space-y-4">
          <h3 className="font-cinzel text-lg font-bold text-espresso">
            Enter Your Student Account
          </h3>
          <p className="font-sans text-xs text-espresso/70">
            Sign in with your registered email, or experience the portal immediately using the pre-enrolled demo student profile.
          </p>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              id="portal-open-auth-btn"
              onClick={() => setShowAuthModal(true)}
              className="w-full py-3 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <GraduationCap size={18} />
              <span>Student Login / Sign Up</span>
            </button>

            <button
              type="button"
              id="portal-quick-demo-btn"
              onClick={() => {
                // Open auth modal directly to demo
                setShowAuthModal(true);
              }}
              className="w-full py-2.5 bg-warm-beige/40 hover:bg-warm-beige border border-biscuit/40 text-espresso rounded-xl text-xs font-sans font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles size={15} className="text-olive-green" />
              <span>Explore Demo Student Profile (Priya Sharma)</span>
            </button>
          </div>
        </div>

        {/* Feature summary grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto text-left">
          <div className="p-4 bg-primary-white/80 border border-biscuit/30 rounded-xl space-y-1.5">
            <Video size={20} className="text-olive-green" />
            <h4 className="font-cinzel text-sm font-bold text-espresso">Recorded Sessions</h4>
            <p className="font-sans text-xs text-espresso/70">
              Watch full lecture recordings, practical asana alignment classes, and shatkarma demonstrations anytime.
            </p>
          </div>
          <div className="p-4 bg-primary-white/80 border border-biscuit/30 rounded-xl space-y-1.5">
            <BookOpen size={20} className="text-olive-green" />
            <h4 className="font-cinzel text-sm font-bold text-espresso">Course Handbooks</h4>
            <p className="font-sans text-xs text-espresso/70">
              Download Patanjali Sutra commentaries, anatomy manuals, and Sanskrit shloka audio guides.
            </p>
          </div>
          <div className="p-4 bg-primary-white/80 border border-biscuit/30 rounded-xl space-y-1.5">
            <Award size={20} className="text-olive-green" />
            <h4 className="font-cinzel text-sm font-bold text-espresso">Results & Certificates</h4>
            <p className="font-sans text-xs text-espresso/70">
              View official marksheets, marks breakdown, and download verified gold-embossed completion credentials.
            </p>
          </div>
        </div>

        {showAuthModal && (
          <StudentAuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    );
  }

  // LOGGED IN VIEW
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Student Profile Banner Header */}
      <div className="bg-primary-white border border-biscuit/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        {/* Subtle background ornamentation */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <LotusFlower size={200} />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-warm-beige/60 border border-biscuit/40 flex items-center justify-center overflow-hidden shrink-0 text-olive-green shadow-xs">
              {currentStudent.avatar ? (
                <img 
                  src={currentStudent.avatar} 
                  alt={currentStudent.name} 
                  referrerPolicy="no-referrer" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User size={32} />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-espresso">
                  {currentStudent.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-olive-green/10 text-olive-green border border-olive-green/20 rounded-full text-[10px] font-mono uppercase font-bold">
                  Enrolled Sadhaka
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans text-espresso/70">
                <span>{currentStudent.email}</span>
                <span>•</span>
                <span>{currentStudent.city}, {currentStudent.state}</span>
                <span>•</span>
                <span>{currentStudent.profession || 'Yoga Practitioner'}</span>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-mono text-espresso/60">
                <span>Enrolled Programs: <strong className="text-espresso font-semibold">{currentStudent.enrolledCourses.length}</strong></span>
                <span>•</span>
                <span>Certified Credentials: <strong className="text-olive-green font-semibold">{currentStudent.examResults.length}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="px-3.5 py-2 bg-warm-beige/40 hover:bg-warm-beige border border-biscuit/40 text-espresso rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 size={14} />
              <span>Edit About Me</span>
            </button>
            <button
              type="button"
              onClick={() => setPurchasingProgram(programs[0])}
              className="px-4 py-2 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Purchase Course</span>
            </button>
            <button
              type="button"
              id="student-logout-btn"
              onClick={logoutStudent}
              className="p-2 text-espresso/50 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-biscuit/30 cursor-pointer"
              title="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>

        {/* Quick Notification of Courses Enrolled */}
        {currentStudent.enrolledCourses.length > 0 && (
          <div className="mt-4 pt-4 border-t border-biscuit/20 flex flex-wrap items-center gap-2 text-xs font-sans text-espresso/80">
            <span className="font-mono text-[11px] uppercase text-olive-green font-bold">Active Programs:</span>
            {currentStudent.enrolledCourses.map((c) => (
              <span key={c.id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-warm-beige/50 border border-biscuit/30 rounded-lg text-xs font-medium text-espresso">
                <CheckCircle2 size={12} className="text-olive-green" />
                {c.programName}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="border-b border-biscuit/30">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto pb-1" aria-label="Tabs">
          <button
            type="button"
            id="tab-learning"
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'learning'
                ? 'border-olive-green text-olive-green bg-primary-white shadow-xs'
                : 'border-transparent text-espresso/60 hover:text-espresso hover:border-biscuit/50'
            }`}
          >
            <Video size={16} />
            <span>Recorded Sessions & Lectures</span>
            <span className="ml-1 px-1.5 py-0.2 bg-olive-green/10 text-olive-green rounded-full text-[10px] font-mono">
              {recordedSessions.length}
            </span>
          </button>

          <button
            type="button"
            id="tab-materials"
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'materials'
                ? 'border-olive-green text-olive-green bg-primary-white shadow-xs'
                : 'border-transparent text-espresso/60 hover:text-espresso hover:border-biscuit/50'
            }`}
          >
            <BookOpen size={16} />
            <span>Course Materials & Notes</span>
            <span className="ml-1 px-1.5 py-0.2 bg-olive-green/10 text-olive-green rounded-full text-[10px] font-mono">
              {courseMaterials.length}
            </span>
          </button>

          <button
            type="button"
            id="tab-results"
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'results'
                ? 'border-olive-green text-olive-green bg-primary-white shadow-xs'
                : 'border-transparent text-espresso/60 hover:text-espresso hover:border-biscuit/50'
            }`}
          >
            <Award size={16} />
            <span>Exam Results & Certificate</span>
            {currentStudent.examResults.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-olive-green text-primary-white rounded-full text-[10px] font-mono font-bold">
                {currentStudent.examResults.length}
              </span>
            )}
          </button>

          <button
            type="button"
            id="tab-purchase"
            onClick={() => setActiveTab('purchase')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'purchase'
                ? 'border-olive-green text-olive-green bg-primary-white shadow-xs'
                : 'border-transparent text-espresso/60 hover:text-espresso hover:border-biscuit/50'
            }`}
          >
            <ShoppingBag size={16} />
            <span>Enroll in New Courses</span>
          </button>

          <button
            type="button"
            id="tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-t-xl font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-olive-green text-olive-green bg-primary-white shadow-xs'
                : 'border-transparent text-espresso/60 hover:text-espresso hover:border-biscuit/50'
            }`}
          >
            <User size={16} />
            <span>My Profile & About Me</span>
          </button>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RECORDED SESSIONS & LECTURES                                       */}
      {/* ========================================================================= */}
      {activeTab === 'learning' && (
        <div className="space-y-6">
          
          {/* Active Video Player Screen */}
          {activeVideoSession && (
            <div className="bg-primary-white border border-biscuit/40 rounded-2xl overflow-hidden shadow-md">
              <div className="aspect-video w-full bg-[#1A1A1A] relative flex items-center justify-center">
                <iframe
                  src={activeVideoSession.videoUrl}
                  title={activeVideoSession.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-biscuit/20 pb-4">
                  <div>
                    <span className="font-mono text-xs text-olive-green font-bold uppercase tracking-wider">
                      Module: {activeVideoSession.moduleName} • Session #{activeVideoSession.sessionNumber}
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-espresso mt-0.5">
                      {activeVideoSession.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-espresso/70 shrink-0">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-olive-green" />
                      {activeVideoSession.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-olive-green" />
                      {activeVideoSession.dateRecorded}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-espresso/60 font-semibold block">
                    Lead Faculty: <strong className="text-espresso">{activeVideoSession.instructor}</strong>
                  </span>
                  <p className="font-sans text-sm text-espresso/80 leading-relaxed">
                    {activeVideoSession.summary}
                  </p>
                </div>

                {/* Key topics badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono uppercase text-espresso/60 block">Key Scriptural & Practical Concepts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVideoSession.keyTopics.map((topic, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-warm-beige/40 border border-biscuit/30 rounded text-xs font-sans text-espresso/80">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search & Course Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-primary-white border border-biscuit/30 rounded-xl shadow-2xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-mono uppercase text-espresso/60 whitespace-nowrap">Filter Program:</span>
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="px-3 py-1.5 bg-warm-beige/20 border border-biscuit/40 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
              >
                <option value="all">All Available Lectures</option>
                {programs.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-2.5 text-espresso/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, sutras, asanas..."
                className="w-full pl-8 pr-3 py-1.5 bg-warm-beige/20 border border-biscuit/40 rounded-lg text-xs font-sans text-espresso focus:outline-none focus:border-olive-green"
              />
            </div>
          </div>

          {/* Recorded Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => {
              const isPlaying = activeVideoSession?.id === session.id;
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    setActiveVideoSession(session);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={`bg-primary-white border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
                    isPlaying 
                      ? 'border-olive-green ring-2 ring-olive-green/20 shadow-md' 
                      : 'border-biscuit/40 hover:border-olive-green/60 shadow-xs'
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-espresso/10">
                    <img
                      src={session.thumbnailUrl}
                      alt={session.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter sepia-[0.08]"
                    />
                    <div className="absolute inset-0 bg-espresso/30 flex items-center justify-center group-hover:bg-espresso/20 transition-colors">
                      <div className={`p-3 rounded-full transition-transform duration-300 ${
                        isPlaying ? 'bg-olive-green text-primary-white scale-110' : 'bg-primary-white/90 text-espresso group-hover:scale-110'
                      }`}>
                        <Play size={18} fill="currentColor" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-espresso/80 text-primary-white text-[10px] font-mono rounded backdrop-blur-xs">
                      {session.duration}
                    </span>
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary-white/90 text-espresso text-[10px] font-mono font-bold rounded backdrop-blur-xs border border-biscuit/30">
                      Session #{session.sessionNumber}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-olive-green font-bold block">
                      {session.moduleName}
                    </span>
                    <h4 className="font-cinzel text-sm font-bold text-espresso group-hover:text-olive-green transition-colors line-clamp-2">
                      {session.title}
                    </h4>
                    <p className="font-sans text-xs text-espresso/70 line-clamp-2 leading-relaxed">
                      {session.summary}
                    </p>
                    <div className="pt-2 border-t border-biscuit/20 flex items-center justify-between text-[11px] font-mono text-espresso/60">
                      <span>{session.instructor.split('(')[0]}</span>
                      <span>{session.dateRecorded}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSessions.length === 0 && (
            <div className="text-center py-12 bg-primary-white border border-biscuit/30 rounded-xl">
              <Video size={32} className="mx-auto text-espresso/30 mb-2" />
              <p className="font-cinzel text-sm text-espresso">No sessions found matching your criteria.</p>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: COURSE MATERIALS & STUDY DOSSIERS                                   */}
      {/* ========================================================================= */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="p-5 bg-warm-beige/30 border border-biscuit/40 rounded-xl space-y-1">
            <h3 className="font-cinzel text-lg font-bold text-espresso flex items-center gap-2">
              <BookOpen size={18} className="text-olive-green" />
              <span>Official Academic Repository & Handbooks</span>
            </h3>
            <p className="font-sans text-xs text-espresso/75 leading-relaxed">
              Curated study notes, word-by-word Patanjali Yoga Sutra commentaries, anatomical alignment posters, and Sanskrit audio recordings prepared by Devika Bhide and Shweta Vaikunthe for our sadhakas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((mat) => (
              <div 
                key={mat.id}
                className="bg-primary-white border border-biscuit/40 rounded-xl p-5 shadow-xs hover:border-olive-green/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 bg-olive-green/10 text-olive-green border border-olive-green/20 rounded text-[10px] font-mono uppercase font-bold">
                      {mat.category}
                    </span>
                    <span className="text-xs font-mono text-espresso/60">
                      {mat.fileSize} • {mat.type.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="font-cinzel text-base font-bold text-espresso leading-snug">
                    {mat.title}
                  </h4>
                  
                  <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                    {mat.description}
                  </p>

                  {mat.contentSnippet && (
                    <div className="p-3 bg-warm-beige/25 border-l-2 border-olive-green rounded text-[11px] font-serif italic text-espresso/80 leading-relaxed">
                      "{mat.contentSnippet}"
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-biscuit/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-espresso/50 truncate max-w-[200px]">
                    {mat.downloadFileName}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownloadMaterial(mat)}
                    className="px-3.5 py-1.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: EXAM RESULTS & CERTIFICATES                                        */}
      {/* ========================================================================= */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          
          {selectedExamForCert ? (
            <StudentCertificateView
              student={currentStudent}
              examResult={selectedExamForCert}
              onClose={() => setSelectedExamForCert(null)}
            />
          ) : (
            <>
              <div className="p-5 bg-warm-beige/30 border border-biscuit/40 rounded-xl space-y-1">
                <h3 className="font-cinzel text-lg font-bold text-espresso flex items-center gap-2">
                  <Award size={20} className="text-olive-green" />
                  <span>Official Academic Transcripts & Credential Clearance</span>
                </h3>
                <p className="font-sans text-xs text-espresso/75 leading-relaxed">
                  Inspected results from the Board of Evaluators under the Ministry of AYUSH Yoga Certification Board (YCB) examination protocols.
                </p>
              </div>

              {currentStudent.examResults.length > 0 ? (
                <div className="space-y-6">
                  {currentStudent.examResults.map((exam) => (
                    <div 
                      key={exam.id}
                      className="bg-primary-white border border-biscuit/40 rounded-2xl p-6 shadow-sm space-y-6"
                    >
                      {/* Result Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-biscuit/20 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] font-mono uppercase font-bold">
                              Status: {exam.status}
                            </span>
                            <span className="text-xs font-mono text-espresso/60">
                              Exam Date: {exam.examDate}
                            </span>
                          </div>
                          <h4 className="font-cinzel text-lg sm:text-xl font-bold text-espresso mt-1">
                            {exam.programName}
                          </h4>
                          <span className="font-mono text-xs text-olive-green font-semibold">
                            Accreditation: {exam.ycbLevel}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] font-mono uppercase text-espresso/60 block">Certificate No:</span>
                            <strong className="font-mono text-sm text-espresso">{exam.certificateNumber}</strong>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedExamForCert(exam)}
                            className="px-4 py-2.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                          >
                            <Award size={15} />
                            <span>View Full Certificate</span>
                          </button>
                        </div>
                      </div>

                      {/* Marks Breakdown Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                        <div className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-xl">
                          <span className="text-[10px] font-mono uppercase text-espresso/60 block">1. Scriptural Theory</span>
                          <strong className="font-mono text-lg text-espresso">{exam.theoryMarks}</strong>
                          <span className="text-[10px] font-mono text-espresso/50 block">/ 100</span>
                        </div>

                        <div className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-xl">
                          <span className="text-[10px] font-mono uppercase text-espresso/60 block">2. Practical Asana</span>
                          <strong className="font-mono text-lg text-espresso">{exam.practicalMarks}</strong>
                          <span className="text-[10px] font-mono text-espresso/50 block">/ 100</span>
                        </div>

                        <div className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-xl">
                          <span className="text-[10px] font-mono uppercase text-espresso/60 block">3. Shatkarma Viva</span>
                          <strong className="font-mono text-lg text-espresso">{exam.vivaMarks}</strong>
                          <span className="text-[10px] font-mono text-espresso/50 block">/ 100</span>
                        </div>

                        <div className="p-3 bg-warm-beige/20 border border-biscuit/30 rounded-xl">
                          <span className="text-[10px] font-mono uppercase text-espresso/60 block">4. Teaching Pedagogy</span>
                          <strong className="font-mono text-lg text-espresso">{exam.teachingPedagogyMarks}</strong>
                          <span className="text-[10px] font-mono text-espresso/50 block">/ 100</span>
                        </div>

                        <div className="col-span-2 sm:col-span-1 p-3 bg-olive-green/10 border border-olive-green/20 rounded-xl">
                          <span className="text-[10px] font-mono uppercase text-olive-green font-bold block">Aggregate Score</span>
                          <strong className="font-mono text-xl text-olive-green">{exam.percentage}%</strong>
                          <span className="text-[10px] font-sans text-olive-green block font-bold mt-0.5">{exam.grade}</span>
                        </div>
                      </div>

                      {/* Evaluator Notes */}
                      <div className="p-4 bg-primary-white border-l-3 border-olive-green rounded-r-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-olive-green font-bold">
                            Evaluator Commendation & Academic Remarks
                          </span>
                          <span className="text-[10px] font-sans text-espresso/60">
                            Evaluated by {exam.evaluatorName}
                          </span>
                        </div>
                        <p className="font-serif italic text-xs sm:text-sm text-espresso/85 leading-relaxed">
                          "{exam.evaluatorRemarks}"
                        </p>
                      </div>

                      {/* Action footer */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-sans text-espresso/70">
                        <span>Issued on {exam.issueDate} • Verified under official Institute Seal</span>
                        <button
                          type="button"
                          onClick={() => setSelectedExamForCert(exam)}
                          className="text-olive-green hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Printable Certificate View</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center bg-primary-white border border-biscuit/30 rounded-2xl space-y-3">
                  <Award size={36} className="mx-auto text-espresso/30" />
                  <h4 className="font-cinzel text-base font-bold text-espresso">No Exam Results Published Yet</h4>
                  <p className="font-sans text-xs text-espresso/70 max-w-md mx-auto">
                    Your examination evaluation takes place upon completion of coursework and practical shatkarma vivas. Once evaluated, your marksheet and gold-embossed certificate will appear here.
                  </p>
                </div>
              )}
            </>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ENROLL & PURCHASE COURSES                                          */}
      {/* ========================================================================= */}
      {activeTab === 'purchase' && (
        <div className="space-y-6">
          <div className="p-5 bg-warm-beige/30 border border-biscuit/40 rounded-xl space-y-1">
            <h3 className="font-cinzel text-lg font-bold text-espresso flex items-center gap-2">
              <ShoppingBag size={18} className="text-olive-green" />
              <span>Institute Course Catalog & Admission Portal</span>
            </h3>
            <p className="font-sans text-xs text-espresso/75 leading-relaxed">
              Enroll in authentic teacher certifications and intensive wellness batches. Transparent all-inclusive fees, flexible online/in-person schedules, and comprehensive YCB preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
              const enrolled = isEnrolled(program.id);
              return (
                <div 
                  key={program.id}
                  className="bg-primary-white border border-biscuit/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video relative overflow-hidden bg-espresso/10">
                      <img
                        src={program.image}
                        alt={program.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter sepia-[0.08]"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-primary-white/95 text-espresso text-[10px] font-mono uppercase font-bold rounded-full shadow-2xs">
                        {program.category}
                      </span>
                      {enrolled && (
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-olive-green text-primary-white text-[10px] font-sans uppercase font-bold rounded-full shadow-xs flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>Active Sadhaka</span>
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-cinzel text-base font-bold text-espresso leading-snug">
                        {program.name}
                      </h4>

                      <div className="space-y-1 text-xs font-mono text-espresso/70">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-olive-green shrink-0" />
                          <span>Starts: {program.startingDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-olive-green shrink-0" />
                          <span>Duration: {program.duration}</span>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-espresso/75 line-clamp-3 leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-biscuit/20 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-espresso/50 block">Course Fee</span>
                        <strong className="font-mono text-sm font-bold text-olive-green">{program.fees}</strong>
                      </div>

                      {enrolled ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCourseFilter(program.id);
                            setActiveTab('learning');
                          }}
                          className="px-4 py-2 bg-warm-beige/50 hover:bg-warm-beige border border-biscuit/40 text-espresso rounded-xl text-xs font-sans font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>Open Lectures</span>
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          id={`purchase-btn-${program.id}`}
                          onClick={() => setPurchasingProgram(program)}
                          className="px-4 py-2 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                        >
                          <CreditCard size={14} />
                          <span>Purchase & Pay</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Payment Receipts Record if any */}
          {currentStudent.enrolledCourses.length > 0 && (
            <div className="mt-8 bg-primary-white border border-biscuit/30 rounded-2xl p-6 shadow-2xs space-y-4">
              <h4 className="font-cinzel text-base font-bold text-espresso flex items-center gap-2">
                <FileText size={16} className="text-olive-green" />
                <span>My Course Purchase & Fee Receipts Ledger</span>
              </h4>

              <div className="divide-y divide-biscuit/20 text-xs font-sans">
                {currentStudent.enrolledCourses.map((purchase) => (
                  <div key={purchase.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <strong className="font-cinzel text-sm text-espresso block">{purchase.programName}</strong>
                      <span className="font-mono text-[11px] text-espresso/60">
                        Date: {purchase.purchaseDate} • Txn: {purchase.transactionId} • Mode: {purchase.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono font-bold text-olive-green">{purchase.amountPaid}</span>
                        <span className="block text-[10px] text-green-700 font-medium">Verified Paid</span>
                      </div>
                      <span className="px-2.5 py-1 bg-warm-beige/40 rounded border border-biscuit/30 font-mono text-[10px] text-espresso">
                        {purchase.receiptNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MY BIO & PROFILE ("write about themselves in a form")               */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="p-5 bg-warm-beige/30 border border-biscuit/40 rounded-xl space-y-1">
            <h3 className="font-cinzel text-lg font-bold text-espresso flex items-center gap-2">
              <User size={18} className="text-olive-green" />
              <span>Student Profile & Yogic Background Form</span>
            </h3>
            <p className="font-sans text-xs text-espresso/75 leading-relaxed">
              Tell us about yourself, your background, spiritual inclinations, and health goals. This dossier is reviewed directly by your teachers Devika Bhide and Shweta Vaikunthe to adjust posture protocols and mentorship throughout your course.
            </p>
          </div>

          {profileSavedMsg && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-sans flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{profileSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="bg-primary-white border border-biscuit/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Personal Details */}
            <div className="space-y-4">
              <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-espresso/90 border-b border-biscuit/20 pb-2">
                1. Personal Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={currentStudent.email}
                    className="w-full px-3 py-2 bg-warm-beige/30 border border-biscuit/30 rounded-lg text-sm font-sans text-espresso/70 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Phone / WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Profession / Occupation
                  </label>
                  <input
                    type="text"
                    value={profileProfession}
                    onChange={(e) => setProfileProfession(e.target.value)}
                    placeholder="e.g. Software Engineer, Architect, Doctor, Teacher"
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={profileCity}
                    onChange={(e) => setProfileCity(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={profileState}
                    onChange={(e) => setProfileState(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>
              </div>
            </div>

            {/* In-depth Form: About Myself & Yogic Path */}
            <div className="space-y-4 pt-2">
              <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-espresso/90 border-b border-biscuit/20 pb-2">
                2. Write About Yourself & Your Yogic Sadhana
              </h4>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Write About Yourself (Your Personal Story & Background) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Tell us about yourself: who you are, what challenges or inspirations brought you to Ishwari Yoga Institute, your daily routine, and what yoga means to you..."
                  className="w-full px-3 py-2.5 bg-primary-white border border-biscuit/40 rounded-xl text-sm font-sans text-espresso focus:outline-none focus:border-olive-green leading-relaxed"
                />
                <span className="text-[11px] font-sans text-espresso/50 mt-1 block">
                  This narrative is read by your lead faculty Devika Bhide & Shweta Vaikunthe.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                  Your Aspirations, Intent & Learning Goals *
                </label>
                <textarea
                  rows={3}
                  required
                  value={profileIntent}
                  onChange={(e) => setProfileIntent(e.target.value)}
                  placeholder="What are your specific goals? (e.g. YCB certification, clinical anatomy, teaching corporate batches, healing cervical issues, learning Sanskrit mantras...)"
                  className="w-full px-3 py-2.5 bg-primary-white border border-biscuit/40 rounded-xl text-sm font-sans text-espresso focus:outline-none focus:border-olive-green leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Yogic Experience Level
                  </label>
                  <select
                    value={profileYogicExp}
                    onChange={(e) => setProfileYogicExp(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
                  >
                    <option value="Beginner (Less than 1 year)">Beginner (Less than 1 year)</option>
                    <option value="Practicing 1-2 Years">Practicing 1-2 Years</option>
                    <option value="Intermediate (2-5 Years)">Intermediate (2-5 Years)</option>
                    <option value="Advanced / Prior TTC Completed">Advanced / Prior TTC Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Dietary Preference
                  </label>
                  <select
                    value={profileDiet}
                    onChange={(e) => setProfileDiet(e.target.value)}
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
                  >
                    <option value="Strict Vegetarian / Sattvic Diet">Strict Vegetarian / Sattvic Diet</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Health & Safety */}
            <div className="space-y-4 pt-2">
              <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-espresso/90 border-b border-biscuit/20 pb-2">
                3. Health Notes & Emergency Contact
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Physical Limitations / Medical Conditions
                  </label>
                  <input
                    type="text"
                    value={profileHealth}
                    onChange={(e) => setProfileHealth(e.target.value)}
                    placeholder="e.g. None, lumbar slip disc, high blood pressure, cervical stiffness"
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-espresso/70 mb-1">
                    Emergency Contact (Name & Phone)
                  </label>
                  <input
                    type="text"
                    value={profileEmergency}
                    onChange={(e) => setProfileEmergency(e.target.value)}
                    placeholder="e.g. Spouse / Parent / Relative (+91 ...)"
                    className="w-full px-3 py-2 bg-primary-white border border-biscuit/40 rounded-lg text-sm font-sans text-espresso focus:outline-none focus:border-olive-green"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end pt-4 border-t border-biscuit/20">
              <button
                type="submit"
                id="save-student-profile-btn"
                className="px-6 py-2.5 bg-olive-green hover:bg-olive-green/90 text-primary-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <CheckCircle2 size={15} />
                <span>Save & Update My Profile</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Payment Modal */}
      {purchasingProgram && currentStudent && (
        <StudentPaymentModal
          program={purchasingProgram}
          student={currentStudent}
          onClose={() => setPurchasingProgram(null)}
          onSuccess={(purchase) => {
            // Keep open or let modal handle step: success
          }}
        />
      )}

      {/* Auth Modal (if user toggles or wants to change account) */}
      {showAuthModal && (
        <StudentAuthModal onClose={() => setShowAuthModal(false)} />
      )}

    </div>
  );
};
