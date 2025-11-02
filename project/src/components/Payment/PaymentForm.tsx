import React, { useState } from 'react';
import { CreditCard, Shield, Check } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const PaymentForm: React.FC = () => {
  const { dispatch } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      dispatch({ type: 'SET_STEP', payload: 'dashboard' });
      // In a real app, you would update the user's access status here
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Acesso Premium ao App
          </h1>
          <p className="text-lg text-gray-600">
            Desbloqueie todas as funcionalidades do seu assistente pessoal de diabetes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Features List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">O que está incluído:</h2>
            <div className="space-y-4">
              {[
                'Ebook completo sobre controle do diabetes',
                'Planos alimentares semanais personalizados',
                'Receitas exclusivas com modo de preparo',
                'Controle avançado de glicemia com gráficos',
                'Lembretes inteligentes personalizáveis',
                'Análise automática de progresso',
                'Objetivos semanais adaptativos',
                'Relatórios diários detalhados',
                'Suporte técnico prioritário',
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <div className="text-center py-4 bg-blue-50 rounded-lg mb-6">
                <div className="text-3xl font-bold text-blue-600">R$ 97,00</div>
                <div className="text-sm text-gray-600">Acesso vitalício • Pagamento único</div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Método de Pagamento</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-medium">Cartão</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded text-white text-xs font-bold flex items-center justify-center">
                    PIX
                  </div>
                  <div className="text-sm font-medium">PIX</div>
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    placeholder="Nome como está no cartão"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  Após clicar em "Confirmar Pagamento", você receberá o código PIX para efetuar o pagamento.
                  O acesso será liberado automaticamente após a confirmação.
                </p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full p-4 rounded-lg font-semibold text-white transition-all ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando...</span>
                </div>
              ) : (
                `Confirmar Pagamento - R$ 97,00`
              )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Pagamento 100% seguro e criptografado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};