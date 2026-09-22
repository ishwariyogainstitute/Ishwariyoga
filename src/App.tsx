import React, { useState } from 'react';
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
import { StudentPortalView } from './components/StudentPortalView';
import { useYoga } from './context/YogaContext';
import { StudentAuthModal } from './components/StudentAuthModal';
import { StudentPaymentModal } from './components/StudentPaymentModal';

// App content wrapper that implements the state router
const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [detailView, setDetailView] = useState<[string, string] | null>(null);

  const {
    currentStudent,
    programs,
    isAuthModalOpen,
    authModalMode,
    authModalProgramId,
    activeEnrollmentProgram,
    closeAuthModal,
    startCourseRegistration,
    closeEnrollmentModal
  } = useYoga();

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
      case 'student-portal':
      case 'student-login':
        return <StudentPortalView onNavigateDetail={handleNavigateDetail} />;
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

      {/* Global Student & Member Auth Modal */}
      {isAuthModalOpen && (
        <StudentAuthModal
          initialMode={authModalMode}
          initialProgramId={authModalProgramId || undefined}
          onClose={closeAuthModal}
          onSuccess={(chosenProgramId) => {
            closeAuthModal();
            const progId = chosenProgramId || authModalProgramId;
            if (progId) {
              const p = programs.find(item => item.id === progId);
              if (p) {
                startCourseRegistration(p);
                return;
              }
            }
            handleSetCurrentPage('student-portal');
          }}
        />
      )}

      {/* Global Course Registration, Intake Form & Payment Modal */}
      {activeEnrollmentProgram && currentStudent && (
        <StudentPaymentModal
          program={activeEnrollmentProgram}
          student={currentStudent}
          onClose={closeEnrollmentModal}
          onSuccess={() => {
            closeEnrollmentModal();
            handleSetCurrentPage('student-portal');
          }}
        />
      )}
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

