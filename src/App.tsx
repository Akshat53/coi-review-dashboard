import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { COIProvider } from './context/COIContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardPage from './pages/DashboardPage';
import { useCOI } from './context/COIContext';
import COIForm from './components/COI/COIForm';

const AppContent: React.FC = () => {
  const [showNewCOI, setShowNewCOI] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const { selectedCOIs, sendReminders, addCOI } = useCOI();

  const handleBulkReminder = () => {
    if (selectedCOIs.length > 0) {
      sendReminders(selectedCOIs);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar
        onNewCOI={() => setShowNewCOI(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSendBulkReminder={handleBulkReminder}
          selectedCount={selectedCOIs.length}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/contract-vault" element={<div className="p-6">Contract Vault (Coming Soon)</div>} />
          <Route path="/analysis" element={<div className="p-6">Analysis Results (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
        </Routes>
      </div>

      <COIForm
        isOpen={showNewCOI}
        onClose={() => setShowNewCOI(false)}
        onSubmit={(data) => {
          addCOI(data as any);
          setShowNewCOI(false);
        }}
        initialData={null}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <COIProvider>
        <Router>
          <AppContent />
        </Router>
      </COIProvider>
    </ThemeProvider>
  );
}

export default App;
