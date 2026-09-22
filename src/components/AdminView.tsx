import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { Program, Student, Blog, GalleryItem, Testimonial, Inquiry } from '../types';
import { 
  Plus, Edit2, Trash2, ShieldCheck, Download, Upload, CheckCircle2, 
  MessageSquare, Users, BookOpen, Image, Star, Mail, RefreshCw, AlertCircle,
  AlertTriangle, X, GraduationCap 
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { AdminStudentPortalTab } from './AdminStudentPortalTab';

export const AdminView: React.FC = () => {
  const {
    programs, students, blogs, galleryItems, testimonials, inquiries, studentAccounts,
    addProgram, updateProgram, deleteProgram,
    addStudent, updateStudent, deleteStudent,
    addGalleryItem, deleteGalleryItem,
    addBlog, updateBlog, deleteBlog,
    addTestimonial, deleteTestimonial,
    updateInquiryStatus, deleteInquiry,
    exportBackup, importBackup
  } = useYoga();

  const [activeTab, setActiveTab] = useState<'programs' | 'students' | 'portal' | 'blogs' | 'gallery' | 'testimonials' | 'inquiries' | 'backup'>('programs');

  // Success and error messages state
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // In-app deletion confirmation dialog state (replaces iframe-blocked window.confirm)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'program' | 'student' | 'blog' | 'gallery' | 'testimonial' | 'inquiry';
    id: string;
    name: string;
  } | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const { type, id, name } = deleteTarget;

    try {
      if (type === 'program') {
        deleteProgram(id);
        setSuccessMsg(`Course "${name}" has been permanently removed.`);
        if (editingProgId === id) {
          setEditingProgId(null);
          setProgName('');
          setProgDate('');
          setProgDuration('');
          setProgFees('');
          setProgDesc('');
          setProgImage('');
          setProgBrochure('program_brochure.pdf');
          setProgBrochureBase64('');
        }
      } else if (type === 'student') {
        deleteStudent(id);
        setSuccessMsg(`Student certification for "${name}" has been deleted.`);
      } else if (type === 'blog') {
        deleteBlog(id);
        setSuccessMsg(`Article "${name}" has been deleted.`);
      } else if (type === 'gallery') {
        deleteGalleryItem(id);
        setSuccessMsg(`Gallery item "${name}" has been deleted.`);
      } else if (type === 'testimonial') {
        deleteTestimonial(id);
        setSuccessMsg(`Testimonial from "${name}" has been removed.`);
      } else if (type === 'inquiry') {
        deleteInquiry(id);
        setSuccessMsg(`Inquiry from "${name}" has been removed.`);
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
      setErrorMsg('Failed to delete item. Please try again.');
      setTimeout(() => setErrorMsg(''), 4000);
    }

    setDeleteTarget(null);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // -----------------------------------------------------------------
  // Programs Form States
  const [editingProgId, setEditingProgId] = useState<string | null>(null);
  const [progName, setProgName] = useState('');
  const [progCategory, setProgCategory] = useState('Teacher Training');
  const [progDate, setProgDate] = useState('');
  const [progDuration, setProgDuration] = useState('');
  const [progFees, setProgFees] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progImage, setProgImage] = useState('');
  const [progBrochure, setProgBrochure] = useState('program_brochure.pdf');
  const [progBrochureBase64, setProgBrochureBase64] = useState('');

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('File size exceeds 8MB limit. Please upload a compressed PDF.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    setProgBrochure(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProgBrochureBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleProgramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progName || !progFees || !progDesc) {
      setErrorMsg('Please fill out Program Name, Fees, and Description.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    const payload = {
      name: progName,
      category: progCategory,
      startingDate: progDate || 'Continuous Enrollment',
      duration: progDuration || 'Custom',
      fees: progFees,
      description: progDesc,
      image: progImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
      gallery: [],
      pdfBrochure: progBrochureBase64,
      pdfBrochureName: progBrochure,
      registrationLink: '#register',
      faq: [
        { question: 'What is the eligibility?', answer: 'Open to all sincere seekers.' }
      ],
      testimonials: [],
      schedule: [
        { day: 'Custom', time: 'Flexible', topic: 'Integrated Study' }
      ]
    };

    if (editingProgId) {
      const existing = programs.find(p => p.id === editingProgId);
      if (existing) {
        updateProgram(editingProgId, { ...existing, ...payload });
        setSuccessMsg('Program updated successfully!');
      }
    } else {
      addProgram(payload);
      setSuccessMsg('New Program added successfully!');
    }

    // Reset
    setEditingProgId(null);
    setProgName('');
    setProgDate('');
    setProgDuration('');
    setProgFees('');
    setProgDesc('');
    setProgImage('');
    setProgBrochure('program_brochure.pdf');
    setProgBrochureBase64('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEditProgram = (p: Program) => {
    setEditingProgId(p.id);
    setProgName(p.name);
    setProgCategory(p.category);
    setProgDate(p.startingDate);
    setProgDuration(p.duration);
    setProgFees(p.fees);
    setProgDesc(p.description);
    setProgImage(p.image);
    setProgBrochure(p.pdfBrochureName || 'program_brochure.pdf');
    setProgBrochureBase64(p.pdfBrochure || '');

    // Highlight and smooth scroll to the form for pristine UX
    setTimeout(() => {
      document.getElementById('program-form-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // -----------------------------------------------------------------
  // Certified Students Form States
  // -----------------------------------------------------------------
  const [studName, setStudName] = useState('');
  const [studCert, setStudCert] = useState('');
  const [studLevel, setStudLevel] = useState('YCB Level 1 (Protocol Instructor)');
  const [studYear, setStudYear] = useState('2026');
  const [studStatus, setStudStatus] = useState<'Active' | 'Completed' | 'Suspended'>('Active');
  const [studPassing, setStudPassing] = useState('');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studName || !studCert) {
      setErrorMsg('Please fill out Student Name and Certificate Number.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    addStudent({
      name: studName,
      certificateNumber: studCert,
      level: studLevel,
      year: studYear,
      status: studStatus,
      dateOfPassing: studPassing || new Date().toISOString().split('T')[0]
    });

    setSuccessMsg('Certified Student registered in database!');
    setStudName('');
    setStudCert('');
    setStudPassing('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // -----------------------------------------------------------------
  // Blogs Form States
  // -----------------------------------------------------------------
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Yoga Philosophy');
  const [blogAuthor, setBlogAuthor] = useState('Devika Bhide');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState('');

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary || !blogContent) {
      setErrorMsg('Please provide Blog Title, Summary, and Content.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    addBlog({
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      category: blogCategory,
      author: blogAuthor,
      date: new Date().toISOString().split('T')[0],
      image: blogImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
      readTime: `${Math.ceil(blogContent.split(' ').length / 150)} min read`
    });

    setSuccessMsg('Blog post published!');
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    setBlogImage('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // -----------------------------------------------------------------
  // Gallery Form States
  // -----------------------------------------------------------------
  const [galUrl, setGalUrl] = useState('');
  const [galCaption, setGalCaption] = useState('');
  const [galCategory, setGalCategory] = useState<'Retreats' | 'Teacher Training' | 'Workshops' | 'Classes' | 'Events' | 'Awards'>('Classes');

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galUrl || !galCaption) {
      setErrorMsg('Please fill out Image URL and Caption.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    addGalleryItem({
      url: galUrl,
      caption: galCaption,
      category: galCategory
    });

    setSuccessMsg('Gallery item added!');
    setGalUrl('');
    setGalCaption('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // -----------------------------------------------------------------
  // Testimonials Form States
  // -----------------------------------------------------------------
  const [testName, setTestName] = useState('');
  const [testText, setTestText] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testRating, setTestRating] = useState(5);

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testText) {
      setErrorMsg('Please provide Seeker Name and Testimony Text.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    addTestimonial({
      name: testName,
      text: testText,
      role: testRole || 'Sadhaka',
      rating: testRating,
      year: new Date().getFullYear().toString()
    });

    setSuccessMsg('Testimonial uploaded successfully!');
    setTestName('');
    setTestText('');
    setTestRole('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // -----------------------------------------------------------------
  // Import File Parser
  // -----------------------------------------------------------------
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = importBackup(text);
      if (success) {
        setSuccessMsg('All CMS configurations imported successfully! Screen will update.');
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg('Failed to parse backup JSON file. Ensure format is correct.');
        setTimeout(() => setErrorMsg(''), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="admin-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <section className="max-w-6xl mx-auto pt-16 pb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-biscuit/30">
        <div className="space-y-1">
          <div className="flex gap-2 items-center text-olive-green justify-center sm:justify-start">
            <ShieldCheck size={24} />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-biscuit font-bold">Ishwari CMS</span>
          </div>
          <h1 className="font-cinzel text-3xl font-bold text-espresso">
            Admin Management Portal
          </h1>
        </div>
        <div className="text-xs font-mono text-espresso/50">
          Authenticated Session: Devikabhide8@gmail.com
        </div>
      </section>

      {/* Main Admin layout with Sidebar tabs & main form panels */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2 bg-[#F3EBDD]/40 p-4 border border-biscuit/20 rounded-xl">
          {[
            { id: 'programs', label: 'Manage Programs', icon: <BookOpen size={16} /> },
            { id: 'students', label: 'Certified Students', icon: <Users size={16} /> },
            { id: 'portal', label: 'Student Accounts & LMS', icon: <GraduationCap size={16} />, badge: studentAccounts.length },
            { id: 'blogs', label: 'Publish Blogs', icon: <BookOpen size={16} /> },
            { id: 'gallery', label: 'Gallery Media', icon: <Image size={16} /> },
            { id: 'testimonials', label: 'Testimonials', icon: <Star size={16} /> },
            { id: 'inquiries', label: 'Inquiries Box', icon: <Mail size={16} />, badge: inquiries.filter(i => i.status === 'Pending').length },
            { id: 'backup', label: 'Backup & Recovery', icon: <RefreshCw size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-xs tracking-wider uppercase font-sans font-semibold transition-all cursor-pointer focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-espresso text-primary-white shadow-sm'
                  : 'text-espresso/70 hover:bg-warm-beige/30'
              }`}
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-red-500 text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Form Block */}
        <div className="lg:col-span-9 bg-primary-white border border-biscuit/30 p-8 rounded-xl shadow-sm min-h-[500px]">
          
          {/* Global Success Banner */}
          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg('')} className="text-green-600 hover:text-green-800 p-1 cursor-pointer">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Global Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg('')} className="text-red-600 hover:text-red-800 p-1 cursor-pointer">
                <X size={14} />
              </button>
            </div>
          )}

          {/* TAB 1: PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="space-y-10 animate-fadeIn">
              
              {/* Top Section: Quick Management Directory */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-biscuit/20">
                  <div>
                    <h2 className="font-cinzel text-lg font-bold text-espresso">
                      Announced Batches & Programs Directory
                    </h2>
                    <p className="text-[11px] text-espresso/65 font-sans">
                      These courses are currently published live on your website for public view, inquiry, and registrations.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProgId(null);
                      setProgName('');
                      setProgDate('');
                      setProgDuration('');
                      setProgFees('');
                      setProgDesc('');
                      setProgImage('');
                      setProgBrochure('program_brochure.pdf');
                      setProgBrochureBase64('');
                      setTimeout(() => {
                        document.getElementById('program-form-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className="px-3.5 py-1.5 bg-espresso text-primary-white hover:bg-olive-green text-[10px] tracking-wider uppercase font-bold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Create New Batch</span>
                  </button>
                </div>

                {programs.length === 0 ? (
                  <div className="p-8 border border-dashed border-biscuit/30 rounded-xl text-center bg-warm-beige/10">
                    <AlertCircle className="mx-auto text-espresso/30 mb-2" size={24} />
                    <p className="text-xs font-semibold text-espresso">No active batches announced.</p>
                    <p className="text-[11px] text-espresso/50">Click "Create New Batch" below to announce your first course!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programs.map((p) => {
                      const hasRealPdf = p.pdfBrochure && p.pdfBrochure.startsWith('data:');
                      return (
                        <div key={p.id} className="border border-biscuit/25 rounded-xl p-4 bg-[#FAFAF8] hover:border-olive-green/40 transition-all flex flex-col justify-between shadow-xs">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-mono text-[9px] uppercase tracking-wider font-bold bg-olive-green/10 text-olive-green px-2 py-0.5 rounded border border-olive-green/10">
                                {p.category}
                              </span>
                              <div className="text-right">
                                <span className="font-mono text-[10px] font-bold text-espresso/90 block">
                                  {p.fees}
                                </span>
                              </div>
                            </div>

                            <h4 className="font-cinzel text-xs font-bold text-espresso line-clamp-1">
                              {p.name}
                            </h4>
                            
                            <p className="text-[10px] text-espresso/70 font-sans line-clamp-2">
                              {p.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-biscuit/10 text-[10px] text-espresso/60 font-mono">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-espresso/40 block">Start Date:</span>
                                <span className="font-semibold text-espresso/80">{p.startingDate}</span>
                              </div>
                              <div>
                                <span className="text-[9px] uppercase font-bold text-espresso/40 block">Duration:</span>
                                <span className="font-semibold text-espresso/80">{p.duration}</span>
                              </div>
                            </div>

                            <div className="pt-2 flex items-center gap-1.5 text-[9px] font-mono text-espresso/50">
                              <span className="font-semibold text-espresso/40">Syllabus PDF:</span>
                              <span className={`px-2 py-0.5 rounded font-bold truncate max-w-[150px] ${
                                hasRealPdf 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {hasRealPdf ? '✓ Uploaded PDF' : p.pdfBrochureName || 'Default mock'}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-biscuit/15 flex justify-end gap-2">
                            <button
                              onClick={() => handleEditProgram(p)}
                              className="px-2.5 py-1.5 border border-biscuit/35 rounded text-espresso hover:bg-olive-green hover:text-white transition-colors text-[10px] font-bold font-sans uppercase flex items-center gap-1 cursor-pointer"
                              title="Modify Details"
                            >
                              <Edit2 size={10} />
                              <span>Edit Details</span>
                            </button>
                            <button
                              type="button"
                              id={`delete-course-${p.id}`}
                              onClick={() => setDeleteTarget({ type: 'program', id: p.id, name: p.name })}
                              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded border border-red-200 transition-colors text-[10px] font-bold font-sans uppercase flex items-center gap-1 cursor-pointer"
                              title="Delete Course"
                            >
                              <Trash2 size={10} />
                              <span>Delete Course</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Section: Configure/Edit Form */}
              <div id="program-form-container" className="pt-8 border-t border-biscuit/30 space-y-6">
                <div className={`p-6 rounded-xl border ${
                  editingProgId 
                    ? 'bg-amber-50/15 border-amber-300 shadow-xs' 
                    : 'bg-[#FAFAF8]/50 border-biscuit/25'
                }`}>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-biscuit/20 mb-5">
                    <div className="space-y-0.5">
                      <h3 className="font-cinzel text-sm font-bold text-espresso">
                        {editingProgId ? '✏️ Edit Selected Batch details' : '➕ Announce & Publish a New Batch'}
                      </h3>
                      <p className="text-[10px] text-espresso/60 font-sans">
                        {editingProgId ? 'Updating details of an existing yoga training program.' : 'Set up starting dates, durations, pricing, and upload the syllabus.'}
                      </p>
                    </div>
                    {editingProgId && (
                      <button 
                        onClick={() => {
                          setEditingProgId(null);
                          setProgName('');
                          setProgDate('');
                          setProgDuration('');
                          setProgFees('');
                          setProgDesc('');
                          setProgImage('');
                          setProgBrochure('program_brochure.pdf');
                          setProgBrochureBase64('');
                        }}
                        className="px-2 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50 text-[10px] font-mono uppercase font-semibold focus:outline-none cursor-pointer"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Form to submit */}
                  <form onSubmit={handleProgramSubmit} className="space-y-4 font-sans text-xs text-espresso">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Program Title *</label>
                        <input
                          type="text"
                          required
                          value={progName}
                          onChange={(e) => setProgName(e.target.value)}
                          className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green"
                          placeholder="e.g. YCB Level 1: Yoga Protocol Instructor"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Category *</label>
                        <select
                          value={progCategory}
                          onChange={(e) => setProgCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green text-xs"
                        >
                          <option value="Teacher Training">Teacher Training</option>
                          <option value="Retreats">Retreats</option>
                          <option value="Workshops">Workshops</option>
                          <option value="Regular Classes">Regular Classes</option>
                          <option value="Yoga Therapy">Yoga Therapy</option>
                          <option value="Prenatal Yoga">Prenatal Yoga</option>
                          <option value="Medical Yoga">Medical Yoga</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Starting Date</label>
                        <input
                          type="text"
                          value={progDate}
                          onChange={(e) => setProgDate(e.target.value)}
                          className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white focus:outline-none"
                          placeholder="e.g. 2026-09-01"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Duration</label>
                        <input
                          type="text"
                          value={progDuration}
                          onChange={(e) => setProgDuration(e.target.value)}
                          className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white focus:outline-none"
                          placeholder="e.g. 3 Months"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Fees / Tuition *</label>
                        <input
                          type="text"
                          required
                          value={progFees}
                          onChange={(e) => setProgFees(e.target.value)}
                          className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white focus:outline-none"
                          placeholder="e.g. ₹15,000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <ImageUploader
                          id="program-image"
                          label="Cover Image"
                          value={progImage}
                          onChange={setProgImage}
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                        />
                      </div>
                      
                      {/* PDF Uploader Zone */}
                      <div>
                        <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Syllabus PDF / Brochure *</label>
                        <div className="flex flex-col gap-2">
                          <div className="relative border-2 border-dashed border-biscuit/40 hover:border-olive-green/60 rounded-lg p-3 bg-warm-beige/10 hover:bg-warm-beige/20 transition-all text-center group cursor-pointer">
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handlePdfUpload}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                              id="pdf-upload-input"
                            />
                            <div className="space-y-1">
                              <Upload size={16} className="mx-auto text-olive-green group-hover:scale-110 transition-transform duration-200" />
                              <p className="font-semibold text-espresso text-[10px]">
                                Drag & drop or click to upload PDF
                              </p>
                              <p className="text-[8px] text-espresso/50">
                                Size limit 8MB (Stored safely in local cache)
                              </p>
                            </div>
                          </div>
                          
                          {progBrochure && (
                            <div className="flex items-center justify-between p-2 bg-white border border-biscuit/20 rounded-md shadow-2xs">
                              <div className="flex items-center gap-1.5 truncate max-w-[80%]">
                                <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                                <span className="font-semibold text-espresso truncate text-[10px]">{progBrochure}</span>
                                {progBrochureBase64 && (
                                  <span className="text-[8px] bg-green-100 text-green-800 px-1 py-0.2 rounded font-bold shrink-0">
                                    Real PDF Loaded
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setProgBrochure('');
                                  setProgBrochureBase64('');
                                }}
                                className="text-[9px] font-bold text-red-600 hover:underline cursor-pointer focus:outline-none"
                              >
                                Clear File
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Program Description *</label>
                      <textarea
                        rows={4}
                        required
                        value={progDesc}
                        onChange={(e) => setProgDesc(e.target.value)}
                        className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white focus:outline-none resize-none"
                        placeholder="Provide a comprehensive breakdown of the syllabus, goals, and scriptural focuses..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-olive-green text-white hover:bg-espresso transition-colors font-sans text-xs tracking-wider uppercase font-bold flex items-center gap-1.5 cursor-pointer rounded shadow-sm"
                    >
                      <Plus size={14} />
                      <span>{editingProgId ? 'Update Program Details' : 'Publish Program Batch'}</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CERTIFIED STUDENTS */}
          {activeTab === 'students' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-cinzel text-xl font-bold text-espresso pb-4 border-b border-biscuit/20">
                Register Certified Student
              </h2>

              <form onSubmit={handleStudentSubmit} className="space-y-4 font-sans text-xs text-espresso">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      value={studName}
                      onChange={(e) => setStudName(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                      placeholder="e.g. Priyadarshini Joshi"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Certificate Number *</label>
                    <input
                      type="text"
                      required
                      value={studCert}
                      onChange={(e) => setStudCert(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white font-mono"
                      placeholder="e.g. IYS-YCB3-2025-042"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">YCB Certified Level *</label>
                    <select
                      value={studLevel}
                      onChange={(e) => setStudLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded text-xs bg-primary-white"
                    >
                      <option value="YCB Level 1 (Protocol Instructor)">YCB Level 1 (Protocol Instructor)</option>
                      <option value="YCB Level 2 (Wellness Educator)">YCB Level 2 (Wellness Educator)</option>
                      <option value="YCB Level 3 (Yoga Teacher)">YCB Level 3 (Yoga Teacher)</option>
                      <option value="YCB Level 4 (Yoga Master)">YCB Level 4 (Yoga Master)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Passing Year *</label>
                    <input
                      type="text"
                      required
                      value={studYear}
                      onChange={(e) => setStudYear(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Status *</label>
                    <select
                      value={studStatus}
                      onChange={(e) => setStudStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded text-xs bg-primary-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Date of Passing (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={studPassing}
                    onChange={(e) => setStudPassing(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-olive-green text-white hover:bg-espresso transition-colors font-sans text-xs tracking-wider uppercase font-bold flex items-center gap-1 cursor-pointer rounded"
                >
                  <Plus size={14} />
                  <span>Register Certificate</span>
                </button>
              </form>

              {/* Certified Students List to remove */}
              <div className="pt-8 border-t border-biscuit/20 space-y-4">
                <h3 className="font-cinzel text-base font-bold text-espresso">Existing Alumni Directory</h3>
                <div className="border border-biscuit/15 rounded-lg overflow-hidden font-sans text-[10px]">
                  <table className="w-full text-left">
                    <thead className="bg-[#F3EBDD]/40 font-bold border-b border-biscuit/25 text-espresso">
                      <tr>
                        <th className="px-4 py-2.5">Name</th>
                        <th className="px-4 py-2.5">Certificate ID</th>
                        <th className="px-4 py-2.5">YCB Level</th>
                        <th className="px-4 py-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-biscuit/10 text-espresso/80">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-warm-beige/10">
                          <td className="px-4 py-2.5 font-semibold">{s.name}</td>
                          <td className="px-4 py-2.5 font-mono text-olive-green">{s.certificateNumber}</td>
                          <td className="px-4 py-2.5">{s.level}</td>
                          <td className="px-4 py-2.5 text-center">
                            <button 
                              type="button"
                              onClick={() => setDeleteTarget({ type: 'student', id: s.id, name: s.name })} 
                              className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer" 
                              title="Delete Student Certificate"
                            >
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB: STUDENT PORTAL & LMS ACCOUNTS */}
          {activeTab === 'portal' && (
            <AdminStudentPortalTab 
              onSuccessMsg={setSuccessMsg} 
              onErrorMsg={setErrorMsg} 
            />
          )}

          {/* TAB 3: WISDOM BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-cinzel text-xl font-bold text-espresso pb-4 border-b border-biscuit/20">
                Publish a Wisdom Blog Post
              </h2>

              <form onSubmit={handleBlogSubmit} className="space-y-4 font-sans text-xs text-espresso">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Blog Title *</label>
                    <input
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                      placeholder="e.g. Unraveling Patanjali"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Category *</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded text-xs bg-primary-white"
                    >
                      <option value="Yoga Philosophy">Yoga Philosophy</option>
                      <option value="Science of Yoga">Science of Yoga</option>
                      <option value="Meditation">Meditation</option>
                      <option value="Ayurveda">Ayurveda</option>
                      <option value="Research">Research</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Pregnancy Yoga">Pregnancy Yoga</option>
                      <option value="Teacher Education">Teacher Education</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Author Name *</label>
                    <input
                      type="text"
                      required
                      value={blogAuthor}
                      onChange={(e) => setBlogAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                    />
                  </div>
                  <div>
                    <ImageUploader
                      id="blog-image"
                      label="Header Image"
                      value={blogImage}
                      onChange={setBlogImage}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Short Summary (Kinfolk Intro style) *</label>
                  <input
                    type="text"
                    required
                    value={blogSummary}
                    onChange={(e) => setBlogSummary(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                    placeholder="Provide a 1-2 sentence lead overview of the shastric study..."
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Full Article content (Support header hashes '###' and quotes '&gt;') *</label>
                  <textarea
                    rows={8}
                    required
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white resize-y font-mono text-xs"
                    placeholder="### Chapter 1: The Mind&#10;Write content here...&#10;> Quote: 'Sthira sukham asanam'"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-olive-green text-white hover:bg-espresso transition-colors font-sans text-xs tracking-wider uppercase font-bold flex items-center gap-1 cursor-pointer rounded"
                >
                  <Plus size={14} />
                  <span>Publish Article</span>
                </button>
              </form>

              {/* Published articles */}
              <div className="pt-8 border-t border-biscuit/20">
                <h3 className="font-cinzel text-base font-bold text-espresso mb-4">Published Articles</h3>
                <div className="space-y-2">
                  {blogs.map(b => (
                    <div key={b.id} className="flex justify-between items-center p-3 border border-biscuit/20 rounded bg-[#FAFAF8] text-xs">
                      <div>
                        <span className="font-mono text-[9px] text-olive-green uppercase tracking-wider font-bold mr-2">{b.category}</span>
                        <strong className="text-espresso">{b.title}</strong>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setDeleteTarget({ type: 'blog', id: b.id, name: b.title })} 
                        className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: GALLERY MEDIA */}
          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-cinzel text-xl font-bold text-espresso pb-4 border-b border-biscuit/20">
                Upload Gallery Media URL
              </h2>

              <form onSubmit={handleGallerySubmit} className="space-y-4 font-sans text-xs text-espresso">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <ImageUploader
                      id="gallery-image"
                      label="Image Media"
                      value={galUrl}
                      onChange={setGalUrl}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Media Category *</label>
                    <select
                      value={galCategory}
                      onChange={(e) => setGalCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded text-xs bg-primary-white"
                    >
                      <option value="Classes">Classes</option>
                      <option value="Retreats">Retreats</option>
                      <option value="Teacher Training">Teacher Training</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Events">Events</option>
                      <option value="Awards">Awards</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Image Caption / Subheading *</label>
                  <input
                    type="text"
                    required
                    value={galCaption}
                    onChange={(e) => setGalCaption(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                    placeholder="e.g. Pranayama sessions during महेश्‍वर Retreat"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-olive-green text-white hover:bg-espresso transition-colors font-sans text-xs tracking-wider uppercase font-bold flex items-center gap-1 cursor-pointer rounded"
                >
                  <Plus size={14} />
                  <span>Upload Media Log</span>
                </button>
              </form>

              {/* Media gallery grid preview */}
              <div className="pt-8 border-t border-biscuit/20 space-y-4">
                <h3 className="font-cinzel text-base font-bold text-espresso">Media Catalogue</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="relative group rounded border border-biscuit/20 p-1 bg-[#FAFAF8]">
                      <div className="aspect-square rounded overflow-hidden relative">
                        <img src={item.url} alt={item.caption} referrerPolicy="no-referrer" className="w-full h-full object-cover filter sepia-[0.1]" />
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ type: 'gallery', id: item.id, name: item.caption || 'Gallery Image' })}
                          className="absolute top-1 right-1 p-1 bg-white/90 rounded text-red-600 border border-biscuit/25 hover:bg-red-50 cursor-pointer"
                          title="Delete Gallery Item"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                      <span className="block text-[8px] font-mono text-espresso/50 mt-1 uppercase truncate font-bold text-center">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-cinzel text-xl font-bold text-espresso pb-4 border-b border-biscuit/20">
                Update Seeker Testimonials
              </h2>

              <form onSubmit={handleTestimonialSubmit} className="space-y-4 font-sans text-xs text-espresso">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Seeker / Author Name *</label>
                    <input
                      type="text"
                      required
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                      placeholder="e.g. Ketaki Deshmukh"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Profession / Role</label>
                    <input
                      type="text"
                      value={testRole}
                      onChange={(e) => setTestRole(e.target.value)}
                      className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white"
                      placeholder="e.g. Senior Pediatrician"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">Testimony Text *</label>
                  <textarea
                    rows={4}
                    required
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    className="w-full px-3 py-2 border border-biscuit/30 rounded bg-primary-white resize-none"
                    placeholder="Enter the authentic testimonial..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-olive-green text-white hover:bg-espresso transition-colors font-sans text-xs tracking-wider uppercase font-bold flex items-center gap-1 cursor-pointer rounded"
                >
                  <Plus size={14} />
                  <span>Publish Testimonial</span>
                </button>
              </form>

              {/* Existing testimonial list */}
              <div className="pt-8 border-t border-biscuit/20">
                <h3 className="font-cinzel text-base font-bold text-espresso mb-4">Reviews Catalogue</h3>
                <div className="space-y-3">
                  {testimonials.map(t => (
                    <div key={t.id} className="p-4 border border-biscuit/20 rounded-lg bg-[#FAFAF8] text-xs flex justify-between items-center gap-4">
                      <div>
                        <strong className="text-espresso block">{t.name} ({t.role})</strong>
                        <span className="text-espresso/70 italic mt-1 block">"{t.text}"</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setDeleteTarget({ type: 'testimonial', id: t.id, name: `${t.name}'s testimonial` })} 
                        className="p-1 text-red-600 hover:bg-red-50 rounded shrink-0 cursor-pointer"
                        title="Delete Testimonial"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: INQUIRIES BOX */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-cinzel text-xl font-bold text-espresso pb-4 border-b border-biscuit/20">
                Inquiries Inbox
              </h2>

              <div className="space-y-4">
                {inquiries.length > 0 ? (
                  inquiries.map((inq) => (
                    <div 
                      key={inq.id} 
                      className={`p-6 border rounded-xl shadow-xs space-y-4 ${
                        inq.status === 'Pending' 
                          ? 'border-amber-300 bg-amber-50/20' 
                          : inq.status === 'Contacted'
                          ? 'border-green-300 bg-green-50/10'
                          : 'border-biscuit/20 bg-primary-white'
                      }`}
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <span className="font-sans text-[9px] uppercase tracking-wider font-bold bg-white px-2.5 py-0.5 rounded border border-biscuit/30 mr-2">
                            {inq.programInterestedIn}
                          </span>
                          <strong className="text-sm font-cinzel text-espresso">{inq.name}</strong>
                          <span className="text-[10px] text-espresso/45 block mt-0.5">Date Submitted: {inq.date}</span>
                        </div>
                        
                        {/* Interactive Status toggle */}
                        <div className="flex gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-[10px] font-sans px-2 py-1 border border-biscuit bg-white cursor-pointer rounded text-espresso focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Archived">Archived</option>
                          </select>
                          <button 
                            type="button"
                            onClick={() => setDeleteTarget({ type: 'inquiry', id: inq.id, name: `Inquiry from ${inq.name}` })} 
                            className="p-1 bg-white text-red-600 border border-biscuit/20 hover:bg-red-50 rounded cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 border border-biscuit/15 rounded text-xs text-espresso leading-relaxed">
                        <p className="font-semibold text-espresso/40 text-[9px] uppercase tracking-widest mb-1.5">Sadhaka message</p>
                        <p className="whitespace-pre-line">{inq.message}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs font-mono text-espresso/70">
                        <p><strong>Phone:</strong> <span className="select-all text-olive-green">{inq.phone}</span></p>
                        <p><strong>Email:</strong> <span className="select-all text-olive-green">{inq.email}</span></p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border border-dashed border-biscuit/25 rounded-xl text-espresso/50 italic font-serif">
                    No submitted inquiries in ledger log.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 7: BACKUP & RECOVERY */}
          {activeTab === 'backup' && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="font-cinzel text-xl font-bold text-espresso pb-4 border-b border-biscuit/20">
                Database Backup & Import-Export
              </h2>

              <div className="p-6 border border-biscuit/30 bg-[#FAFAF8] rounded-xl space-y-4">
                <div className="flex items-start gap-3 text-amber-800">
                  <AlertCircle className="shrink-0 mt-0.5 text-olive-green" size={20} />
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-espresso uppercase tracking-wider">Offline-First Durability Guidelines</h4>
                    <p className="font-sans text-[11px] text-espresso/70 leading-relaxed mt-1">
                      All edits, new programs, blog publications, and cert directories are stored inside the browser's persistent **localStorage** container. Clearing the browser cache or accessing from another device can reset configurations. Use the controls below to download or restore a complete JSON snapshot file.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                
                {/* Export Card */}
                <div className="p-6 border border-biscuit/30 rounded-xl space-y-4 text-center">
                  <Download className="mx-auto text-olive-green" size={32} />
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-espresso uppercase">Export Ledger Backup</h3>
                    <p className="font-sans text-[11px] text-espresso/60 leading-relaxed mt-1">Save all student registers, custom programs, published articles, and inquiries as a JSON backup.</p>
                  </div>
                  <button
                    onClick={exportBackup}
                    className="w-full py-3 bg-espresso hover:bg-olive-green text-primary-white font-sans text-xs tracking-widest uppercase font-semibold transition-colors rounded cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                  >
                    <Download size={14} />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 border border-biscuit/30 rounded-xl space-y-4 text-center">
                  <Upload className="mx-auto text-olive-green" size={32} />
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-espresso uppercase">Restore Database Backup</h3>
                    <p className="font-sans text-[11px] text-espresso/60 leading-relaxed mt-1">Upload an exported Ishwari `.json` configuration backup to restore your exact custom CMS settings instantly.</p>
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                      id="import-backup-file-input"
                    />
                    <label
                      htmlFor="import-backup-file-input"
                      className="w-full py-3 bg-transparent border border-biscuit text-espresso hover:bg-warm-beige/25 font-sans text-xs tracking-widest uppercase font-semibold transition-all rounded cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                    >
                      <Upload size={14} />
                      <span>Upload Backup File</span>
                    </label>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* In-App Deletion Confirmation Modal (Guaranteed to work in sandboxed iframes) */}
      {deleteTarget && (
        <div 
          id="delete-confirmation-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-xs animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteTarget(null);
          }}
        >
          <div className="bg-primary-white border border-biscuit/40 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="absolute top-4 right-4 text-espresso/40 hover:text-espresso p-1 rounded transition-colors cursor-pointer"
              title="Cancel and close dialog"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-50 text-red-600 rounded-full shrink-0 border border-red-100">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-espresso">
                  Confirm Permanent Deletion
                </h3>
                <span className="text-[10px] font-mono text-red-600 uppercase tracking-wider font-semibold">
                  Permanent Removal
                </span>
              </div>
            </div>

            <div className="text-left space-y-2">
              <p className="font-sans text-sm text-espresso/85 leading-relaxed">
                Are you sure you want to delete{' '}
                <span className="font-bold text-espresso">"{deleteTarget.name}"</span>?
              </p>
              <p className="font-sans text-xs text-espresso/60 leading-relaxed">
                {deleteTarget.type === 'program' && 'This will immediately remove this course from your course catalog, home page, and enrollment portals.'}
                {deleteTarget.type === 'student' && 'This credential will be permanently removed from the alumni verification register.'}
                {deleteTarget.type === 'blog' && 'This article will be unpublished and erased from your blog section.'}
                {deleteTarget.type === 'gallery' && 'This media photo will be removed from the gallery.'}
                {deleteTarget.type === 'testimonial' && 'This review will be permanently deleted.'}
                {deleteTarget.type === 'inquiry' && 'This inquiry record will be deleted from your ledger.'}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-biscuit/20">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-biscuit/40 rounded-lg text-espresso/70 hover:text-espresso hover:bg-warm-beige/30 text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-delete-action-btn"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Trash2 size={13} />
                <span>
                  {deleteTarget.type === 'program' 
                    ? 'Yes, Delete Course' 
                    : deleteTarget.type === 'student' 
                    ? 'Yes, Delete Certificate' 
                    : deleteTarget.type === 'blog' 
                    ? 'Yes, Delete Article' 
                    : 'Yes, Delete Item'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
