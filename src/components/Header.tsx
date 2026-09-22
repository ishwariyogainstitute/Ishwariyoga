import React, { useState } from 'react';
import { Menu, X, Key, ShieldCheck, GraduationCap, User, LogIn, UserPlus, BookOpen, LogOut } from 'lucide-react';
import { LotusFlower } from './BotanicalAssets';
import { useYoga } from '../context/YogaContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onNavigateDetail?: (view: [string, string]) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onNavigateDetail }) => {
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
    if (id === 'about') {
      if (currentPage === 'home' || currentPage === 'about') {
        const el = document.getElementById('about-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setCurrentPage('about');
          setIsOpen(false);
          return;
        }
      }
      setCurrentPage('about');
      setIsOpen(false);
      return;
    }
    setCurrentPage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="iys-header" className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-biscuit/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo & Brand Name */}
          <button 
            id="logo-button"
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <LotusFlower size={42} className="text-olive-green group-hover:rotate-12 transition-transform duration-700 ease-out" />
            <div>
              <span className="block font-cinzel text-xl md:text-2xl font-semibold tracking-[0.12em] text-espresso uppercase leading-tight">
                Ishwari
              </span>
              <span className="block font-sans text-xs tracking-[0.3em] text-biscuit uppercase font-medium">
                Yoga Institute
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`font-sans text-xs tracking-[0.18em] uppercase py-2 transition-all duration-300 relative group cursor-pointer focus:outline-none ${
                    isActive 
                      ? 'text-espresso font-semibold' 
                      : 'text-espresso/60 hover:text-espresso font-normal'
                  }`}
                >
                  {item.label}
                  {/* Underline indicator */}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-olive-green transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              );
            })}

            {/* MEMBER AUTHENTICATION & PORTAL ACTIONS */}
            {!currentStudent ? (
              <div className="flex items-center gap-2 pl-2 border-l border-biscuit/30">
                {/* Clear Member Login Button */}
                <button
                  type="button"
                  id="header-member-login-btn"
                  onClick={() => openAuthModal({ mode: 'login' })}
                  className="flex items-center gap-1.5 font-sans text-xs tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 bg-espresso hover:bg-espresso/90 text-primary-white shadow-xs cursor-pointer"
                  title="Member Login & Course Registration"
                >
                  <User size={13} />
                  <span>Member Login</span>
                </button>

                {/* Student Learning Portal */}
                <button
                  type="button"
                  id="student-portal-nav-button"
                  onClick={() => handleNav('student-portal')}
                  className={`flex items-center gap-1.5 font-sans text-xs tracking-[0.14em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === 'student-portal' || currentPage === 'student-login'
                      ? 'bg-olive-green text-primary-white shadow-xs font-semibold'
                      : 'bg-warm-beige/40 text-espresso/80 hover:bg-olive-green/10 hover:text-olive-green border border-biscuit/40'
                  }`}
                  title="Student Portal (Lectures, Materials, Bio & Certificate)"
                >
                  <GraduationCap size={14} />
                  <span>Portal</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-biscuit/30">
                {/* Logged in member badge */}
                <button
                  type="button"
                  id="student-portal-active-btn"
                  onClick={() => handleNav('student-portal')}
                  className={`flex items-center gap-1.5 font-sans text-xs tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === 'student-portal'
                      ? 'bg-olive-green text-primary-white shadow-xs font-semibold'
                      : 'bg-olive-green/10 text-olive-green hover:bg-olive-green hover:text-primary-white border border-olive-green/30 font-medium'
                  }`}
                  title="Open your student dashboard and lecture sessions"
                >
                  <GraduationCap size={14} />
                  <span>Sadhaka: {currentStudent.name.split(' ')[0]}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </button>

                <button
                  type="button"
                  id="register-course-header-btn"
                  onClick={() => handleNav('programs')}
                  className="hidden xl:flex items-center gap-1 font-sans text-xs tracking-[0.12em] uppercase px-2.5 py-1.5 rounded-full border border-biscuit/50 text-espresso/70 hover:text-olive-green hover:border-olive-green transition-colors cursor-pointer"
                  title="Register for a new course"
                >
                  <BookOpen size={13} />
                  <span>Enroll Course</span>
                </button>

                <button
                  type="button"
                  id="header-logout-btn"
                  onClick={() => logoutStudent()}
                  className="p-1.5 rounded-full border border-biscuit/30 text-espresso/40 hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer"
                  title="Sign out of member account"
                >
                  <LogOut size={13} />
                </button>
              </div>
            )}

            {/* Admin Dashboard Entry link (subtle and beautiful) */}
            <button
              id="admin-nav-button"
              onClick={() => handleNav('admin')}
              className={`flex items-center gap-1 font-sans text-xs tracking-[0.15em] uppercase px-3 py-1.5 border rounded-full transition-all duration-300 ${
                currentPage === 'admin'
                  ? 'border-olive-green text-olive-green bg-olive-green/5 font-semibold'
                  : 'border-biscuit/40 text-espresso/60 hover:text-olive-green hover:border-olive-green'
              }`}
              title="Admin Portal"
            >
              <ShieldCheck size={14} />
              <span>CMS Admin</span>
            </button>
          </nav>

          {/* Mobile Menu Trigger & Admin Shortcut */}
          <div className="flex items-center gap-2 lg:hidden">
            {!currentStudent ? (
              <button
                type="button"
                id="header-mobile-login-quick"
                onClick={() => openAuthModal({ mode: 'login' })}
                className="px-2.5 py-1 rounded-full bg-espresso text-primary-white font-sans text-[11px] uppercase tracking-wider font-semibold cursor-pointer"
              >
                Login
              </button>
            ) : (
              <button
                type="button"
                id="header-mobile-portal-quick"
                onClick={() => handleNav('student-portal')}
                className="px-2.5 py-1 rounded-full bg-olive-green text-primary-white font-sans text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1 cursor-pointer"
              >
                <GraduationCap size={12} />
                <span>Portal</span>
              </button>
            )}

            <button
              id="admin-mobile-shortcut"
              onClick={() => handleNav('admin')}
              className={`p-2 rounded-full border transition-all duration-300 ${
                currentPage === 'admin'
                  ? 'border-olive-green text-olive-green bg-olive-green/5'
                  : 'border-biscuit/30 text-espresso/60'
              }`}
              title="Admin CMS"
            >
              <Key size={16} />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-espresso hover:text-olive-green transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#FAFAF8] border-b border-biscuit/20 px-4 pt-2 pb-6 space-y-2 shadow-sm animate-fadeIn">
          
          {/* Member Authentication Banner for Mobile */}
          {!currentStudent ? (
            <div className="p-3 bg-warm-beige/30 border border-biscuit/30 rounded-xl space-y-2 mb-3">
              <span className="text-[10px] font-mono uppercase text-biscuit font-bold block">
                Member Services & Course Admissions
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="mobile-member-login-btn"
                  onClick={() => { setIsOpen(false); openAuthModal({ mode: 'login' }); }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-espresso text-primary-white font-sans text-xs tracking-wider uppercase font-semibold text-center cursor-pointer"
                >
                  <LogIn size={13} />
                  <span>Member Login</span>
                </button>
                <button
                  type="button"
                  id="mobile-member-register-btn"
                  onClick={() => { setIsOpen(false); openAuthModal({ mode: 'register' }); }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-olive-green text-primary-white font-sans text-xs tracking-wider uppercase font-semibold text-center cursor-pointer"
                >
                  <UserPlus size={13} />
                  <span>Register</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-olive-green/10 border border-olive-green/30 rounded-xl space-y-2.5 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-sans font-bold text-espresso">
                    Sadhaka: {currentStudent.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => { logoutStudent(); setIsOpen(false); }}
                  className="text-[10px] font-sans text-espresso/60 hover:text-red-600 underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNav('student-portal')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-olive-green text-primary-white font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer"
                >
                  <GraduationCap size={13} />
                  <span>My Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('programs')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-olive-green/40 text-olive-green hover:bg-olive-green/10 font-sans text-xs tracking-wider uppercase font-semibold cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>Enroll Course</span>
                </button>
              </div>
            </div>
          )}

          {menuItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`block w-full text-left py-2.5 px-4 rounded font-sans text-xs tracking-[0.18em] uppercase transition-colors ${
                  isActive 
                    ? 'bg-warm-beige/50 text-espresso font-semibold border-l-2 border-olive-green' 
                    : 'text-espresso/75 hover:bg-warm-beige/30 hover:text-espresso'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {/* Student Portal Mobile Button */}
          <button
            id="mobile-nav-student-portal"
            onClick={() => handleNav('student-portal')}
            className={`flex items-center justify-between w-full text-left py-3 px-4 rounded font-sans text-xs tracking-[0.18em] uppercase transition-colors ${
              currentPage === 'student-portal' || currentPage === 'student-login'
                ? 'bg-olive-green text-primary-white font-semibold shadow-xs'
                : 'bg-warm-beige/40 text-espresso font-semibold hover:bg-olive-green/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={16} />
              <span>{currentStudent ? `Portal: ${currentStudent.name.split(' ')[0]}` : 'Student Learning Portal'}</span>
            </div>
            {currentStudent && (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            )}
          </button>

          <button
            id="mobile-nav-admin"
            onClick={() => handleNav('admin')}
            className={`flex items-center gap-2 w-full text-left py-3 px-4 rounded font-sans text-xs tracking-[0.18em] uppercase transition-colors ${
              currentPage === 'admin'
                ? 'bg-olive-green/5 text-olive-green font-semibold border-l-2 border-olive-green'
                : 'text-espresso/75 hover:bg-warm-beige/30 hover:text-olive-green'
            }`}
          >
            <ShieldCheck size={16} />
            <span>CMS Admin Dashboard</span>
          </button>
        </div>
      )}
    </header>
  );
};
