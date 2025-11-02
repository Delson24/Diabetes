import React from 'react';
import { DailyChecklist } from './DailyChecklist';
import { Activity, BookOpen, Utensils, Clock, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const DashboardHome: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleQuickAction = (action: string) => {
    // This would typically update the active tab in the parent Dashboard component
    // For now, we'll just show an alert or could dispatch an action
    console.log(`Navigating to ${action}`);
    // You could dispatch an action here to change the active tab
  };

  const quickStats = [
    {
      title: 'Leituras Hoje',
      value: state.glucoseReadings.filter(reading => 
        new Date(reading.timestamp).toDateString() === new Date().toDateString()
      ).length,
      icon: Activity,
      color: 'bg-blue-500',
    },
    {
      title: 'Tarefas Concluídas',
      value: `${state.dailyTasks.filter(task => 
        task.date === new Date().toISOString().split('T')[0] && task.completed
      ).length}/5`,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Lembretes Ativos',
      value: state.reminders.filter(reminder => reminder.enabled).length,
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      title: 'Dias de Controle',
      value: Math.floor((Date.now() - new Date(state.user?.createdAt || 0).getTime()) / (1000 * 60 * 60 * 24)),
      icon: Heart,
      color: 'bg-red-500',
    },
  ];

  const quickActions = [
    {
      title: 'Registrar Glicemia',
      description: 'Adicione uma nova leitura',
      icon: Activity,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      action: 'glucose',
    },
    {
      title: 'Ver Ebook',
      description: 'Continue lendo o guia',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600 border-green-200',
      action: 'ebook',
    },
    {
      title: 'Plano Alimentar',
      description: 'Veja suas refeições',
      icon: Utensils,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      action: 'meals',
    },
    {
      title: 'Configurar Lembretes',
      description: 'Defina seus horários',
      icon: Clock,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      action: 'reminders',
    },
  ];

  const getMotivationalMessage = () => {
    const hour = new Date().getHours();
    const firstName = state.user?.name?.split(' ')[0] || 'Usuário';
    
    if (hour < 12) {
      return `Bom dia, ${firstName}! Como está sua glicemia hoje?`;
    } else if (hour < 18) {
      return `Boa tarde, ${firstName}! Lembre-se de manter seus registros em dia.`;
    } else {
      return `Boa noite, ${firstName}! Como foi seu controle hoje?`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2">{getMotivationalMessage()}</h1>
        <p className="opacity-90">
          Mantenha o foco no seu objetivo e continue cuidando da sua saúde com carinho.
        </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl shadow-md ${stat.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Checklist - Takes 2 columns */}
        <div className="lg:col-span-2">
          <DailyChecklist />
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105 group ${action.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm opacity-75">{action.description}</div>
                      </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's Tip */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">💡 Dica do Dia</h3>
            <p className="text-sm text-yellow-700">
              Beba bastante água ao longo do dia. A hidratação adequada ajuda no controle da glicemia 
              e no bem-estar geral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};