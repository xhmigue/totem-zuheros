
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import NavigationGrid from './components/NavigationGrid';
import DetailView from './components/DetailView';
import { NavigationNode, NavigationState } from './types';
import { ZUHEROS_DATA } from './navigationData';

const App: React.FC = () => {
  const [navState, setNavState] = useState<NavigationState>({
    currentNode: ZUHEROS_DATA,
    history: []
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNodeSelect = (node: NavigationNode) => {
    setNavState(prev => ({
      currentNode: node,
      history: [...prev.history, prev.currentNode]
    }));
  };

  const handleGoBack = () => {
    if (navState.history.length === 0) return;
    
    const newHistory = [...navState.history];
    const previousNode = newHistory.pop()!;
    
    setNavState({
      currentNode: previousNode,
      history: newHistory
    });
  };

  const handleGoHome = () => {
    setNavState({
      currentNode: ZUHEROS_DATA,
      history: []
    });
  };

  const isHome = navState.history.length === 0;

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8fafc] overflow-hidden font-sans">
      <Header date={currentTime} />

      <SubHeader 
        onBack={handleGoBack} 
        onHome={handleGoHome} 
        isHome={isHome}
        title={navState.currentNode.titulo}
      />

      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        {navState.currentNode.tipo === 'submenu' ? (
          <NavigationGrid 
            options={navState.currentNode.opciones || []} 
            onSelect={handleNodeSelect} 
          />
        ) : (
          <DetailView 
            node={navState.currentNode} 
            onBack={handleGoBack} 
          />
        )}
      </main>

      <footer className="h-6 bg-[#1c6c3e] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]" />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1c6c3e;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default App;
