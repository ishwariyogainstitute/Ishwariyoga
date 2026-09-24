import React, { useState, useEffect } from 'react';
import { YogaProvider } from './context/YogaContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ProgramsView } from './components/ProgramsView';
import { ProgramDetailView } from './components/ProgramDetailView';
import { YcbView } from './components/YcbView';
import { CertifiedStudentsView } from './components/CertifiedStudentsView';
import { GalleryView } from './components/GalleryView';
import { BlogsView } from './components/BlogsView';
import { BlogDetailView } from './components/BlogDetailView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { useYoga } from './context/YogaContext';

// App content wrapper that implements the state router
const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [detailView, setDetailView] = useState<[string, string] | null>(null);

  // Student login, registration, results & certificates all live in the
  // standalone Firebase-backed portal now. If anything still navigates to
  // the old in-app student-portal page, send the visitor there instead.
  useEffect(() => {
    if (currentPage === 'student-portal' || currentPage === 'student-login') {
      window.location.href = '/portal/';
    }
  }, [currentPage]);

  const handleNavigateDetail = (view: [string, string]) => {
    setDetailView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetCurrentPage = (page: string) => {
    setCurrentPage(page);
    setDetailView(null);
  };

  // Render the appropriate main page or detail view
  const renderPage = () => {
    if (detailView) {
      const [viewType, id] = detailView;
      if (viewType === 'program-detail') {
        return (
          <ProgramDetailView 
            programId={id} 
            onBack={() => setDetailView(null)} 
          />
        );
      }
      if (viewType === 'blog-detail') {
        return (
          <BlogDetailView 
            blogId={id} 
            onBack={() => setDetailView(null)} 
          />
        );
      }
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomeView 
            setCurrentPage={handleSetCurrentPage} 
            onNavigateDetail={handleNavigateDetail} 
          />
        );
      case 'about':
        return (
          <HomeView 
            setCurrentPage={handleSetCurrentPage} 
            onNavigateDetail={handleNavigateDetail} 
            initialSection="about-section"
          />
        );
      case 'programs':
        return (
          <ProgramsView 
            onNavigateDetail={handleNavigateDetail} 
          />
        );
      case 'ycb':
        return <YcbView />;
      case 'certified-students':
        return <CertifiedStudentsView />;
      case 'gallery':
        return <GalleryView />;
      case 'blogs':
        return (
          <BlogsView 
            onNavigateDetail={handleNavigateDetail} 
          />
        );
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminView />;
      default:
        return (
          <HomeView 
            setCurrentPage={handleSetCurrentPage} 
            onNavigateDetail={handleNavigateDetail} 
          />
        );
    }
  };

  return (
    <div className="parchment-bg min-h-screen flex flex-col justify-between selection:bg-lotus-pink/50 selection:text-espresso relative">
      {/* Background radial gradient overlay decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-transparent to-[#FAFAF8]/90 pointer-events-none z-0" />
      
      {/* Editorial Content */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Header 
          currentPage={detailView ? detailView[0] : currentPage} 
          setCurrentPage={handleSetCurrentPage} 
          onNavigateDetail={handleNavigateDetail}
        />
        
        <main className="flex-grow">
          {renderPage()}
        </main>
        
        <Footer setCurrentPage={handleSetCurrentPage} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <YogaProvider>
      <AppContent />
    </YogaProvider>
  );
}

