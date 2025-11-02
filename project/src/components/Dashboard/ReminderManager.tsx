import React, { useState } from 'react';
import { Clock, Plus, Bell, Edit, Trash2, ToggleLeft, ToggleRight, Save, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Reminder } from '../../types';

export const ReminderManager: React.FC = () => {
  const { state, addReminder } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    type: 'glucose' as Reminder['type'],
    time: '',
    message: '',
    enabled: true,
  });

  const reminderTypes = [
    { value: 'glucose', label: 'Medir Glicemia', icon: '🩸', color: 'bg-red-50 text-red-600' },
    { value: 'medication', label: 'Tomar Medicação', icon: '💊', color: 'bg-blue-50 text-blue-600' },
    { value: 'meal', label: 'Refeição', icon: '🍽️', color: 'bg-green-50 text-green-600' },
    { value: 'exercise', label: 'Exercício', icon: '🏃', color: 'bg-purple-50 text-purple-600' },
  ];

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.time) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
    addReminder({
      title: newReminder.title,
      type: newReminder.type,
      time: newReminder.time,
      message: newReminder.message || `Lembrete: ${newReminder.title}`,
      enabled: newReminder.enabled,
    });

    setNewReminder({
      title: '',
      type: 'glucose',
      time: '',
      message: '',
      enabled: true,
    });
    setShowAddForm(false);
      setIsSubmitting(false);
    }, 500);
  };

  const getTypeInfo = (type: string) => {
    return reminderTypes.find(t => t.value === type) || reminderTypes[0];
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Lembretes</h1>
              <p className="text-gray-600">Mantenha sua rotina em dia</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Lembrete</span>
          </button>
        </div>
      </div>

      {/* Quick Setup */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuração Rápida</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reminderTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => {
                setNewReminder(prev => ({ ...prev, type: type.value as any, title: type.label }));
                setShowAddForm(true);
              }}
              className={`p-6 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 transition-all duration-200 text-center transform hover:scale-105 hover:shadow-md ${type.color}`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="font-medium text-sm">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Novo Lembrete</h2>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Lembrete
              </label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: Medir glicemia matinal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={newReminder.type}
                onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                {reminderTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horário
              </label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem Personalizada (opcional)
              </label>
              <input
                type="text"
                value={newReminder.message}
                onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Mensagem que aparecerá na notificação"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddReminder}
              disabled={!newReminder.title || !newReminder.time || isSubmitting}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Criar Lembrete</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Meus Lembretes</h2>

        {state.reminders.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">Nenhum lembrete configurado ainda</p>
            <p className="text-sm text-gray-400">Clique em "Novo Lembrete" para começar a organizar sua rotina.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {state.reminders
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((reminder) => {
                const typeInfo = getTypeInfo(reminder.type);
                return (
                  <div
                    key={reminder.id}
                    className={`p-4 border rounded-xl transition-all duration-200 hover:shadow-md ${
                      reminder.enabled 
                        ? 'border-purple-200 bg-white/70 hover:bg-white' 
                        : 'border-gray-200 bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl shadow-sm ${typeInfo.color}`}>
                          <span className="text-lg">{typeInfo.icon}</span>
                        </div>
                        <div>
                          <h3 className={`font-medium ${reminder.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
                            {reminder.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{formatTime(reminder.time)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${typeInfo.color}`}>
                              {typeInfo.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          {reminder.enabled ? (
                            <ToggleRight className="w-7 h-7 text-green-600" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl shadow-lg p-6 border border-purple-200">
        <h3 className="font-semibold text-purple-800 mb-4 flex items-center">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
            <Bell className="w-4 h-4 text-white" />
          </div>
          💡 Dicas para Lembretes Eficazes
        </h3>
        <ul className="space-y-3 text-sm text-purple-700">
          <li>• Configure lembretes em horários regulares para criar uma rotina</li>
          <li>• Use mensagens motivacionais para manter a motivação</li>
          <li>• Ajuste os horários conforme sua agenda diária</li>
          <li>• Ative as notificações do navegador para não perder nenhum lembrete</li>
        </ul>
      </div>
    </div>
  );
};