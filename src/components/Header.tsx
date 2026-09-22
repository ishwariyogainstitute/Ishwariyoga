import React, { useState } from 'react';
import { Menu, X, Key, ShieldCheck, GraduationCap, User, LogIn, UserPlus, BookOpen, LogOut } from 'lucide-react';
import { LotusFlower } from './BotanicalAssets';
import { useYoga } from '../context/YogaContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onNavigateDetail?: (view: [string, string]) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentStudent, logoutStudent, openAuthModal } = useYoga();

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'ycb', label: 'YCB Teacher Training' },
    { id: 'certified-students', label: 'YCB Certified Students' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (id: string) => {
    if (id === 'about' && (currentPage === 'home' || currentPage === 'about')) {
      document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage('about');
    } else {
      setCurrentPage(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header id="iys-header" className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-biscuit/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none">
            <LotusFlower size={42} className="text-olive-green group-hover:rotate-12 transition-transform duration-700" />
            <div>
              <span className="block font-cinzel text-xl md:text-2xl font-semibold tracking-[0.12em] text-espresso uppercase leading-tight">Ishwari</span>
              <span className="block font-sans text-xs tracking-[0.3em] text-biscuit uppercase font-medium">Yoga Institute</span>
            </div>
          </button>

          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`font-sans text-xs tracking-[0.18em] uppercase py-2 transition-all relative group cursor-pointer focus:outline-none ${currentPage === item.id ? 'text-espresso font-semibold' : 'text-espresso/60 hover:text-espresso'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-olive-green transition-all ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}

            {!currentStudent ? (
              <div className="flex items-center gap-2 pl-2 border-l border-biscuit/30">
                <button type="button" onClick={() => openAuthModal({ mode: 'login' })} className="flex items-center gap-1.5 font-sans text-xs tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full bg-espresso hover:bg-espresso/90 text-primary-white cursor-pointer">
                  <User size={13} />
                  <span>Member Login</span>
                </button>
                <button type="button" onClick={() => handleNav('student-portal')} className="flex items-center gap-1.5 font-sans text-xs tracking-[0.14em] uppercase px-3 py-1.5 rounded-full bg-warm-beige/40 text-espresso/80 hover:bg-olive-green/10 border border-biscuit/40 cursor-pointer">
                  <GraduationCap size={14} />
                  <span>Portal</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-biscuit/30">
                 {!currentStudent ? (
              <button
                id="hero-member-login-btn"
                onClick={() => openAuthModal({ mode: 'login' })}
                className="px-6 py-3.5 bg-espresso hover:bg-espresso/90 text-primary-white rounded-lg font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <User size={14} />
                <span>Member Login / Register</span>
              </button>
            ) : (
              <button
                id="hero-student-portal-btn"
                onClick={() => setCurrentPage('student-portal')}
                className="px-6 py-3.5 bg-olive-green text-primary-white hover:bg-olive-green/90 rounded-lg font-sans text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap size={14} />
                <span>Training Enroll</span>
              </button>
            )}
              </div>
            )}

            <button onClick={() => handleNav('admin')} className="flex items-center gap-1 font-sans text-xs tracking-[0.15em] uppercase px-3 py-1.5 border border-biscuit/40 rounded-full text-espresso/60 hover:text-olive-green hover:border-olive-green cursor-pointer">
              <ShieldCheck size={14} />
              <span>CMS Admin</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {!currentStudent ? (
              <button type="button" onClick={() => openAuthModal({ mode: 'login' })} className="px-2.5 py-1 rounded-full bg-espresso text-primary-white font-sans text-[11px] uppercase tracking-wider font-semibold cursor-pointer">Login</button>
            ) : (
              <button type="button" onClick={() => handleNav('student-portal')} className="px-2.5 py-1 rounded-full bg-olive-green text-primary-white font-sans text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1 cursor-pointer">
                <GraduationCap size={12} />
                <span>Portal</span>
              </button>
            )}
            <button onClick={() => handleNav('admin')} className="p-2 rounded-full border border-biscuit/30 text-espresso/60 cursor-pointer" title="Admin CMS"><Key size={16} /></button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-espresso hover:text-olive-green cursor-pointer" aria-label="Toggle Menu">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#FAFAF8] border-b border-biscuit/20 px-4 pt-2 pb-6 space-y-2 shadow-sm">
          {!currentStudent ? (
            <div className="p-3 bg-warm-beige/30 border border-biscuit/30 rounded-xl space-y-2 mb-3">
              <span className="text-[10px] font-mono uppercase text-biscuit font-bold block">Member Services & Course Admissions</span>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setIsOpen(false); openAuthModal({ mode: 'login' }); }} className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-espresso text-primary-white font-sans text-xs uppercase font-semibold cursor-pointer"><LogIn size={13} /><span>Member Login</span></button>
                <button type="button" onClick={() => { setIsOpen(false); openAuthModal({ mode: 'register' }); }} className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-olive-green text-primary-white font-sans text-xs uppercase font-semibold cursor-pointer"><UserPlus size={13} /><span>Register</span></button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-olive-green/10 border border-olive-green/30 rounded-xl space-y-2.5 mb-3">
              <div className="flex items-center justify-between"><span className="text-xs font-sans font-bold text-espresso">Sadhaka: {currentStudent.name}</span><button type="button" onClick={() => { logoutStudent(); setIsOpen(false); }} className="text-[10px] font-sans text-espresso/60 hover:text-red-600 underline cursor-pointer">Sign Out</button></div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => handleNav('student-portal')} className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-olive-green text-primary-white font-sans text-xs uppercase font-semibold cursor-pointer"><GraduationCap size={13} /><span>My Portal</span></button>
                <button type="button" onClick={() => handleNav('programs')} className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-olive-green/40 text-olive-green font-sans text-xs uppercase font-semibold cursor-pointer"><BookOpen size={13} /><span>Training Enroll</span></button>
              </div>
            </div>
          )}

          {menuItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)} className={`block w-full text-left py-2.5 px-4 rounded font-sans text-xs tracking-[0.18em] uppercase cursor-pointer ${currentPage === item.id ? 'bg-warm-beige/50 text-espresso font-semibold border-l-2 border-olive-green' : 'text-espresso/75 hover:bg-warm-beige/30'}`}>{item.label}</button>
          ))}
          <button onClick={() => handleNav('admin')} className="flex items-center gap-2 w-full text-left py-3 px-4 rounded font-sans text-xs tracking-[0.18em] uppercase text-espresso/75 hover:bg-warm-beige/30 cursor-pointer"><ShieldCheck size={16} /><span>CMS Admin Dashboard</span></button>
        </div>
      )}
    </header>
  );
};
