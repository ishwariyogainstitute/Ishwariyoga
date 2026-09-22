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
    <footer id="iys-footer" className="bg-[#F3EBDD] border-t border-biscuit/40 text-espresso pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-biscuit to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Col 1: Institute Intro */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <LotusFlower size={36} className="text-olive-green" />
            <div>
              <h3 className="font-cinzel text-lg font-bold tracking-[0.1em] text-espresso uppercase leading-none">
                Ishwari
              </h3>
              <span className="text-[10px] tracking-[0.25em] text-biscuit font-semibold uppercase block">
                Yoga Institute
              </span>
            </div>
          </div>
          <p className="font-sans text-sm text-espresso/70 leading-relaxed max-w-sm">
            Dedicated to preserving, studying, and sharing authentic yogic knowledge. We integrate traditional shastra education with modern anatomical safety and practical daily living.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a
              href="https://youtube.com/@ishwariyoga"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-primary-white border border-biscuit/20 text-espresso/80 hover:text-red-600 hover:border-red-400 transition-all duration-300 shadow-sm"
              aria-label="YouTube Channel"
            >
              <Youtube size={16} />
            </a>
            <a
              href="https://instagram.com/ishwariyoga"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-primary-white border border-biscuit/20 text-espresso/80 hover:text-pink-600 hover:border-pink-400 transition-all duration-300 shadow-sm"
              aria-label="Instagram Profile"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://wa.me/918208368237"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-primary-white border border-biscuit/20 text-espresso/80 hover:text-green-600 hover:border-green-400 transition-all duration-300 shadow-sm"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-cinzel text-sm font-semibold tracking-wider text-espresso uppercase mb-6 border-b border-biscuit/30 pb-2">
            Institute Links
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            {[
              { id: 'home', label: 'Home Page' },
              { id: 'about', label: 'About Founders' },
              { id: 'student-portal', label: 'Student Learning Portal' },
              { id: 'programs', label: 'Our Programs' },
              { id: 'ycb', label: 'YCB Teacher Training' },
              { id: 'certified-students', label: 'Search Certified Students' },
              { id: 'gallery', label: 'Media Gallery' },
              { id: 'blogs', label: 'Yogic Blogs' },
              { id: 'contact', label: 'Inquire / Contact' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="text-espresso/70 hover:text-olive-green transition-colors cursor-pointer text-left focus:outline-none flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-biscuit opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact Info */}
        <div className="space-y-6">
          <h4 className="font-cinzel text-sm font-semibold tracking-wider text-espresso uppercase border-b border-biscuit/30 pb-2">
            Contact Information
          </h4>
          <ul className="space-y-4 font-sans text-sm text-espresso/80">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-olive-green shrink-0 mt-0.5" />
              <span>
                <strong>Main Campus:</strong><br />
                Ishwari Yoga Institute, R/H 3, Siddhant Classic, A Wing, Clover Park, Behind Baker Gauges, Robertshaw Company Road, Viman Nagar, Pune – 411014, Maharashtra, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-olive-green shrink-0" />
              <span>+91 8208368237 / +91 9607517375</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-olive-green shrink-0" />
              <a href="mailto:Devikabhide8@gmail.com" className="hover:text-olive-green transition-colors">
                Devikabhide8@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Google Maps Frame */}
        <div className="space-y-4">
          <h4 className="font-cinzel text-sm font-semibold tracking-wider text-espresso uppercase border-b border-biscuit/30 pb-2">
            Gurukul Location
          </h4>
          <div className="rounded-lg overflow-hidden border border-biscuit/40 shadow-sm h-48 bg-primary-white">
            {/* Embedded maps iframe representing a realistic location in Pune, Erandwane */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3387766579365!2d73.91264857601723!3d18.560940568019313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b4e85749%3A0x26c043f11dae6051!2sViman%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721510000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.3) sepia(0.1) contrast(0.95)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ishwari Yoga Institute Pune Map"
            />
          </div>
          <p className="text-[11px] font-sans text-espresso/50 text-center">
            Located in beautiful Viman Nagar near Clover Park.
          </p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-biscuit/30 text-center text-xs text-espresso/50 font-sans flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>
          © {currentYear} Ishwari Yoga Institute. All traditional and intellectual rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Made with reverence for Yoga Shastra & Indian Heritage <Heart size={10} className="text-lotus-pink fill-lotus-pink" />
        </p>
      </div>

    </footer>
  );
};
