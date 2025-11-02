import React, { useState } from 'react';
import { QuizStep } from './QuizStep';
import { useApp } from '../../contexts/AppContext';
import { User } from '../../types';

export const Quiz: React.FC = () => {
  const { dispatch, isAdminUser } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    diabetesType: '',
    challenges: [] as string[],
    medications: [] as string[],
    experience: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'challenges' | 'medications', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const user: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      diabetesType: formData.diabetesType as any,
      challenges: formData.challenges,
      medications: formData.medications,
      experience: formData.experience,
      hasAccess: isAdminUser(formData.email),
      createdAt: new Date(),
    };

    dispatch({ type: 'SET_USER', payload: user });
    
    if (isAdminUser(formData.email)) {
      dispatch({ type: 'SET_STEP', payload: 'dashboard' });
    } else {
      dispatch({ type: 'SET_STEP', payload: 'payment' });
    }
  };

  const steps = [
    {
      title: 'Informações Básicas',
      canProceed: formData.name && formData.email && formData.age,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Digite seu nome completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ex: 35"
              min="1"
              max="120"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Tipo de Diabetes',
      canProceed: formData.diabetesType !== '',
      content: (
        <div className="space-y-3">
          {[
            { value: 'type1', label: 'Diabetes Tipo 1', desc: 'Requer insulina desde o diagnóstico' },
            { value: 'type2', label: 'Diabetes Tipo 2', desc: 'Mais comum em adultos, pode usar medicamentos orais' },
            { value: 'gestational', label: 'Diabetes Gestacional', desc: 'Desenvolvida durante a gravidez' },
            { value: 'prediabetes', label: 'Pré-diabetes', desc: 'Glicose elevada, mas ainda não diabetes' },
          ].map((option) => (
            <label
              key={option.value}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.diabetesType === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="diabetesType"
                value={option.value}
                checked={formData.diabetesType === option.value}
                onChange={(e) => handleInputChange('diabetesType', e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Principais Desafios',
      canProceed: formData.challenges.length > 0,
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4">Selecione seus principais desafios (múltipla escolha):</p>
          {[
            'Controle da alimentação',
            'Exercícios regulares',
            'Monitoramento da glicemia',
            'Aderência à medicação',
            'Controle do peso',
            'Gestão do estresse',
            'Complicações existentes',
          ].map((challenge) => (
            <label
              key={challenge}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.challenges.includes(challenge)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.challenges.includes(challenge)}
                onChange={() => handleArrayToggle('challenges', challenge)}
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700">{challenge}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Medicações Atuais',
      canProceed: true,
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4">Quais medicações você usa atualmente? (opcional):</p>
          {[
            'Insulina de ação rápida',
            'Insulina de ação lenta',
            'Metformina',
            'Sulfoniluréia',
            'Inibidores DPP-4',
            'Análogos GLP-1',
            'Não uso medicação',
          ].map((medication) => (
            <label
              key={medication}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.medications.includes(medication)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.medications.includes(medication)}
                onChange={() => handleArrayToggle('medications', medication)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-gray-700">{medication}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Experiência com Controle',
      canProceed: formData.experience !== '',
      content: (
        <div className="space-y-3">
          <p className="text-gray-600 mb-4">Como você avalia sua experiência atual com o controle do diabetes?</p>
          {[
            { value: 'beginner', label: 'Iniciante', desc: 'Acabei de ser diagnosticado(a) ou tenho pouca experiência' },
            { value: 'intermediate', label: 'Intermediário', desc: 'Tenho alguma experiência, mas ainda tenho dúvidas' },
            { value: 'advanced', label: 'Avançado', desc: 'Tenho boa experiência e controle estabelecido' },
          ].map((option) => (
            <label
              key={option.value}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.experience === option.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="experience"
                value={option.value}
                checked={formData.experience === option.value}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-gray-800">{option.label}</div>
              <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
            </label>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo ao Seu Assistente de Diabetes
          </h1>
          <p className="text-lg text-gray-600">
            Vamos conhecer você melhor para personalizar sua experiência
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-blue-500 scale-110'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <QuizStep
          title={steps[currentStep].title}
          onNext={handleNext}
          canProceed={steps[currentStep].canProceed}
          isLast={currentStep === steps.length - 1}
        >
          {steps[currentStep].content}
        </QuizStep>
      </div>
    </div>
  );
};