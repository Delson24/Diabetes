import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { DashboardHome } from './DashboardHome';
import { GlucoseTracker } from './GlucoseTracker';
import { EbookViewer } from './EbookViewer';
import { MealPlanner } from './MealPlanner';
import { ReminderManager } from './ReminderManager';
import { RecordsView } from './RecordsView';
import { ProfileView } from './ProfileView';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'glucose':
        return <GlucoseTracker />;
      case 'ebook':
        return <EbookViewer />;
      case 'meals':
        return <MealPlanner />;
      case 'reminders':
        return <ReminderManager />;
      case 'records':
        return <RecordsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};