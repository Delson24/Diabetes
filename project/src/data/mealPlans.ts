export interface MealPlan {
  id: string;
  name: string;
  time: string;
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    carbs: number;
    protein: number;
    fiber: number;
    fat: number;
    sodium: number;
  };
  diabetesType: ('type1' | 'type2' | 'prediabetes' | 'gestational')[];
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  prepTime: number;
  tips: string[];
}

export interface DayMealPlan {
  breakfast: MealPlan;
  morningSnack?: MealPlan;
  lunch: MealPlan;
  afternoonSnack?: MealPlan;
  dinner: MealPlan;
  eveningSnack?: MealPlan;
}

export const weeklyMealPlans: Record<string, DayMealPlan> = {
  monday: {
    breakfast: {
      id: 'mon-breakfast',
      name: 'Aveia com Frutas Vermelhas e Canela',
      time: '07:00',
      calories: 280,
      carbs: 45,
      protein: 8,
      fiber: 6,
      description: 'Aveia integral cremosa com frutas vermelhas frescas, rica em fibras e antioxidantes',
      ingredients: [
        '1/2 xícara de aveia em flocos integrais',
        '1 xícara de leite desnatado ou vegetal sem açúcar',
        '1/2 xícara de frutas vermelhas (morangos, mirtilos)',
        '1 colher de chá de canela em pó',
        '1 colher de sopa de sementes de chia',
        'Adoçante natural a gosto (stevia ou xilitol)'
      ],
      instructions: [
        'Aqueça o leite em uma panela em fogo médio',
        'Adicione a aveia e mexa constantemente por 3-5 minutos',
        'Quando estiver cremosa, retire do fogo',
        'Adicione a canela e o adoçante',
        'Sirva em uma tigela e decore com as frutas vermelhas',
        'Finalize polvilhando as sementes de chia por cima'
      ],
      nutritionalInfo: {
        carbs: 45,
        protein: 8,
        fiber: 6,
        fat: 4,
        sodium: 120
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Fácil',
      prepTime: 10,
      tips: [
        'As fibras da aveia ajudam a controlar a absorção de glicose',
        'Frutas vermelhas têm baixo índice glicêmico',
        'Prepare na noite anterior para economizar tempo pela manhã'
      ]
    },
    morningSnack: {
      id: 'mon-morning-snack',
      name: 'Iogurte Natural com Nozes',
      time: '10:00',
      calories: 150,
      carbs: 12,
      protein: 10,
      fiber: 2,
      description: 'Lanche rico em proteínas e gorduras boas para manter a saciedade',
      ingredients: [
        '1 pote de iogurte natural desnatado (170g)',
        '1 colher de sopa de nozes picadas',
        '1/2 colher de chá de canela',
        'Adoçante natural a gosto'
      ],
      instructions: [
        'Coloque o iogurte em uma tigela',
        'Adicione o adoçante e misture bem',
        'Polvilhe a canela por cima',
        'Finalize com as nozes picadas'
      ],
      nutritionalInfo: {
        carbs: 12,
        protein: 10,
        fiber: 2,
        fat: 8,
        sodium: 80
      },
      diabetesType: ['type1', 'type2', 'prediabetes'],
      difficulty: 'Fácil',
      prepTime: 3,
      tips: [
        'As nozes fornecem ômega-3 e ajudam no controle glicêmico',
        'Escolha iogurte sem açúcar adicionado'
      ]
    },
    lunch: {
      id: 'mon-lunch',
      name: 'Peito de Frango Grelhado com Quinoa e Legumes',
      time: '12:00',
      calories: 420,
      carbs: 35,
      protein: 35,
      fiber: 8,
      description: 'Refeição completa e balanceada com proteína magra, carboidrato complexo e vegetais',
      ingredients: [
        '150g de peito de frango sem pele',
        '1/2 xícara de quinoa',
        '1 abobrinha média cortada em cubos',
        '1 cenoura média cortada em cubos',
        '1 dente de alho picado',
        '1 colher de sopa de azeite extra virgem',
        'Temperos: orégano, alecrim, sal e pimenta',
        'Suco de 1/2 limão'
      ],
      instructions: [
        'Tempere o frango com sal, pimenta, orégano e suco de limão',
        'Deixe marinar por 15 minutos',
        'Cozinhe a quinoa conforme instruções da embalagem',
        'Grelhe o frango em uma frigideira antiaderente por 6-8 minutos cada lado',
        'Em outra panela, refogue o alho no azeite',
        'Adicione a abobrinha e cenoura, tempere e cozinhe por 10 minutos',
        'Sirva o frango fatiado sobre a quinoa com os legumes ao lado'
      ],
      nutritionalInfo: {
        carbs: 35,
        protein: 35,
        fiber: 8,
        fat: 12,
        sodium: 380
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Médio',
      prepTime: 30,
      tips: [
        'A quinoa é um carboidrato de baixo índice glicêmico',
        'Legumes coloridos fornecem vitaminas e antioxidantes',
        'Pode preparar a quinoa em maior quantidade para usar em outras refeições'
      ]
    },
    afternoonSnack: {
      id: 'mon-afternoon-snack',
      name: 'Maçã com Pasta de Amendoim',
      time: '15:30',
      calories: 180,
      carbs: 20,
      protein: 6,
      fiber: 4,
      description: 'Combinação perfeita de fibras e proteínas para controlar a fome',
      ingredients: [
        '1 maçã média',
        '1 colher de sopa de pasta de amendoim integral sem açúcar',
        'Pitada de canela'
      ],
      instructions: [
        'Lave e corte a maçã em fatias',
        'Sirva com a pasta de amendoim para mergulhar',
        'Polvilhe canela por cima'
      ],
      nutritionalInfo: {
        carbs: 20,
        protein: 6,
        fiber: 4,
        fat: 8,
        sodium: 5
      },
      diabetesType: ['type1', 'type2', 'prediabetes'],
      difficulty: 'Fácil',
      prepTime: 2,
      tips: [
        'A fibra da maçã ajuda a retardar a absorção do açúcar',
        'Escolha pasta de amendoim sem açúcar adicionado'
      ]
    },
    dinner: {
      id: 'mon-dinner',
      name: 'Salmão Assado com Aspargos e Batata Doce',
      time: '19:00',
      calories: 380,
      carbs: 25,
      protein: 30,
      fiber: 6,
      description: 'Jantar rico em ômega-3 e nutrientes essenciais para a saúde cardiovascular',
      ingredients: [
        '150g de filé de salmão',
        '200g de aspargos frescos',
        '1 batata doce média (150g)',
        '1 colher de sopa de azeite extra virgem',
        '1 limão (suco e raspas)',
        'Temperos: alho em pó, ervas finas, sal e pimenta',
        'Ramos de alecrim fresco'
      ],
      instructions: [
        'Pré-aqueça o forno a 200°C',
        'Corte a batata doce em fatias de 1cm',
        'Tempere o salmão com sal, pimenta, suco e raspas de limão',
        'Corte a parte dura dos aspargos',
        'Em uma assadeira, disponha todos os ingredientes',
        'Regue com azeite e temperos',
        'Asse por 20-25 minutos até o salmão estar no ponto',
        'Sirva imediatamente com ramos de alecrim'
      ],
      nutritionalInfo: {
        carbs: 25,
        protein: 30,
        fiber: 6,
        fat: 15,
        sodium: 320
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Médio',
      prepTime: 35,
      tips: [
        'Salmão é rico em ômega-3, que tem propriedades anti-inflamatórias',
        'Batata doce tem índice glicêmico menor que batata comum',
        'Aspargos são ricos em fibras e pobres em carboidratos'
      ]
    }
  },
  tuesday: {
    breakfast: {
      id: 'tue-breakfast',
      name: 'Omelete de Vegetais com Queijo Cottage',
      time: '07:00',
      calories: 320,
      carbs: 8,
      protein: 25,
      fiber: 3,
      description: 'Café da manhã rico em proteínas com vegetais frescos e queijo cottage',
      ingredients: [
        '2 ovos inteiros',
        '1/4 xícara de queijo cottage',
        '1/2 tomate picado',
        '1/4 xícara de espinafre fresco',
        '1/4 cebola pequena picada',
        '1 colher de chá de azeite',
        'Temperos: sal, pimenta, orégano'
      ],
      instructions: [
        'Bata os ovos em uma tigela com sal e pimenta',
        'Aqueça o azeite em uma frigideira antiaderente',
        'Refogue a cebola até dourar',
        'Adicione o tomate e espinafre, cozinhe por 2 minutos',
        'Despeje os ovos batidos na frigideira',
        'Adicione o queijo cottage por cima',
        'Dobre a omelete ao meio e sirva'
      ],
      nutritionalInfo: {
        carbs: 8,
        protein: 25,
        fiber: 3,
        fat: 18,
        sodium: 420
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Médio',
      prepTime: 15,
      tips: [
        'Ovos são uma excelente fonte de proteína completa',
        'Vegetais adicionam fibras e vitaminas',
        'Queijo cottage é rico em proteína e baixo em gordura'
      ]
    },
    lunch: {
      id: 'tue-lunch',
      name: 'Salada de Grão-de-Bico com Atum',
      time: '12:00',
      calories: 390,
      carbs: 32,
      protein: 28,
      fiber: 12,
      description: 'Salada nutritiva e saciante com leguminosa e proteína do mar',
      ingredients: [
        '1 xícara de grão-de-bico cozido',
        '1 lata de atum em água (120g)',
        '2 xícaras de folhas verdes mistas',
        '1 tomate cereja cortado ao meio',
        '1/2 pepino em cubos',
        '1/4 cebola roxa fatiada',
        '2 colheres de sopa de azeite extra virgem',
        '1 colher de sopa de vinagre balsâmico',
        'Temperos: sal, pimenta, manjericão'
      ],
      instructions: [
        'Em uma tigela grande, misture o grão-de-bico com o atum',
        'Adicione todos os vegetais picados',
        'Prepare o molho misturando azeite, vinagre e temperos',
        'Regue a salada com o molho',
        'Misture bem e deixe descansar por 10 minutos',
        'Sirva sobre as folhas verdes'
      ],
      nutritionalInfo: {
        carbs: 32,
        protein: 28,
        fiber: 12,
        fat: 14,
        sodium: 380
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Fácil',
      prepTime: 15,
      tips: [
        'Grão-de-bico é rico em fibras e proteína vegetal',
        'Pode preparar em maior quantidade para consumir em 2 dias',
        'Atum fornece ômega-3 e proteína de alta qualidade'
      ]
    },
    dinner: {
      id: 'tue-dinner',
      name: 'Peito de Peru com Purê de Couve-flor',
      time: '19:00',
      calories: 350,
      carbs: 15,
      protein: 32,
      fiber: 5,
      description: 'Jantar leve com proteína magra e acompanhamento baixo em carboidratos',
      ingredients: [
        '150g de peito de peru fatiado',
        '1 couve-flor média',
        '2 colheres de sopa de leite desnatado',
        '1 colher de sopa de azeite',
        '2 dentes de alho',
        'Temperos: sal, pimenta, tomilho, alecrim'
      ],
      instructions: [
        'Cozinhe a couve-flor no vapor até ficar macia',
        'Tempere o peru com sal, pimenta e ervas',
        'Grelhe o peru em frigideira antiaderente por 3-4 minutos cada lado',
        'Bata a couve-flor no liquidificador com leite e alho',
        'Tempere o purê com sal e pimenta',
        'Sirva o peru sobre o purê de couve-flor'
      ],
      nutritionalInfo: {
        carbs: 15,
        protein: 32,
        fiber: 5,
        fat: 8,
        sodium: 420
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Médio',
      prepTime: 25,
      tips: [
        'Couve-flor é uma excelente substituta para purê de batata',
        'Peru é uma carne magra rica em proteínas',
        'Pode adicionar ervas frescas para mais sabor'
      ]
    }
  },
  // Continue with other days...
  wednesday: {
    breakfast: {
      id: 'wed-breakfast',
      name: 'Smoothie Verde Proteico',
      time: '07:00',
      calories: 290,
      carbs: 25,
      protein: 20,
      fiber: 8,
      description: 'Smoothie nutritivo com vegetais, frutas e proteína',
      ingredients: [
        '1 xícara de espinafre fresco',
        '1/2 banana congelada',
        '1/2 maçã verde',
        '1 scoop de whey protein sem sabor',
        '1 colher de sopa de sementes de linhaça',
        '1 xícara de água de coco',
        'Gelo a gosto'
      ],
      instructions: [
        'Coloque todos os ingredientes no liquidificador',
        'Bata até obter consistência homogênea',
        'Adicione gelo se desejar mais gelado',
        'Sirva imediatamente'
      ],
      nutritionalInfo: {
        carbs: 25,
        protein: 20,
        fiber: 8,
        fat: 6,
        sodium: 120
      },
      diabetesType: ['type1', 'type2', 'prediabetes'],
      difficulty: 'Fácil',
      prepTime: 5,
      tips: [
        'Espinafre é rico em ferro e folato',
        'Sementes de linhaça fornecem ômega-3',
        'Pode substituir a banana por abacate para menos carboidratos'
      ]
    },
    lunch: {
      id: 'wed-lunch',
      name: 'Wrap de Frango com Vegetais',
      time: '12:00',
      calories: 380,
      carbs: 30,
      protein: 28,
      fiber: 6,
      description: 'Wrap saudável com tortilla integral e recheio nutritivo',
      ingredients: [
        '1 tortilla integral grande',
        '120g de peito de frango desfiado',
        '2 folhas de alface',
        '1/2 tomate em fatias',
        '1/4 abacate',
        '2 colheres de sopa de iogurte grego',
        '1 colher de chá de mostarda dijon',
        'Temperos: sal, pimenta, cominho'
      ],
      instructions: [
        'Misture o iogurte com a mostarda',
        'Espalhe a mistura na tortilla',
        'Adicione o frango temperado',
        'Coloque os vegetais por cima',
        'Enrole firmemente e corte ao meio',
        'Sirva imediatamente'
      ],
      nutritionalInfo: {
        carbs: 30,
        protein: 28,
        fiber: 6,
        fat: 12,
        sodium: 520
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Fácil',
      prepTime: 10,
      tips: [
        'Tortilla integral tem mais fibras que a comum',
        'Abacate fornece gorduras boas',
        'Pode preparar o frango antecipadamente'
      ]
    },
    dinner: {
      id: 'wed-dinner',
      name: 'Peixe Assado com Legumes Mediterrâneos',
      time: '19:00',
      calories: 360,
      carbs: 20,
      protein: 30,
      fiber: 7,
      description: 'Prato inspirado na dieta mediterrânea com peixe e vegetais',
      ingredients: [
        '150g de filé de peixe branco',
        '1 abobrinha em fatias',
        '1 berinjela pequena em cubos',
        '1 pimentão vermelho em tiras',
        '1 cebola em fatias',
        '2 colheres de sopa de azeite',
        '2 dentes de alho picados',
        'Temperos: orégano, manjericão, sal, pimenta'
      ],
      instructions: [
        'Pré-aqueça o forno a 180°C',
        'Tempere o peixe com sal, pimenta e ervas',
        'Em uma assadeira, misture todos os vegetais com azeite e alho',
        'Coloque o peixe por cima dos vegetais',
        'Asse por 25-30 minutos',
        'Sirva quente'
      ],
      nutritionalInfo: {
        carbs: 20,
        protein: 30,
        fiber: 7,
        fat: 10,
        sodium: 280
      },
      diabetesType: ['type1', 'type2', 'prediabetes', 'gestational'],
      difficulty: 'Médio',
      prepTime: 40,
      tips: [
        'Vegetais mediterrâneos são ricos em antioxidantes',
        'Peixe branco é uma proteína magra',
        'Pode usar qualquer peixe de sua preferência'
      ]
    }
  }
  // Add more days as needed...
};