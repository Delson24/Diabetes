import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Activity, Save, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const GlucoseTracker: React.FC = () => {
  const { state, addGlucoseReading } = useApp();
  const [newReading, setNewReading] = useState({
    value: '',
    unit: 'mg/dL' as 'mg/dL' | 'mmol/L',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddReading = () => {
    if (!newReading.value) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
    addGlucoseReading({
      value: parseFloat(newReading.value),
      unit: newReading.unit,
      notes: newReading.notes,
      timestamp: new Date(),
    });

    setNewReading({ value: '', unit: 'mg/dL', notes: '' });
      setIsSubmitting(false);
    }, 500);
  };

  const getGlucoseStatus = (value: number, unit: string) => {
    const mgDlValue = unit === 'mmol/L' ? value * 18 : value;
    
    if (mgDlValue < 70) return { status: 'low', color: 'text-red-600', icon: TrendingDown };
    if (mgDlValue <= 140) return { status: 'normal', color: 'text-green-600', icon: Activity };
    if (mgDlValue <= 200) return { status: 'high', color: 'text-yellow-600', icon: TrendingUp };
    return { status: 'very-high', color: 'text-red-600', icon: TrendingUp };
  };

  const recentReadings = state.glucoseReadings
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const avgGlucose = state.glucoseReadings.length > 0
    ? state.glucoseReadings.reduce((sum, reading) => sum + reading.value, 0) / state.glucoseReadings.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-blue-50 space-y-6">
      {/* Add New Reading */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-red-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-md">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Registrar Glicemia</h2>
            <p className="text-sm text-gray-600">Mantenha o controle da sua saúde</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor da Glicemia *
            </label>
            <input
              type="number"
              value={newReading.value}
              onChange={(e) => setNewReading(prev => ({ ...prev, value: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: 120"
              min="0"
              max="600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidade
            </label>
            <select
              value={newReading.unit}
              onChange={(e) => setNewReading(prev => ({ ...prev, unit: e.target.value as any }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            >
              <option value="mg/dL">mg/dL</option>
              <option value="mmol/L">mmol/L</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações (opcional)
            </label>
            <input
              type="text"
              value={newReading.notes}
              onChange={(e) => setNewReading(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: Após almoço"
            />
          </div>
        </div>
        
        <button
          onClick={handleAddReading}
          disabled={!newReading.value || isSubmitting}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Registrar</span>
            </>
          )}
        </button>
        
        {/* Quick tips */}
        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">💡 Dicas para medição:</p>
              <ul className="text-xs space-y-1">
                <li>• Lave bem as mãos antes de medir</li>
                <li>• Use as laterais dos dedos</li>
                <li>• Anote o horário e contexto (jejum, pós-refeição)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <h3 className="text-sm font-medium opacity-90 mb-2">Última Leitura</h3>
          <div className="text-2xl font-bold">
            {recentReadings.length > 0 
              ? `${recentReadings[0].value} ${recentReadings[0].unit}`
              : 'Sem registros'
            }
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <h3 className="text-sm font-medium opacity-90 mb-2">Média Geral</h3>
          <div className="text-2xl font-bold">
            {avgGlucose > 0 ? `${avgGlucose.toFixed(0)} mg/dL` : 'Sem dados'}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <h3 className="text-sm font-medium opacity-90 mb-2">Total de Registros</h3>
          <div className="text-2xl font-bold">{state.glucoseReadings.length}</div>
        </div>
      </div>

      {/* Recent Readings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-red-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Registros Recentes</h2>
        
        {recentReadings.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Nenhum registro encontrado</p>
            <p className="text-gray-400 text-sm">Adicione sua primeira leitura para começar o acompanhamento!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentReadings.map((reading) => {
              const status = getGlucoseStatus(reading.value, reading.unit);
              const StatusIcon = status.icon;
              
              return (
                <div key={reading.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white/50">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-sm ${
                      status.status === 'normal' ? 'bg-green-100' :
                      status.status === 'low' ? 'bg-red-100' :
                      status.status === 'high' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <StatusIcon className={`w-5 h-5 ${status.color}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {reading.value} {reading.unit}
                      </div>
                      {reading.notes && (
                        <div className="text-sm text-gray-600">{reading.notes}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reading.timestamp).toLocaleDateString()} às{' '}
                    {new Date(reading.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};