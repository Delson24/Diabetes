export interface EbookChapter {
  id: number;
  title: string;
  pages: string;
  content: EbookSection[];
}

export interface EbookSection {
  type: 'title' | 'subtitle' | 'paragraph' | 'list' | 'tip' | 'warning' | 'example';
  content: string | string[];
  icon?: string;
}

export const ebookChapters: EbookChapter[] = [
  {
    id: 1,
    title: 'Introdução ao Diabetes',
    pages: '1-15',
    content: [
      {
        type: 'title',
        content: 'Capítulo 1: Introdução ao Diabetes'
      },
      {
        type: 'paragraph',
        content: 'O diabetes é uma condição crônica que afeta milhões de pessoas em todo o mundo. Caracteriza-se pela incapacidade do organismo de produzir insulina suficiente ou de utilizá-la de forma eficaz, resultando em níveis elevados de glicose no sangue.'
      },
      {
        type: 'subtitle',
        content: 'O que é o Diabetes?'
      },
      {
        type: 'paragraph',
        content: 'O diabetes mellitus é um grupo de doenças metabólicas caracterizadas por hiperglicemia (níveis elevados de açúcar no sangue) resultante de defeitos na secreção de insulina, na ação da insulina, ou em ambos. A insulina é um hormônio produzido pelo pâncreas que permite que as células do corpo utilizem a glicose como fonte de energia.'
      },
      {
        type: 'tip',
        content: '💡 Dica: Pense na insulina como uma "chave" que abre as portas das células para que a glicose possa entrar e ser utilizada como energia.',
        icon: '💡'
      },
      {
        type: 'subtitle',
        content: 'Estatísticas Importantes'
      },
      {
        type: 'list',
        content: [
          'Mais de 463 milhões de adultos vivem com diabetes no mundo',
          'No Brasil, são aproximadamente 16,8 milhões de pessoas com diabetes',
          '90% dos casos são de diabetes tipo 2',
          'A cada 6 segundos, uma pessoa morre por complicações do diabetes'
        ]
      },
      {
        type: 'subtitle',
        content: 'Sintomas Comuns'
      },
      {
        type: 'paragraph',
        content: 'É importante reconhecer os sinais precoces do diabetes para buscar tratamento adequado. Os sintomas mais comuns incluem:'
      },
      {
        type: 'list',
        content: [
          'Sede excessiva (polidipsia)',
          'Urinar com frequência (poliúria)',
          'Fome constante (polifagia)',
          'Perda de peso inexplicada',
          'Fadiga e fraqueza',
          'Visão embaçada',
          'Cicatrização lenta de feridas',
          'Infecções frequentes'
        ]
      },
      {
        type: 'warning',
        content: '⚠️ Atenção: Se você apresenta vários desses sintomas, procure um médico imediatamente. O diagnóstico precoce é fundamental para prevenir complicações.',
        icon: '⚠️'
      },
      {
        type: 'subtitle',
        content: 'Fatores de Risco'
      },
      {
        type: 'paragraph',
        content: 'Alguns fatores aumentam o risco de desenvolver diabetes:'
      },
      {
        type: 'list',
        content: [
          'Histórico familiar de diabetes',
          'Idade acima de 45 anos',
          'Sobrepeso ou obesidade',
          'Sedentarismo',
          'Hipertensão arterial',
          'Colesterol alto',
          'Síndrome dos ovários policísticos',
          'Diabetes gestacional prévia'
        ]
      },
      {
        type: 'example',
        content: 'Exemplo prático: Maria, 52 anos, tem histórico familiar de diabetes e está acima do peso. Ela deve fazer exames regulares de glicemia e adotar hábitos saudáveis como exercícios e alimentação balanceada para prevenir o desenvolvimento da doença.'
      }
    ]
  },
  {
    id: 2,
    title: 'Tipos de Diabetes',
    pages: '16-35',
    content: [
      {
        type: 'title',
        content: 'Capítulo 2: Tipos de Diabetes'
      },
      {
        type: 'paragraph',
        content: 'Existem diferentes tipos de diabetes, cada um com características específicas. Compreender essas diferenças é fundamental para o tratamento adequado.'
      },
      {
        type: 'subtitle',
        content: 'Diabetes Tipo 1'
      },
      {
        type: 'paragraph',
        content: 'O diabetes tipo 1 é uma doença autoimune onde o sistema imunológico ataca e destrói as células beta do pâncreas, responsáveis pela produção de insulina. Geralmente se manifesta na infância ou adolescência, mas pode ocorrer em qualquer idade.'
      },
      {
        type: 'list',
        content: [
          'Representa 5-10% de todos os casos de diabetes',
          'Início geralmente abrupto',
          'Requer insulina desde o diagnóstico',
          'Não está relacionado ao estilo de vida',
          'Pode ocorrer em qualquer idade'
        ]
      },
      {
        type: 'tip',
        content: '💡 Importante: Pessoas com diabetes tipo 1 precisam de insulina para sobreviver. Nunca interrompa o uso sem orientação médica.',
        icon: '💡'
      },
      {
        type: 'subtitle',
        content: 'Diabetes Tipo 2'
      },
      {
        type: 'paragraph',
        content: 'O diabetes tipo 2 é a forma mais comum da doença. Ocorre quando o corpo não produz insulina suficiente ou não consegue utilizá-la adequadamente (resistência à insulina). Está fortemente relacionado ao estilo de vida e fatores genéticos.'
      },
      {
        type: 'list',
        content: [
          'Representa 90-95% de todos os casos',
          'Desenvolvimento gradual',
          'Mais comum após os 40 anos',
          'Relacionado ao sobrepeso e sedentarismo',
          'Pode ser prevenido ou retardado',
          'Tratamento inicial com mudanças no estilo de vida'
        ]
      },
      {
        type: 'example',
        content: 'Exemplo: João, 48 anos, descobriu diabetes tipo 2 em um exame de rotina. Com dieta adequada, exercícios regulares e medicação oral, conseguiu controlar bem sua glicemia e evitar complicações.'
      },
      {
        type: 'subtitle',
        content: 'Diabetes Gestacional'
      },
      {
        type: 'paragraph',
        content: 'O diabetes gestacional ocorre durante a gravidez quando os hormônios placentários causam resistência à insulina. Geralmente desaparece após o parto, mas aumenta o risco de desenvolver diabetes tipo 2 no futuro.'
      },
      {
        type: 'list',
        content: [
          'Afeta 2-10% das gestações',
          'Geralmente diagnosticado entre 24-28 semanas',
          'Pode afetar a saúde da mãe e do bebê',
          'Requer monitoramento rigoroso',
          'Aumenta risco futuro de diabetes tipo 2'
        ]
      },
      {
        type: 'warning',
        content: '⚠️ Gestantes: O controle adequado da glicemia é essencial para a saúde da mãe e do bebê. Siga rigorosamente as orientações médicas.',
        icon: '⚠️'
      },
      {
        type: 'subtitle',
        content: 'Pré-diabetes'
      },
      {
        type: 'paragraph',
        content: 'O pré-diabetes é uma condição onde os níveis de glicose estão elevados, mas ainda não atingiram os critérios para diabetes. É um sinal de alerta importante e uma oportunidade de prevenção.'
      },
      {
        type: 'list',
        content: [
          'Glicemia de jejum entre 100-125 mg/dL',
          'Hemoglobina glicada entre 5,7-6,4%',
          'Alto risco de progressão para diabetes tipo 2',
          'Pode ser revertido com mudanças no estilo de vida',
          'Afeta cerca de 1 em cada 3 adultos'
        ]
      },
      {
        type: 'tip',
        content: '💡 Oportunidade: O pré-diabetes é uma chance de ouro para prevenir o diabetes tipo 2. Pequenas mudanças podem fazer uma grande diferença!',
        icon: '💡'
      }
    ]
  },
  {
    id: 3,
    title: 'Controle da Glicemia',
    pages: '36-55',
    content: [
      {
        type: 'title',
        content: 'Capítulo 3: Controle da Glicemia'
      },
      {
        type: 'paragraph',
        content: 'O controle adequado da glicemia é a base do tratamento do diabetes. Manter os níveis de açúcar no sangue dentro da faixa ideal previne complicações e melhora a qualidade de vida.'
      },
      {
        type: 'subtitle',
        content: 'Valores de Referência'
      },
      {
        type: 'paragraph',
        content: 'Conhecer os valores ideais de glicemia é fundamental para o automonitoramento:'
      },
      {
        type: 'list',
        content: [
          'Jejum: 70-100 mg/dL (normal) | 100-125 mg/dL (pré-diabetes) | ≥126 mg/dL (diabetes)',
          'Pós-prandial (2h após refeição): <140 mg/dL (normal) | 140-199 mg/dL (pré-diabetes) | ≥200 mg/dL (diabetes)',
          'Hemoglobina glicada (HbA1c): <5,7% (normal) | 5,7-6,4% (pré-diabetes) | ≥6,5% (diabetes)',
          'Meta para diabéticos: HbA1c <7% (individualizada conforme o caso)'
        ]
      },
      {
        type: 'subtitle',
        content: 'Como Medir a Glicemia'
      },
      {
        type: 'paragraph',
        content: 'O monitoramento regular da glicemia é essencial. Aqui está o passo a passo para uma medição correta:'
      },
      {
        type: 'list',
        content: [
          '1. Lave bem as mãos com água e sabão',
          '2. Seque completamente as mãos',
          '3. Insira a fita teste no glicosímetro',
          '4. Faça um pequeno furo na lateral da ponta do dedo',
          '5. Toque a gota de sangue na fita teste',
          '6. Aguarde o resultado aparecer no visor',
          '7. Anote o valor, data e horário',
          '8. Descarte adequadamente a lanceta e fita'
        ]
      },
      {
        type: 'tip',
        content: '💡 Dica: Alterne os dedos para evitar calosidades. Use as laterais dos dedos, pois são menos sensíveis que as pontas.',
        icon: '💡'
      },
      {
        type: 'subtitle',
        content: 'Quando Medir'
      },
      {
        type: 'paragraph',
        content: 'A frequência e horários das medições dependem do tipo de diabetes e tratamento:'
      },
      {
        type: 'list',
        content: [
          'Jejum: ao acordar, antes do café da manhã',
          'Pré-prandial: antes das principais refeições',
          'Pós-prandial: 2 horas após o início das refeições',
          'Antes de dormir: para avaliar o controle noturno',
          'Durante exercícios: antes, durante e após atividades intensas',
          'Quando se sentir mal: sintomas de hipo ou hiperglicemia'
        ]
      },
      {
        type: 'subtitle',
        content: 'Interpretando os Resultados'
      },
      {
        type: 'paragraph',
        content: 'Saber interpretar os valores é tão importante quanto medir:'
      },
      {
        type: 'example',
        content: 'Exemplo de interpretação: Se sua glicemia de jejum está em 95 mg/dL, está dentro do normal. Se está em 130 mg/dL, indica necessidade de ajustes no tratamento. Se está em 250 mg/dL, requer ação imediata.'
      },
      {
        type: 'warning',
        content: '⚠️ Emergência: Glicemia abaixo de 70 mg/dL (hipoglicemia) ou acima de 250 mg/dL (hiperglicemia severa) requer ação imediata. Procure ajuda médica se necessário.',
        icon: '⚠️'
      },
      {
        type: 'subtitle',
        content: 'Fatores que Afetam a Glicemia'
      },
      {
        type: 'list',
        content: [
          'Alimentação: tipo, quantidade e horário das refeições',
          'Exercícios: intensidade, duração e tipo de atividade',
          'Medicamentos: horário, dose e tipo de medicação',
          'Estresse: físico, emocional ou psicológico',
          'Sono: qualidade e quantidade de horas dormidas',
          'Doenças: infecções, gripes ou outras condições',
          'Hormônios: ciclo menstrual, gravidez, puberdade'
        ]
      },
      {
        type: 'tip',
        content: '💡 Registro: Mantenha um diário glicêmico anotando valores, horários, refeições e atividades. Isso ajuda a identificar padrões e melhorar o controle.',
        icon: '💡'
      }
    ]
  },
  {
    id: 4,
    title: 'Alimentação Saudável',
    pages: '56-75',
    content: [
      {
        type: 'title',
        content: 'Capítulo 4: Alimentação Saudável para Diabéticos'
      },
      {
        type: 'paragraph',
        content: 'A alimentação é um dos pilares fundamentais no controle do diabetes. Uma dieta bem planejada pode ajudar a manter a glicemia estável, controlar o peso e prevenir complicações.'
      },
      {
        type: 'subtitle',
        content: 'Princípios da Alimentação Diabética'
      },
      {
        type: 'list',
        content: [
          'Controle de carboidratos: quantidade e qualidade',
          'Regularidade nos horários das refeições',
          'Porções adequadas e balanceadas',
          'Preferência por alimentos integrais',
          'Inclusão de fibras em todas as refeições',
          'Hidratação adequada',
          'Limitação de açúcares simples e processados'
        ]
      },
      {
        type: 'subtitle',
        content: 'Índice Glicêmico: O que Você Precisa Saber'
      },
      {
        type: 'paragraph',
        content: 'O índice glicêmico (IG) mede a velocidade com que um alimento eleva a glicemia. Alimentos com IG baixo são preferíveis para diabéticos.'
      },
      {
        type: 'list',
        content: [
          'IG Baixo (≤55): feijão, lentilha, maçã, aveia, iogurte natural',
          'IG Médio (56-69): banana, batata doce, arroz integral',
          'IG Alto (≥70): pão branco, batata, melancia, açúcar'
        ]
      },
      {
        type: 'tip',
        content: '💡 Dica prática: Combine alimentos de IG alto com fibras ou proteínas para reduzir o impacto na glicemia. Ex: banana com aveia.',
        icon: '💡'
      },
      {
        type: 'subtitle',
        content: 'Construindo o Prato Ideal'
      },
      {
        type: 'paragraph',
        content: 'O método do prato é uma forma simples de balancear as refeições:'
      },
      {
        type: 'list',
        content: [
          '1/2 do prato: vegetais não amiláceos (folhas, brócolis, tomate)',
          '1/4 do prato: proteína magra (frango, peixe, ovos, leguminosas)',
          '1/4 do prato: carboidratos complexos (arroz integral, quinoa)',
          'Adicione: gorduras boas (azeite, abacate, castanhas)'
        ]
      },
      {
        type: 'example',
        content: 'Exemplo de prato balanceado: Salada verde com tomate e pepino (1/2 prato) + peito de frango grelhado (1/4 prato) + arroz integral (1/4 prato) + azeite extra virgem.'
      },
      {
        type: 'subtitle',
        content: 'Mitos e Verdades sobre Açúcar'
      },
      {
        type: 'paragraph',
        content: 'Vamos esclarecer algumas dúvidas comuns sobre o consumo de açúcar:'
      },
      {
        type: 'list',
        content: [
          'MITO: Diabéticos não podem comer nenhum doce',
          'VERDADE: Podem consumir ocasionalmente, com moderação e planejamento',
          'MITO: Açúcar mascavo é liberado para diabéticos',
          'VERDADE: Todos os tipos de açúcar elevam a glicemia',
          'MITO: Frutas são proibidas por conter açúcar',
          'VERDADE: Frutas são permitidas, mas com controle de porção'
        ]
      },
      {
        type: 'subtitle',
        content: 'Adoçantes: Como Escolher'
      },
      {
        type: 'paragraph',
        content: 'Os adoçantes podem ser aliados no controle do diabetes:'
      },
      {
        type: 'list',
        content: [
          'Naturais: stevia, xilitol, eritritol',
          'Artificiais: aspartame, sucralose, acessulfame-K',
          'Vantagens: não elevam a glicemia, baixas calorias',
          'Cuidados: alguns podem causar desconforto intestinal',
          'Recomendação: varie os tipos e use com moderação'
        ]
      },
      {
        type: 'warning',
        content: '⚠️ Atenção: Produtos "diet" podem conter carboidratos. Sempre leia os rótulos e considere o impacto total na glicemia.',
        icon: '⚠️'
      },
      {
        type: 'subtitle',
        content: 'Planejamento de Refeições'
      },
      {
        type: 'paragraph',
        content: 'O planejamento é essencial para manter o controle glicêmico:'
      },
      {
        type: 'list',
        content: [
          'Faça 5-6 refeições pequenas por dia',
          'Mantenha horários regulares',
          'Prepare lanches saudáveis antecipadamente',
          'Tenha sempre opções de emergência',
          'Planeje as refeições da semana',
          'Faça uma lista de compras baseada no planejamento'
        ]
      },
      {
        type: 'tip',
        content: '💡 Organização: Dedique um tempo no fim de semana para planejar e preparar refeições. Isso facilita as escolhas saudáveis durante a semana.',
        icon: '💡'
      }
    ]
  },
  {
    id: 5,
    title: 'Exercícios e Atividade Física',
    pages: '76-90',
    content: [
      {
        type: 'title',
        content: 'Capítulo 5: Exercícios e Atividade Física'
      },
      {
        type: 'paragraph',
        content: 'A atividade física regular é fundamental no tratamento do diabetes. Ela melhora a sensibilidade à insulina, ajuda no controle da glicemia, reduz o risco cardiovascular e melhora a qualidade de vida.'
      },
      {
        type: 'subtitle',
        content: 'Benefícios dos Exercícios para Diabéticos'
      },
      {
        type: 'list',
        content: [
          'Melhora a captação de glicose pelas células',
          'Aumenta a sensibilidade à insulina',
          'Reduz a glicemia de jejum e pós-prandial',
          'Diminui a hemoglobina glicada (HbA1c)',
          'Controla o peso corporal',
          'Reduz a pressão arterial',
          'Melhora o perfil lipídico',
          'Fortalece o sistema cardiovascular',
          'Reduz o estresse e melhora o humor'
        ]
      },
      {
        type: 'subtitle',
        content: 'Tipos de Exercícios Recomendados'
      },
      {
        type: 'paragraph',
        content: 'Diferentes tipos de exercícios oferecem benefícios específicos:'
      },
      {
        type: 'list',
        content: [
          'Aeróbicos: caminhada, natação, ciclismo, dança',
          'Resistência: musculação, exercícios com peso corporal',
          'Flexibilidade: alongamento, yoga, pilates',
          'Funcionais: atividades do dia a dia, jardinagem'
        ]
      },
      {
        type: 'subtitle',
        content: 'Exercícios Aeróbicos'
      },
      {
        type: 'paragraph',
        content: 'Os exercícios aeróbicos são especialmente benéficos para diabéticos:'
      },
      {
        type: 'list',
        content: [
          'Frequência: 5 dias por semana, mínimo',
          'Duração: 30-60 minutos por sessão',
          'Intensidade: moderada (consegue conversar durante)',
          'Exemplos seguros: caminhada rápida, natação, bicicleta',
          'Progressão: aumente gradualmente tempo e intensidade'
        ]
      },
      {
        type: 'example',
        content: 'Exemplo de progressão: Semana 1-2: 15 min de caminhada; Semana 3-4: 20 min; Semana 5-6: 30 min; Semana 7+: 45-60 min.'
      },
      {
        type: 'subtitle',
        content: 'Exercícios de Resistência'
      },
      {
        type: 'paragraph',
        content: 'O treinamento de força complementa os exercícios aeróbicos:'
      },
      {
        type: 'list',
        content: [
          'Frequência: 2-3 vezes por semana',
          'Grupos musculares: trabalhe todos os principais',
          'Séries: 2-3 séries de 8-12 repetições',
          'Descanso: 48h entre treinos do mesmo grupo muscular',
          'Progressão: aumente peso/resistência gradualmente'
        ]
      },
      {
        type: 'subtitle',
        content: 'Cuidados Especiais'
      },
      {
        type: 'paragraph',
        content: 'Diabéticos devem tomar precauções especiais ao se exercitar:'
      },
      {
        type: 'list',
        content: [
          'Meça a glicemia antes, durante e após exercícios longos',
          'Tenha sempre carboidratos de ação rápida disponíveis',
          'Use calçados adequados e verifique os pés após exercícios',
          'Hidrate-se bem antes, durante e após a atividade',
          'Evite exercícios se glicemia >250 mg/dL ou <100 mg/dL',
          'Informe instrutores sobre sua condição'
        ]
      },
      {
        type: 'warning',
        content: '⚠️ Importante: Se você tem complicações do diabetes (retinopatia, neuropatia, nefropatia), consulte seu médico antes de iniciar exercícios.',
        icon: '⚠️'
      },
      {
        type: 'subtitle',
        content: 'Exercícios por Faixa Etária'
      },
      {
        type: 'paragraph',
        content: 'As recomendações variam conforme a idade:'
      },
      {
        type: 'list',
        content: [
          'Jovens (18-30 anos): podem fazer exercícios mais intensos',
          'Adultos (31-50 anos): foco em exercícios regulares e consistentes',
          'Maduros (51-65 anos): ênfase em exercícios de baixo impacto',
          'Idosos (65+ anos): priorizar segurança e exercícios funcionais'
        ]
      },
      {
        type: 'subtitle',
        content: 'Hipoglicemia Durante Exercícios'
      },
      {
        type: 'paragraph',
        content: 'A hipoglicemia pode ocorrer durante ou após exercícios:'
      },
      {
        type: 'list',
        content: [
          'Sintomas: tremor, suor, tontura, fraqueza, confusão',
          'Prevenção: monitore glicemia e ajuste medicação/alimentação',
          'Tratamento: pare o exercício e consuma 15g de carboidrato',
          'Exemplos: 1 copo de suco, 3-4 balas, 1 colher de mel',
          'Aguarde 15 min e meça novamente a glicemia'
        ]
      },
      {
        type: 'tip',
        content: '💡 Regra dos 15: Para hipoglicemia, consuma 15g de carboidrato, aguarde 15 minutos, meça a glicemia. Repita se necessário.',
        icon: '💡'
      },
      {
        type: 'subtitle',
        content: 'Criando uma Rotina Sustentável'
      },
      {
        type: 'list',
        content: [
          'Escolha atividades que você goste',
          'Comece devagar e progrida gradualmente',
          'Estabeleça metas realistas e alcançáveis',
          'Varie os tipos de exercício para evitar monotonia',
          'Encontre um parceiro de exercícios',
          'Registre seu progresso',
          'Celebre suas conquistas'
        ]
      },
      {
        type: 'example',
        content: 'Exemplo de rotina semanal: Segunda/Quarta/Sexta - 30 min de caminhada; Terça/Quinta - 20 min de exercícios de resistência; Sábado - atividade recreativa (dança, jardinagem); Domingo - descanso ativo (alongamento).'
      }
    ]
  }
];