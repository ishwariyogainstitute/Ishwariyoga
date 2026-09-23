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
    <header id="iys-header" className="sticky top-0 z-50 border-b border-[#b86d4a]/20 bg-[#fffaf4]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <button onClick={() => handleNav('home')} className="group flex cursor-pointer items-center gap-3 text-left focus:outline-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b86d4a]/20 bg-[#f5eadb] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <LotusFlower size={28} className="text-[#687454]" />
            </div>
            <div>
              <span className="block font-serif text-xl font-semibold uppercase tracking-[0.16em] text-[#50362a] md:text-2xl leading-tight">Ishwari</span>
              <span className="block font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#b86d4a]">Yoga Institute</span>
            </div>
          </button>

          <nav id="desktop-nav" className="hidden items-center space-x-7 lg:flex">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`group relative cursor-pointer py-2 font-sans text-[11px] uppercase tracking-[0.18em] transition-all ${currentPage === item.id ? 'font-semibold text-[#50362a]' : 'text-[#684f42] hover:text-[#b86d4a]'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#b86d4a] transition-all ${currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}

            {!currentStudent ? (
              <div className="flex items-center gap-2 border-l border-[#b86d4a]/20 pl-2">
                <button type="button" onClick={() => openAuthModal({ mode: 'login' })} className="flex items-center gap-1.5 rounded-full border border-[#b86d4a]/25 bg-[#f4e4d3] px-3.5 py-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[#50362a] transition-all hover:border-[#b86d4a] hover:bg-[#f2d9c7]">
                  <User size={13} />
                  <span>Member Login</span>
                </button>
                <button type="button" onClick={() => handleNav('student-portal')} className="flex items-center gap-1.5 rounded-full bg-[#687454] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#fffaf4] transition-all hover:bg-[#5a6a46]">
                  <GraduationCap size={14} />
                  <span>Portal</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-[#b86d4a]/20 pl-2">
                <button type="button" onClick={() => handleNav('student-portal')} className="flex items-center gap-1.5 rounded-full bg-[#687454] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#fffaf4] transition-all hover:bg-[#5a6a46]">
                  <GraduationCap size={14} />
                  <span>Portal</span>
                </button>
              </div>
            )}

            <button onClick={() => handleNav('admin')} className="flex items-center gap-2 rounded-full border border-[#b86d4a]/25 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#50362a] transition-all hover:border-[#b86d4a] hover:bg-[#f5eadb]">
              <ShieldCheck size={14} />
              <span>CMS Admin</span>
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {!currentStudent ? (
              <button type="button" onClick={() => openAuthModal({ mode: 'login' })} className="rounded-full bg-[#50362a] px-2.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-[#fffaf4]">
                Login
              </button>
            ) : (
              <button type="button" onClick={() => handleNav('student-portal')} className="rounded-full bg-[#687454] px-2.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-[#fffaf4]">
                <GraduationCap size={12} />
              </button>
            )}
            <button onClick={() => handleNav('admin')} className="rounded-full border border-[#b86d4a]/25 p-2 text-[#50362a]" title="Admin CMS"><Key size={16} /></button>
            <button onClick={() => setIsOpen(!isOpen)} className="rounded-full p-2 text-[#50362a]" aria-label="Toggle Menu">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-nav-drawer" className="border-b border-[#b86d4a]/20 bg-[#fffaf4] px-4 pb-6 pt-2 shadow-sm lg:hidden">
          {!currentStudent ? (
            <div className="mb-3 space-y-2 rounded-2xl border border-[#b86d4a]/20 bg-[#f5eadb] p-3">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#b86d4a]">Member services</span>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setIsOpen(false); openAuthModal({ mode: 'login' }); }} className="flex items-center justify-center gap-1.5 rounded-xl bg-[#50362a] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#fffaf4]">
                  <User size={12} />
                  <span>Login</span>
                </button>
                <button type="button" onClick={() => { setIsOpen(false); openAuthModal({ mode: 'register' }); }} className="flex items-center justify-center gap-1.5 rounded-xl border border-[#b86d4a]/20 bg-[#fffaf4] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#50362a]">
                  <UserPlus size={12} />
                  <span>Join</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-3 space-y-2.5 rounded-2xl border border-[#687454]/20 bg-[#edf2e6] p-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-bold text-[#50362a]">Sadhaka: {currentStudent.name}</span>
                <button type="button" onClick={() => { setIsOpen(false); logoutStudent(); }} className="flex items-center gap-1 rounded-full border border-[#687454]/25 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-[#50362a]">
                  <LogOut size={12} />
                  <span>Exit</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => handleNav('student-portal')} className="rounded-xl bg-[#687454] px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#fffaf4]">Portal</button>
                <button type="button" onClick={() => handleNav('programs')} className="rounded-xl border border-[#687454]/25 px-3 py-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#50362a]">Programs</button>
              </div>
            </div>
          )}

          {menuItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)} className={`block w-full rounded-xl px-4 py-3 text-left font-sans text-[10px] uppercase tracking-[0.18em] ${currentPage === item.id ? 'bg-[#f5eadb] text-[#50362a]' : 'text-[#50362a]/80 hover:bg-[#f5eadb]'}`}>
              {item.label}
            </button>
          ))}

          <button onClick={() => handleNav('admin')} className="mt-2 flex w-full items-center gap-2 rounded-xl border border-[#b86d4a]/20 px-4 py-3 font-sans text-[10px] uppercase tracking-[0.18em] text-[#50362a] hover:bg-[#f5eadb]">
            <ShieldCheck size={14} />
            <span>CMS Admin</span>
          </button>
        </div>
      )}
    </header>
  );
};
