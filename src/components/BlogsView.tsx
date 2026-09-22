import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { Search, Clock, Calendar, ArrowRight } from 'lucide-react';
import { PeepalLeaf } from './BotanicalAssets';

interface BlogsViewProps {
  onNavigateDetail: (view: [string, string]) => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({ onNavigateDetail }) => {
  const { blogs } = useYoga();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Yoga Philosophy',
    'Science of Yoga',
    'Meditation',
    'Ayurveda',
    'Research',
    'Lifestyle',
    'Pregnancy Yoga',
    'Teacher Education'
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="blogs-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="absolute top-24 right-4 pointer-events-none opacity-5 select-none">
        <PeepalLeaf size={160} />
      </div>

      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto pt-16 pb-12 text-center space-y-6">
        <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">Svadhyaya — Sacred Shastra Studies</span>
        <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-espresso tracking-tight">
          Yogic Wisdom Blog
        </h1>
        <p className="font-sans text-sm text-espresso/70 max-w-2xl mx-auto">
          Deep academic articles exploring yogic neurophysiology, classical Sanskrit textbook interpretations, Ayurvedic lifestyles, and prenatal guidelines.
        </p>
        <div className="w-16 h-0.5 bg-biscuit mx-auto" />
      </section>

      {/* Search & Categories */}
      <section className="max-w-7xl mx-auto mb-16 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-primary-white border border-biscuit/20 p-4 rounded-xl shadow-sm">
          
          {/* Horizontal scroll Categories */}
          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[10px] tracking-wider uppercase transition-all duration-300 rounded-full border cursor-pointer focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-olive-green text-primary-white border-olive-green font-semibold'
                    : 'border-biscuit/25 text-espresso/75 hover:border-espresso hover:text-espresso'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search wisdom articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-primary-white border border-biscuit/30 rounded-full text-xs text-espresso focus:outline-none focus:border-olive-green"
            />
            <Search className="absolute left-3.5 top-3 text-espresso/40" size={14} />
          </div>

        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-6xl mx-auto">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigateDetail(['blog-detail', blog.id])}
                className="artistic-card rounded-xl overflow-hidden cursor-pointer flex flex-col h-full group"
              >
                {/* Blog Image */}
                <div className="aspect-[16/9] bg-warm-beige/10 overflow-hidden relative border-b border-biscuit/10">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98] transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4 bg-primary-white/95 px-3 py-1 rounded-full border border-biscuit/30 shadow-sm">
                    <span className="text-[9px] font-sans font-semibold tracking-wider text-espresso uppercase">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog content description */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 font-sans text-[10px] text-espresso/50">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {blog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {blog.readTime}
                      </span>
                    </div>

                    <h2 className="font-cinzel text-base md:text-lg font-bold text-espresso group-hover:text-olive-green transition-colors leading-snug">
                      {blog.title}
                    </h2>
                    
                    <p className="font-sans text-xs text-espresso/70 leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-biscuit/10 flex items-center justify-between">
                    <span className="font-sans text-[11px] text-espresso/50">By <strong>{blog.author}</strong></span>
                    <span className="font-sans text-xs tracking-wider uppercase font-semibold text-olive-green group-hover:text-espresso transition-colors inline-flex items-center gap-1">
                      <span>Read Study</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-primary-white border border-dashed border-biscuit/30 rounded-xl max-w-sm mx-auto">
            <p className="font-serif italic text-espresso/60 text-sm">
              "No shastra logs found matching your query."
            </p>
          </div>
        )}
      </section>

    </div>
  );
};
