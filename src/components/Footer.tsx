import React from 'react';
import { Mail, Phone, MapPin, Youtube, Instagram, MessageCircle, Heart } from 'lucide-react';
import { LotusFlower } from './BotanicalAssets';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const handleNav = (page: string) => {
    if (page === 'about') {
      const el = document.getElementById('about-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setCurrentPage('about');
        return;
      }
      setCurrentPage('about');
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="iys-footer" className="relative overflow-hidden border-t border-[#b86d4a]/25 bg-[#f5eadb] px-4 pb-8 pt-16 text-[#50362a] sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b86d4a]/50 to-transparent" />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b86d4a]/20 bg-[#fffaf4] shadow-sm">
              <LotusFlower size={28} className="text-[#687454]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-[#50362a] leading-none">Ishwari</h3>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b86d4a]">Yoga Institute</span>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#5f4a41]">Dedicated to preserving, studying, and sharing authentic yogic knowledge. We integrate traditional shastra education with modern anatomical safety and practical daily living.</p>
          <div className="flex items-center gap-3 pt-1">
            <a href="https://youtube.com/@ishwariyoga" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b86d4a]/20 bg-[#fffaf4] text-[#50362a] shadow-sm transition-all hover:border-[#b86d4a] hover:text-[#b86d4a]"><Youtube size={16} /></a>
            <a href="https://instagram.com/ishwariyoga" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b86d4a]/20 bg-[#fffaf4] text-[#50362a] shadow-sm transition-all hover:border-[#b86d4a] hover:text-[#b86d4a]"><Instagram size={16} /></a>
            <a href="https://wa.me/918208368237" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Contact" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b86d4a]/20 bg-[#fffaf4] text-[#50362a] shadow-sm transition-all hover:border-[#687454] hover:text-[#687454]"><MessageCircle size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="mb-6 border-b border-[#b86d4a]/20 pb-2 font-serif text-lg font-semibold uppercase tracking-[0.12em] text-[#50362a]">Institute Links</h4>
          <ul className="space-y-3 font-sans text-sm">
            {[{ id: 'home', label: 'Home Page' }, { id: 'about', label: 'About Founders' }, { id: 'student-portal', label: 'Student Learning Portal' }, { id: 'programs', label: 'Our Programs' }, { id: 'ycb', label: 'YCB Teacher Training' }, { id: 'certified-students', label: 'Search Certified Students' }, { id: 'gallery', label: 'Media Gallery' }, { id: 'blogs', label: 'Yogic Blogs' }, { id: 'contact', label: 'Inquire / Contact' }].map((link) => (
              <li key={link.id}><button onClick={() => handleNav(link.id)} className="group flex items-center gap-2 text-left text-[#5f4a41] transition-colors hover:text-[#687454]"><span className="h-1.5 w-1.5 rounded-full bg-[#b86d4a] opacity-0 transition-opacity group-hover:opacity-100" /><span>{link.label}</span></button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 border-b border-[#b86d4a]/20 pb-2 font-serif text-lg font-semibold uppercase tracking-[0.12em] text-[#50362a]">Contact Information</h4>
          <ul className="space-y-4 text-sm text-[#5f4a41]">
            <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-[#687454]" /><span><strong className="font-semibold text-[#50362a]">Main Campus:</strong><br />Ishwari Yoga Institute, R/H 3, Siddhant Classic, A Wing, Clover Park, Behind Baker Gauges, Robertshaw Company Road, Viman Nagar, Pune – 411014, Maharashtra, India</span></li>
            <li className="flex items-center gap-3"><Phone size={16} className="shrink-0 text-[#687454]" /><span>+91 8208368237 / +91 9607517375</span></li>
            <li className="flex items-center gap-3"><Mail size={16} className="shrink-0 text-[#687454]" /><a href="mailto:Devikabhide8@gmail.com" className="transition-colors hover:text-[#687454]">Devikabhide8@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 border-b border-[#b86d4a]/20 pb-2 font-serif text-lg font-semibold uppercase tracking-[0.12em] text-[#50362a]">Gurukul Location</h4>
          <div className="h-48 overflow-hidden rounded-[1.25rem] border border-[#b86d4a]/20 bg-[#fffaf4] shadow-sm">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3387766579365!2d73.91264857601723!3d18.560940568019313" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(0.2) sepia(0.12) contrast(0.96)' }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ishwari Yoga Institute Pune Map" />
          </div>
          <p className="mt-3 text-center text-[11px] text-[#5f4a41]">Located in beautiful Viman Nagar near Clover Park.</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#b86d4a]/20 pt-8 text-center text-xs text-[#5f4a41] sm:flex-row sm:text-left">
        <p>© {currentYear} Ishwari Yoga Institute. All traditional and intellectual rights reserved.</p>
        <p className="flex items-center gap-1.5">Made with reverence for Yoga Shastra & Indian Heritage <Heart size={10} className="fill-[#b86d4a] text-[#b86d4a]" /></p>
      </div>
    </footer>
  );
};
