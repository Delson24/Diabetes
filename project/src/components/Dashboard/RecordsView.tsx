import React, { useState } from 'react';
import { BarChart3, Calendar, TrendingUp, TrendingDown, Activity, Download, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const RecordsView: React.FC = () => {
  const { state } = useApp();
  const [timeRange, setTimeRange] = useState('week');
  const [viewType, setViewType] = useState('glucose');

  const timeRanges = [
    { value: 'week', label: 'Última Semana', days: 7 },
    { value: 'month', label: 'Último Mês', days: 30 },
    { value: 'quarter', label: 'Últimos 3 Meses', days: 90 },
    { value: 'year', label: 'Último Ano', days: 365 },
  ];

  const getFilteredData = () => {
    const now = new Date();
    let startDate = new Date();
    const selectedRange = timeRanges.find(r => r.value === timeRange);

    if (selectedRange) {
      startDate.setDate(now.getDate() - selectedRange.days);
    }

    return state.glucoseReadings.filter(reading => 
      new Date(reading.timestamp) >= startDate
    );
  };

  const filteredReadings = getFilteredData();

  const getGlucoseStats = () => {
    if (filteredReadings.length === 0) return null;

    const values = filteredReadings.map(r => r.value);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    const inRange = values.filter(v => v >= 70 && v <= 140).length;
    const percentageInRange = (inRange / values.length) * 100;

    return { average, min, max, inRange, percentageInRange, total: values.length };
  };

  const stats = getGlucoseStats();

  const getDailyAverages = () => {
    const dailyData: { [key: string]: number[] } = {};
    
    filteredReadings.forEach(reading => {
      const date = new Date(reading.timestamp).toISOString().split('T')[0];
      if (!dailyData[date]) dailyData[date] = [];
      dailyData[date].push(reading.value);
    });

    return Object.entries(dailyData).map(([date, values]) => ({
      date,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      count: values.length,
    })).sort((a, b) => a.date.localeCompare(b.date));
  };

  const dailyAverages = getDailyAverages();

  const getCompletedTasksStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = state.dailyTasks.filter(task => task.date === today);
    const completedToday = todaysTasks.filter(task => task.completed).length;
    
    return {
      completedToday,
      totalToday: todaysTasks.length,
      percentageToday: todaysTasks.length > 0 ? (completedToday / todaysTasks.length) * 100 : 0,
    };
  };

  const taskStats = getCompletedTasksStats();

  const exportData = () => {
    const data = {
      glucoseReadings: filteredReadings,
      timeRange,
      exportDate: new Date().toISOString(),
      stats,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diabetes-records-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-md">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Meus Registros</h1>
              <p className="text-gray-600">Acompanhe sua evolução ao longo do tempo</p>
            </div>
          </div>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Período:</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                timeRange === range.value
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              {range.label}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-500">Glicemia Média</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {stats ? `${stats.average.toFixed(0)} mg/dL` : 'Sem dados'}
          </div>
          {stats && (
            <div className="text-sm text-gray-600 mt-1">
              {stats.average <= 140 ? (
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Dentro da meta
                </div>
              ) : (
                <div className="flex items-center text-yellow-600">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Acima da meta
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-md">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-500">Tempo no Alvo</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {stats ? `${stats.percentageInRange.toFixed(0)}%` : '0%'}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {stats ? `${stats.inRange} de ${stats.total} leituras` : 'Sem dados'}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-500">Tarefas Hoje</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {taskStats.completedToday}/{taskStats.totalToday}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {taskStats.percentageToday.toFixed(0)}% completas
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-500">Total de Registros</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {state.glucoseReadings.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {filteredReadings.length} no período
          </div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Evolução da Glicemia - {timeRanges.find(r => r.value === timeRange)?.label}</h2>
        </div>
        
        {dailyAverages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">Nenhum dado encontrado para o período selecionado</p>
            <p className="text-sm text-gray-400">Adicione registros de glicemia para visualizar os gráficos de evolução.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Mostrando os últimos {Math.min(dailyAverages.length, 7)} dias com registros
            </div>
            <div className="space-y-2">
              {dailyAverages.slice(-10).map((day, index) => {
                const percentage = Math.min((day.average / 200) * 100, 100); // Scale to 200 mg/dL max
                const isInRange = day.average >= 70 && day.average <= 140;
                
                return (
                  <div key={day.date} className="flex items-center space-x-4 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                    <div className="w-24 text-sm font-medium text-gray-700">
                      {new Date(day.date).toLocaleDateString('pt-BR', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative shadow-inner">
                      <div
                        className={`h-8 rounded-full transition-all duration-700 shadow-sm ${
                          isInRange 
                            ? 'bg-gradient-to-r from-green-400 to-green-500' 
                            : day.average < 70 
                              ? 'bg-gradient-to-r from-red-400 to-red-500'
                              : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                        {day.average.toFixed(0)} mg/dL
                      </div>
                    </div>
                    <div className="w-16 text-sm text-gray-600">
                      {day.count} {day.count === 1 ? 'leitura' : 'leituras'}
                    </div>
                    <div className="w-8">
                      {isInRange ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      ) : day.average < 70 ? (
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      ) : (
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recent Records */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Registros Recentes</h2>
        
        {filteredReadings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum registro encontrado para este período.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReadings
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .slice(0, 10)
              .map((reading) => (
                <div key={reading.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white/50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      reading.value >= 70 && reading.value <= 140 ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <span className="font-medium text-gray-800">
                        {reading.value} {reading.unit}
                      </span>
                      {reading.notes && (
                        <span className="text-sm text-gray-600 ml-2">- {reading.notes}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(reading.timestamp).toLocaleDateString('pt-BR')} às{' '}
                    {new Date(reading.timestamp).toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border border-indigo-200">
        <h3 className="font-semibold text-indigo-800 mb-4 flex items-center">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          📊 Insights Automáticos - {timeRanges.find(r => r.value === timeRange)?.label}
        </h3>
        <div className="space-y-3">
          {stats ? (
            <>
              {stats.percentageInRange >= 70 ? (
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                  <span>🎉 Excelente! Você está mantendo {stats.percentageInRange.toFixed(0)}% das suas leituras dentro da meta.</span>
                </div>
              ) : stats.percentageInRange >= 50 ? (
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                  <span>👍 Bom progresso! {stats.percentageInRange.toFixed(0)}% das leituras estão no alvo. Continue assim!</span>
                </div>
              ) : (
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1 flex-shrink-0" />
                  <span>💪 Há espaço para melhoria. Apenas {stats.percentageInRange.toFixed(0)}% das leituras estão no alvo.</span>
                </div>
              )}
              
              <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mt-1 flex-shrink-0" />
                <span>📈 Sua média atual é {stats.average.toFixed(0)} mg/dL. A meta é manter abaixo de 140 mg/dL.</span>
              </div>
            </>
          ) : (
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-3 h-3 bg-gray-500 rounded-full mt-1 flex-shrink-0" />
              <span>Adicione mais registros para ver insights personalizados sobre seu controle glicêmico.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};