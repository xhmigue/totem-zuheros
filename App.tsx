
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import MenuGrid from './components/MenuGrid';
import SectionDetail from './components/SectionDetail';
import { MenuSection } from './types';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<MenuSection | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSectionSelect = (section: MenuSection) => {
    setCurrentSection(section);
  };

  const handleGoBack = () => {
    setCurrentSection(null);
  };

  const handleGoHome = () => {
    setCurrentSection(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      {/* Logos and main header */}
      <Header date={currentTime} />

      {/* Navigation subheader */}
      <SubHeader 
        onBack={handleGoBack} 
        onHome={handleGoHome} 
        isHome={currentSection === null} 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
        {!currentSection ? (
          <MenuGrid onSelect={handleSectionSelect} />
        ) : (
          <SectionDetail section={currentSection} onBack={handleGoBack} />
        )}
      </main>

      {/* Footer / Decor (optional, image doesn't show one but good for totem usability) */}
      <footer className="h-4 bg-[#1c6c3e]" />
    </div>
  );
};

export default App;
