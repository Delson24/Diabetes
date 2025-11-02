import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Target, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { DailyTask } from '../../types';

export const DailyChecklist: React.FC = () => {
  const { state, updateDailyTask } = useApp();
  const [todaysTasks, setTodaysTasks] = useState<DailyTask[]>([]);
  
  const today = new Date().toISOString().split('T')[0];

  const defaultTasks = [
    { name: 'Mediu a glicemia', id: 'glucose' },
    { name: 'Fez atividade física', id: 'exercise' },
    { name: 'Seguiu o plano alimentar', id: 'meal-plan' },
    { name: 'Tomou medicação', id: 'medication' },
    { name: 'Dormiu bem / descansou', id: 'sleep' },
  ];

  useEffect(() => {
    const existingTasks = state.dailyTasks.filter(task => task.date === today);
    
    if (existingTasks.length === 0) {
      // Create today's tasks if they don't exist
      const newTasks = defaultTasks.map(task => ({
        id: `${task.id}-${today}`,
        name: task.name,
        completed: false,
        date: today,
      }));
      setTodaysTasks(newTasks);
    } else {
      setTodaysTasks(existingTasks);
    }
  }, [state.dailyTasks, today]);

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    updateDailyTask(taskId, completed);
    setTodaysTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  const completedTasks = todaysTasks.filter(task => task.completed).length;
  const totalTasks = todaysTasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getProgressLevel = () => {
    if (progressPercentage >= 80) return { level: 'Excelente', color: 'text-green-600', bg: 'bg-green-50' };
    if (progressPercentage >= 60) return { level: 'Bom', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (progressPercentage >= 40) return { level: 'Regular', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Precisa melhorar', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const progress = getProgressLevel();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Checklist Diário</h2>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${progress.color} ${progress.bg} border`}>
          {progress.level}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progresso do dia</span>
          <span className="text-sm font-bold text-gray-800">
            {completedTasks}/{totalTasks} ({Math.round(progressPercentage)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-700 shadow-sm ${
              progressPercentage >= 80 ? 'bg-green-500' :
              progressPercentage >= 60 ? 'bg-blue-500' :
              progressPercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {todaysTasks.map((task) => (
          <div 
            key={task.id}
            className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] ${
              task.completed 
                ? 'border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
            }`}
            onClick={() => handleTaskToggle(task.id, !task.completed)}
          >
            {task.completed ? (
              <div className="relative">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
            ) : (
              <Circle className="w-6 h-6 text-gray-400 flex-shrink-0 hover:text-blue-500 transition-colors" />
            )}
            <span className={`font-medium ${
              task.completed ? 'text-green-800 line-through' : 'text-gray-800 hover:text-blue-700'
            }`}>
              {task.name}
            </span>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      {progressPercentage > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="font-medium text-blue-800 text-sm">
              {progressPercentage >= 80 
                ? '🎉 Parabéns! Você está indo muito bem hoje!' 
                : progressPercentage >= 60
                ? '👍 Bom trabalho! Continue assim!'
                : '💪 Você consegue! Vamos completar mais tarefas!'}
            </span>
          </div>
        </div>
      )}

      {/* Weekly Goal */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-5 h-5 text-purple-600 animate-bounce" />
          <span className="font-medium text-purple-800">Meta da Semana</span>
        </div>
        <p className="text-sm text-purple-700">
          Complete pelo menos 80% das tarefas diárias por 5 dias consecutivos
        </p>
      </div>
    </div>
  );
};