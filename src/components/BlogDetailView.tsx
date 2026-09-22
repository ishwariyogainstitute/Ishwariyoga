import React from 'react';
import { useYoga } from '../context/YogaContext';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { PeepalLeaf } from './BotanicalAssets';

interface BlogDetailViewProps {
  blogId: string;
  onBack: () => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({ blogId, onBack }) => {
  const { blogs } = useYoga();
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="font-cinzel text-xl text-espresso">Article not found.</h2>
        <button onClick={onBack} className="mt-4 text-xs font-mono text-olive-green hover:text-espresso uppercase">
          Back to Blogs
        </button>
      </div>
    );
  }

  // Simple clean parser to render basic markdown structures in high-fidelity layout
  const renderParsedContent = (text: string) => {
    const lines = text.split('\n');
    let inQuote = false;

    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) return <div key={idx} className="h-4" />;

      // Header h3
      if (trimmed.startsWith('###')) {
        return (
          <h3 key={idx} className="font-cinzel text-xl font-bold text-espresso pt-6 pb-2 leading-tight">
            {trimmed.replace('###', '').trim()}
          </h3>
        );
      }

      // Header h4
      if (trimmed.startsWith('####')) {
        return (
          <h4 key={idx} className="font-serif text-lg italic text-olive-green pt-4 pb-2 leading-snug">
            {trimmed.replace('####', '').trim()}
          </h4>
        );
      }

      // Blockquote
      if (trimmed.startsWith('>')) {
        return (
          <blockquote key={idx} className="pl-6 border-l-2 border-biscuit py-2 my-4 font-serif italic text-espresso/90 bg-warm-beige/25 rounded-r pr-4 leading-relaxed text-sm">
            {trimmed.replace('>', '').replace(/"/g, '').trim()}
          </blockquote>
        );
      }

      // Ordered list items / numbered items
      if (/^\d+\./.test(trimmed)) {
        return (
          <div key={idx} className="pl-6 py-1 font-sans text-xs text-espresso/80 leading-relaxed list-decimal flex gap-2">
            <span className="font-bold text-olive-green">{trimmed.match(/^\d+\./)?.[0]}</span>
            <span>{trimmed.replace(/^\d+\./, '').trim()}</span>
          </div>
        );
      }

      // Unordered list items
      if (trimmed.startsWith('-')) {
        return (
          <div key={idx} className="pl-6 py-1 font-sans text-xs text-espresso/80 leading-relaxed list-disc flex gap-2">
            <span className="text-olive-green">•</span>
            <span>{trimmed.replace(/^-/, '').trim()}</span>
          </div>
        );
      }

      // Normal paragraph
      return (
        <p key={idx} className="font-sans text-sm text-espresso/80 leading-relaxed pb-3 whitespace-pre-line">
          {trimmed}
        </p>
      );
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.summary,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div id="blog-detail-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="absolute top-24 right-4 pointer-events-none opacity-5 select-none">
        <PeepalLeaf size={160} />
      </div>

      {/* Back Button */}
      <div className="max-w-3xl mx-auto pt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-xs tracking-wider uppercase font-semibold text-espresso/60 hover:text-espresso transition-colors group cursor-pointer focus:outline-none"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Blogs</span>
        </button>
      </div>

      {/* Main Article Container */}
      <article className="max-w-3xl mx-auto pt-10 space-y-8">
        
        {/* Category & Title */}
        <div className="space-y-4 text-center md:text-left">
          <span className="font-mono text-[10px] bg-warm-beige/60 text-espresso px-3 py-1 border border-biscuit/20 rounded-full font-semibold uppercase tracking-widest inline-block">
            {blog.category}
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-semibold text-espresso leading-snug">
            {blog.title}
          </h1>
          
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-sans text-espresso/60 pt-2 border-b border-biscuit/25 pb-4">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-olive-green" />
              <span>By <strong>{blog.author}</strong></span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-olive-green" />
              <span>{blog.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-olive-green" />
              <span>{blog.readTime}</span>
            </div>
            <div className="md:ml-auto">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-[11px] text-olive-green hover:text-espresso transition-colors font-semibold uppercase tracking-wider focus:outline-none cursor-pointer"
              >
                <Share2 size={12} />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </div>

        {/* Big Editorial Header Image */}
        <div className="aspect-[21/9] rounded-xl overflow-hidden border border-biscuit/30 bg-warm-beige/10 shadow-xs">
          <img
            src={blog.image}
            alt={blog.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98]"
          />
        </div>

        {/* Lead Summary Callout */}
        <div className="p-6 border-y border-biscuit/30 font-serif text-base italic text-espresso/85 leading-relaxed bg-[#F3EBDD]/20 rounded text-center">
          "{blog.summary}"
        </div>

        {/* Main Body Content rendered cleanly */}
        <div className="prose max-w-none pt-4 text-espresso leading-relaxed">
          {renderParsedContent(blog.content)}
        </div>

      </article>

    </div>
  );
};
