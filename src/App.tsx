import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SmoothScrollProvider } from './components/animations/SmoothScroll';
import { CustomCursor } from './components/animations/CustomCursor';
import { EditorialGridBackdrop } from './components/layout/GridSystem';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <div className="relative min-h-screen bg-[#F2F1E9] text-[#252522]">
          <EditorialGridBackdrop />
          <CustomCursor />
          <Navigation />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
