import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Quiz } from './components/Quiz/Quiz';
import { PaymentForm } from './components/Payment/PaymentForm';
import { Dashboard } from './components/Dashboard/Dashboard';

const AppContent: React.FC = () => {
  const { state } = useApp();

  switch (state.currentStep) {
    case 'quiz':
      return <Quiz />;
    case 'payment':
      return <PaymentForm />;
    case 'dashboard':
      return <Dashboard />;
    default:
      return <Quiz />;
  }
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;