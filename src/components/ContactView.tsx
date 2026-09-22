import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { Mail, Phone, MapPin, MessageCircle, Youtube, Instagram, Facebook, CalendarCheck } from 'lucide-react';
import { PeepalLeaf, LotusFlower } from './BotanicalAssets';

export const ContactView: React.FC = () => {
  const { programs, addInquiry } = useYoga();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedProgram, setInterestedProgram] = useState(programs[0]?.name || 'General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert('Please fill out Name, Phone, and Email to submit your inquiry.');
      return;
    }

    addInquiry({
      name,
      phone,
      email,
      programInterestedIn: interestedProgram,
      message: message || 'Submitted general contact form inquiry.'
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div id="contact-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="absolute top-24 left-4 pointer-events-none opacity-5 select-none">
        <PeepalLeaf size={160} />
      </div>

      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto pt-16 pb-12 text-center space-y-6">
        <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">Sarthak Sanvad — Connect With Us</span>
        <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-espresso tracking-tight">
          Contact & Inquiries
        </h1>
        <p className="font-sans text-sm text-espresso/70 max-w-2xl mx-auto">
          Reach out to schedule your physical alignment diagnosis, ask about YCB curriculums, or coordinate custom therapy requirements directly with our founders.
        </p>
        <div className="w-16 h-0.5 bg-biscuit mx-auto" />
      </section>

      {/* Main Grid: Form & Info */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Info Card */}
        <div className="lg:col-span-5 space-y-8 bg-primary-white border border-biscuit/30 p-8 rounded-2xl shadow-sm">
          
          <div className="space-y-4">
            <div className="flex gap-2 items-center text-olive-green">
              <LotusFlower size={28} />
              <h2 className="font-cinzel text-xl font-bold text-espresso uppercase tracking-wider">The Gurukul Campus</h2>
            </div>
            <p className="font-sans text-xs text-espresso/75 leading-relaxed">
              We look forward to welcoming you to our quiet, sun-dappled space in Erandwane. Visiting hours are by appointment only to preserve the silence of practicing classes.
            </p>
          </div>

          <ul className="space-y-6 font-sans text-xs text-espresso/80">
            <li className="flex items-start gap-3.5">
              <MapPin size={20} className="text-olive-green shrink-0 mt-0.5" />
              <span>
                <strong>Physical Address:</strong><br />
                Ishwari Yoga Institute, R/H 3, Siddhant Classic, A Wing, Clover Park, Behind Baker Gauges, Robertshaw Company Road, Viman Nagar, Pune – 411014, Maharashtra, India
              </span>
            </li>
            <li className="flex items-start gap-3.5">
              <Phone size={18} className="text-olive-green shrink-0 mt-0.5" />
              <span>
                <strong>Admissions & Diagnostics:</strong><br />
                +91 8208368237 / +91 9607517375
              </span>
            </li>
            <li className="flex items-start gap-3.5">
              <Mail size={18} className="text-olive-green shrink-0 mt-0.5" />
              <span>
                <strong>Electronic Inquiries:</strong><br />
                <a href="mailto:Devikabhide8@gmail.com" className="hover:text-olive-green transition-colors text-olive-green font-semibold">
                  Devikabhide8@gmail.com
                </a>
              </span>
            </li>
          </ul>

          {/* Social connections */}
          <div className="pt-6 border-t border-biscuit/20 space-y-3">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-biscuit font-bold">Social Sadhana Circles</span>
            <div className="flex gap-3">
              <a
                href="https://youtube.com/@ishwariyoga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 border border-biscuit/30 rounded text-center font-mono text-[9px] uppercase tracking-wider text-espresso hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <Youtube size={12} />
                <span>YouTube</span>
              </a>
              <a
                href="https://instagram.com/ishwariyoga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 border border-biscuit/30 rounded text-center font-mono text-[9px] uppercase tracking-wider text-espresso hover:border-pink-500 hover:text-pink-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <Instagram size={12} />
                <span>Instagram</span>
              </a>
              <a
                href="https://wa.me/918208368237"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 border border-biscuit/30 rounded text-center font-mono text-[9px] uppercase tracking-wider text-espresso hover:border-green-500 hover:text-green-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={12} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 bg-primary-white border border-biscuit/35 p-8 rounded-2xl shadow-sm space-y-6">
          
          <div className="space-y-1">
            <h2 className="font-cinzel text-xl font-bold text-espresso uppercase tracking-wider">Submit An Inquiry</h2>
            <p className="font-sans text-xs text-espresso/60">Fill in the fields below, and our lead faculty (Devika or Shweta) will formulate a therapeutic response.</p>
          </div>

          {submitted ? (
            <div className="p-8 border border-olive-green bg-warm-beige/15 rounded-xl text-center space-y-4 animate-fadeIn">
              <CalendarCheck size={40} className="text-olive-green mx-auto" />
              <h3 className="font-cinzel text-base font-bold text-espresso">Inquiry Registered</h3>
              <p className="font-sans text-xs text-espresso/80 leading-relaxed">
                Thank you for your sincere outreach. We have successfully registered your inquiry in our local gurukul ledger. The founders will evaluate your request and contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-espresso text-primary-white font-sans text-[10px] tracking-widest uppercase font-semibold hover:bg-olive-green transition-colors rounded"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs text-espresso">
              
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-espresso/70 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-espresso/70 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green"
                    placeholder="e.g. +91 98220 00000"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-espresso/70 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green"
                    placeholder="e.g. seeker@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-espresso/70 mb-1">Program of Interest *</label>
                <select
                  value={interestedProgram}
                  onChange={(e) => setInterestedProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiries / Consultation</option>
                  {programs.map(prog => (
                    <option key={prog.id} value={prog.name}>{prog.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-espresso/70 mb-1">Detailed Message / Sadhana Background</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-biscuit/30 rounded bg-primary-white focus:outline-none focus:border-olive-green resize-none"
                  placeholder="Ask a question or explain your requirements (e.g. severe lumbar spondylosis, yoga teacher training, or Maheshwar retreat queries)..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-espresso hover:bg-olive-green text-primary-white font-sans text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 rounded transition-all cursor-pointer shadow-sm"
              >
                <span>Submit Inquiry</span>
              </button>

            </form>
          )}

        </div>

      </section>

      {/* Embedded Maps Section */}
      <section className="max-w-6xl mx-auto mt-16 rounded-2xl overflow-hidden border border-biscuit/40 h-[350px] shadow-sm bg-primary-white">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3387766579365!2d73.91264857601723!3d18.560940568019313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b4e85749%3A0x26c043f11dae6051!2sViman%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1721510000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.4) sepia(0.12) contrast(0.95)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Campus Map Pune"
        />
      </section>

    </div>
  );
};
