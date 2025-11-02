export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  diabetesType: 'type1' | 'type2' | 'gestational' | 'prediabetes';
  challenges: string[];
  medications: string[];
  experience: string;
  hasAccess: boolean;
  createdAt: Date;
}

export interface GlucoseReading {
  id: string;
  value: number;
  unit: 'mg/dL' | 'mmol/L';
  timestamp: Date;
  notes?: string;
}

export interface DailyTask {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}

export interface Reminder {
  id: string;
  title: string;
  type: 'glucose' | 'medication' | 'meal' | 'exercise';
  time: string;
  enabled: boolean;
  message: string;
}

export interface DailySummary {
  date: string;
  averageGlucose: number;
  tasksCompleted: number;
  totalTasks: number;
  feedback: string;
  progressLevel: 'good' | 'moderate' | 'needs-attention';
}