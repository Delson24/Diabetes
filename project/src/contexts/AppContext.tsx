import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, GlucoseReading, DailyTask, Reminder, DailySummary } from '../types';

interface AppState {
  user: User | null;
  currentStep: 'quiz' | 'payment' | 'dashboard';
  glucoseReadings: GlucoseReading[];
  dailyTasks: DailyTask[];
  reminders: Reminder[];
  dailySummaries: DailySummary[];
  showPayment: boolean;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
  isAdminUser: (email: string) => boolean;
  addGlucoseReading: (reading: Omit<GlucoseReading, 'id'>) => void;
  updateDailyTask: (taskId: string, completed: boolean) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  generateDailySummary: (date: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  user: null,
  currentStep: 'quiz',
  glucoseReadings: [],
  dailyTasks: [],
  reminders: [],
  dailySummaries: [],
  showPayment: false,
};

function appReducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'ADD_GLUCOSE_READING':
      return { ...state, glucoseReadings: [...state.glucoseReadings, action.payload] };
    case 'UPDATE_DAILY_TASK':
      return {
        ...state,
        dailyTasks: state.dailyTasks.map(task =>
          task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task
        ),
      };
    case 'ADD_REMINDER':
      return { ...state, reminders: [...state.reminders, action.payload] };
    case 'SET_SHOW_PAYMENT':
      return { ...state, showPayment: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('diabetesAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading state:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diabetesAppState', JSON.stringify(state));
  }, [state]);

  const isAdminUser = (email: string) => email === 'lirioj771@gmail.com';

  const addGlucoseReading = (reading: Omit<GlucoseReading, 'id'>) => {
    const newReading = { ...reading, id: Date.now().toString() };
    dispatch({ type: 'ADD_GLUCOSE_READING', payload: newReading });
  };

  const updateDailyTask = (taskId: string, completed: boolean) => {
    dispatch({ type: 'UPDATE_DAILY_TASK', payload: { id: taskId, completed } });
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = { ...reminder, id: Date.now().toString() };
    dispatch({ type: 'ADD_REMINDER', payload: newReminder });
  };

  const generateDailySummary = (date: string) => {
    const todaysReadings = state.glucoseReadings.filter(
      reading => reading.timestamp.toDateString() === new Date(date).toDateString()
    );
    const todaysTasks = state.dailyTasks.filter(task => task.date === date);
    
    const averageGlucose = todaysReadings.length > 0 
      ? todaysReadings.reduce((sum, reading) => sum + reading.value, 0) / todaysReadings.length
      : 0;
    
    const completedTasks = todaysTasks.filter(task => task.completed).length;
    const totalTasks = todaysTasks.length;
    
    let feedback = '';
    let progressLevel: 'good' | 'moderate' | 'needs-attention' = 'good';
    
    if (averageGlucose > 0 && averageGlucose < 140) {
      feedback = 'Muito bem! Sua glicemia está bem controlada hoje.';
      progressLevel = 'good';
    } else if (averageGlucose >= 140 && averageGlucose < 180) {
      feedback = 'Atenção: sua glicemia apresentou algumas elevações. Revise sua alimentação.';
      progressLevel = 'moderate';
    } else if (averageGlucose >= 180) {
      feedback = 'Importante: glicemia elevada detectada. Consulte seu médico se persistir.';
      progressLevel = 'needs-attention';
    }
    
    // This would typically be saved to state, but for simplicity we'll just log it
    console.log({ date, averageGlucose, tasksCompleted: completedTasks, totalTasks, feedback, progressLevel });
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      isAdminUser,
      addGlucoseReading,
      updateDailyTask,
      addReminder,
      generateDailySummary,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};