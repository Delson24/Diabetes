import React from 'react';
import { ChevronRight } from 'lucide-react';

interface QuizStepProps {
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  canProceed: boolean;
  isLast?: boolean;
}

export const QuizStep: React.FC<QuizStepProps> = ({
  title,
  children,
  onNext,
  canProceed,
  isLast = false,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      
      <div className="space-y-6 mb-8">
        {children}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            canProceed
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLast ? 'Finalizar' : 'Próximo'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};