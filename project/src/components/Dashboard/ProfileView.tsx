import React, { useState } from 'react';
import { User, Edit3, Save, X, Shield, Bell, Smartphone, Award, Calendar } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const ProfileView: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    age: state.user?.age || 0,
    diabetesType: state.user?.diabetesType || 'type2',
    challenges: state.user?.challenges || [],
    medications: state.user?.medications || [],
    experience: state.user?.experience || 'intermediate',
  });

  const diabetesTypes = [
    { value: 'type1', label: 'Diabetes Tipo 1' },
    { value: 'type2', label: 'Diabetes Tipo 2' },
    { value: 'gestational', label: 'Diabetes Gestacional' },
    { value: 'prediabetes', label: 'Pré-diabetes' },
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Iniciante' },
    { value: 'intermediate', label: 'Intermediário' },
    { value: 'advanced', label: 'Avançado' },
  ];

  const challengeOptions = [
    'Controle da alimentação',
    'Exercícios regulares',
    'Monitoramento da glicemia',
    'Aderência à medicação',
    'Controle do peso',
    'Gestão do estresse',
    'Complicações existentes',
  ];

  const medicationOptions = [
    'Insulina de ação rápida',
    'Insulina de ação lenta',
    'Metformina',
    'Sulfoniluréia',
    'Inibidores DPP-4',
    'Análogos GLP-1',
    'Não uso medicação',
  ];

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (state.user) {
        const updatedUser = {
          ...state.user,
          ...editedProfile,
        };
        dispatch({ type: 'SET_USER', payload: updatedUser });
      }
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    setEditedProfile({
      name: state.user?.name || '',
      email: state.user?.email || '',
      age: state.user?.age || 0,
      diabetesType: state.user?.diabetesType || 'type2',
      challenges: state.user?.challenges || [],
      medications: state.user?.medications || [],
      experience: state.user?.experience || 'intermediate',
    });
    setIsEditing(false);
  };

  const handleArrayToggle = (field: 'challenges' | 'medications', value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const getDaysUsingApp = () => {
    if (!state.user?.createdAt) return 0;
    const diffTime = Math.abs(Date.now() - new Date(state.user.createdAt).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTypeLabel = (type: string) => {
    return diabetesTypes.find(t => t.value === type)?.label || type;
  };

  const getExperienceLabel = (experience: string) => {
    return experienceLevels.find(e => e.value === experience)?.label || experience;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{state.user?.name}</h1>
              <p className="text-gray-600">{state.user?.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Usando há {getDaysUsingApp()} dias</span>
                <span>•</span>
                <span>{getTypeLabel(state.user?.diabetesType || '')}</span>
              </div>
            </div>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar Perfil</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                    <input
                      type="number"
                      value={editedProfile.age}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Diabetes</label>
                    <select
                      value={editedProfile.diabetesType}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, diabetesType: e.target.value as any }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      {diabetesTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Experiência</label>
                  <select
                    value={editedProfile.experience}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    {experienceLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome</label>
                  <p className="text-gray-800 font-medium">{state.user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">E-mail</label>
                  <p className="text-gray-800 font-medium">{state.user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Idade</label>
                  <p className="text-gray-800 font-medium">{state.user?.age} anos</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo de Diabetes</label>
                  <p className="text-gray-800 font-medium">{getTypeLabel(state.user?.diabetesType || '')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Experiência</label>
                  <p className="text-gray-800 font-medium">{getExperienceLabel(state.user?.experience || '')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Challenges */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-red-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Principais Desafios</h2>
            
            {isEditing ? (
              <div className="space-y-2">
                {challengeOptions.map(challenge => (
                  <label
                    key={challenge}
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                      editedProfile.challenges.includes(challenge)
                        ? 'border-red-300 bg-red-50 shadow-sm'
                        : 'border-gray-200 hover:border-red-300 hover:shadow-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={editedProfile.challenges.includes(challenge)}
                      onChange={() => handleArrayToggle('challenges', challenge)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-gray-700">{challenge}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.user?.challenges.map(challenge => (
                  <span
                    key={challenge}
                    className="px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 text-sm rounded-full border border-red-200"
                  >
                    {challenge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Medications */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Medicações Atuais</h2>
            
            {isEditing ? (
              <div className="space-y-2">
                {medicationOptions.map(medication => (
                  <label
                    key={medication}
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                      editedProfile.medications.includes(medication)
                        ? 'border-blue-300 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={editedProfile.medications.includes(medication)}
                      onChange={() => handleArrayToggle('medications', medication)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-gray-700">{medication}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.user?.medications.map(medication => (
                  <span
                    key={medication}
                    className="px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm rounded-full border border-blue-200"
                  >
                    {medication}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Estatísticas</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Registros de Glicemia</span>
                <span className="font-semibold text-gray-800">{state.glucoseReadings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lembretes Ativos</span>
                <span className="font-semibold text-gray-800">
                  {state.reminders.filter(r => r.enabled).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dias de Uso</span>
                <span className="font-semibold text-gray-800">{getDaysUsingApp()}</span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Configurações</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-xl transition-all duration-200">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Notificações</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-xl transition-all duration-200">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Lembretes</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-xl transition-all duration-200">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Privacidade</span>
              </button>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1 bg-green-500 rounded-full">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-green-800">Conta Premium</span>
            </div>
            <p className="text-sm text-green-700">
              Você tem acesso completo a todas as funcionalidades do app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};