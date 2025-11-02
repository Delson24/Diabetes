import React, { useState } from 'react';
import { Utensils, Clock, Users, ChefHat, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { weeklyMealPlans, MealPlan } from '../../data/mealPlans';

export const MealPlanner: React.FC = () => {
  const { state } = useApp();
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [selectedMealData, setSelectedMealData] = useState<MealPlan | null>(null);

  const daysOfWeek = [
    { id: 'monday', label: 'Segunda', short: 'Seg' },
    { id: 'tuesday', label: 'Terça', short: 'Ter' },
    { id: 'wednesday', label: 'Quarta', short: 'Qua' },
    { id: 'thursday', label: 'Quinta', short: 'Qui' },
    { id: 'friday', label: 'Sexta', short: 'Sex' },
    { id: 'saturday', label: 'Sábado', short: 'Sáb' },
    { id: 'sunday', label: 'Domingo', short: 'Dom' },
  ];

  const getCurrentMeals = () => weeklyMealPlans[selectedDay] || weeklyMealPlans.monday;

  const handleMealClick = (mealType: string, meal: MealPlan) => {
    setSelectedMeal(`${selectedDay}-${mealType}`);
    setSelectedMealData(meal);
  };

  const getMealTypeLabel = (mealType: string) => {
    const labels: Record<string, string> = {
      breakfast: 'Café da Manhã',
      morningSnack: 'Lanche da Manhã',
      lunch: 'Almoço',
      afternoonSnack: 'Lanche da Tarde',
      dinner: 'Jantar',
      eveningSnack: 'Ceia'
    };
    return labels[mealType] || mealType;
  };

  const isRecommendedForUser = (meal: MealPlan) => {
    if (!state.user?.diabetesType) return true;
    return meal.diabetesType.includes(state.user.diabetesType);
  };

  const recipes = [
    {
      id: 1,
      name: 'Salada de Quinoa Colorida',
      time: '15 min',
      serves: 2,
      difficulty: 'Fácil',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Vegetariano', 'Baixo Carb', 'Rico em Proteína']
    },
    {
      id: 2,
      name: 'Frango com Legumes no Vapor',
      time: '25 min',
      serves: 3,
      difficulty: 'Médio',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Baixo Sódio', 'Rico em Proteína', 'Diabético']
    },
    {
      id: 3,
      name: 'Smoothie Verde Nutritivo',
      time: '5 min',
      serves: 1,
      difficulty: 'Fácil',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: ['Detox', 'Vitaminas', 'Antioxidante']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-orange-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-md">
            <Utensils className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Plano Alimentar</h1>
            <p className="text-gray-600">
              Refeições personalizadas para {state.user?.diabetesType === 'type1' ? 'Diabetes Tipo 1' : 
              state.user?.diabetesType === 'type2' ? 'Diabetes Tipo 2' : 
              state.user?.diabetesType === 'gestational' ? 'Diabetes Gestacional' : 
              state.user?.diabetesType === 'prediabetes' ? 'Pré-diabetes' : 'seu perfil'}
            </p>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {daysOfWeek.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                selectedDay === day.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="hidden sm:inline">{day.label}</span>
              <span className="sm:hidden">{day.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meal Plan for Selected Day */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(getCurrentMeals()).map(([mealType, meal]) => (
          <div key={mealType} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              {/* Meal recommendation badge */}
              {isRecommendedForUser(meal) && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✨ Recomendado para você
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {getMealTypeLabel(mealType)}
                </h3>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{meal.time}</span>
                </div>
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">{meal.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{meal.description}</p>

              {/* Nutritional info grid */}
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div className="text-center">
                  <div className="font-semibold text-orange-600">{meal.calories}</div>
                  <div className="text-gray-500 text-xs">kcal</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{meal.carbs}g</div>
                  <div className="text-gray-500 text-xs">carbs</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{meal.protein}g</div>
                  <div className="text-gray-500 text-xs">proteína</div>
                </div>
              </div>
              
              {/* Difficulty and prep time */}
              <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>🍳 {meal.difficulty}</span>
                <span>⏱️ {meal.prepTime} min</span>
              </div>

              <button
                onClick={() => handleMealClick(mealType, meal)}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Ver Receita
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Details Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Receita Detalhada</h2>
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedMealData && (
                <div className="space-y-8">
                  {/* Recipe header */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedMealData.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedMealData.description}</p>
                    
                    {/* Recipe stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{selectedMealData.calories}</div>
                        <div className="text-sm text-gray-600">Calorias</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedMealData.prepTime} min</div>
                        <div className="text-sm text-gray-600">Preparo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedMealData.difficulty}</div>
                        <div className="text-sm text-gray-600">Dificuldade</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedMealData.fiber}g</div>
                        <div className="text-sm text-gray-600">Fibras</div>
                      </div>
                    </div>
                  </div>

                  {/* Nutritional Information */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                      📊 Informações Nutricionais (por porção)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{selectedMealData.nutritionalInfo.carbs}g</div>
                        <div className="text-sm text-gray-600">Carboidratos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{selectedMealData.nutritionalInfo.protein}g</div>
                        <div className="text-sm text-gray-600">Proteínas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{selectedMealData.nutritionalInfo.fat}g</div>
                        <div className="text-sm text-gray-600">Gorduras</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{selectedMealData.nutritionalInfo.fiber}g</div>
                        <div className="text-sm text-gray-600">Fibras</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{selectedMealData.nutritionalInfo.sodium}mg</div>
                        <div className="text-sm text-gray-600">Sódio</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Ingredients */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        🛒 Ingredientes:
                      </h4>
                      <ul className="space-y-3">
                        {selectedMealData.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                        👨‍🍳 Modo de Preparo:
                      </h4>
                      <ol className="space-y-4">
                        {selectedMealData.instructions.map((instruction, index) => (
                          <li key={index} className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-sm font-semibold flex items-center justify-center">
                              {index + 1}
                            </div>
                            <span className="text-gray-700 leading-relaxed">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Tips */}
                  {selectedMealData.tips && selectedMealData.tips.length > 0 && (
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                      <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                        💡 Dicas Especiais:
                      </h4>
                      <ul className="space-y-2">
                        {selectedMealData.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span className="text-green-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recipe Collection */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-orange-100">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Receitas Recomendadas</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.serves} porções</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105">
                  Ver Receita
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};