/**
 * Configurações e constantes da aplicação
 */

// Configurações da API
export const API_CONFIG = {
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbxBOyU1-CxIpSqHJW94imrkMctg8WrbO7w8ZnWBmlyVRz53KaNklmyPbBVIdyluI246/exec',
    FETCH_INTERVAL: 300000, // 5 minutos
    // timeout em ms para requisições externas (ex: Google Apps Script)
    REQUEST_TIMEOUT: 10000, // 10s
    // número máximo de tentativas em caso de falha de fetch
    REQUEST_RETRIES: 2,
    UPDATE_INTERVAL: 1000,   // 1 segundo
    RENDER_INTERVAL: 60000   // 1 minuto
};

// Configurações de som
export const SOUND_CONFIG = {
    TYPES: {
        beep: { frequencies: [800], durations: [200] },
        chime: { frequencies: [523, 659, 784], durations: [150, 150, 300] },
        alert: { frequencies: [1000, 800, 1000], durations: [100, 100, 200] },
        bell: { frequencies: [400, 500, 600, 500, 400], durations: [150, 150, 150, 150, 200] },
        horn: { frequencies: [300, 350, 400], durations: [300, 300, 400] },
        whistle: { frequencies: [1200, 1400, 1200], durations: [100, 200, 150] }
    },
    DEFAULT_VOLUME: 0.5,
    DEFAULT_TYPE: 'beep'
};

// Dados das builds de personagens
export const BUILDS_DATA = [
    { nome: "Arqueira", emoji: "🏹", builds: [ { tipo: "Pure", descricao: "foco em agilidade e dano", status: { forca: "125 (Armadura Extrema) ou 132 (Armadura Nox Khan)", inteligencia: "Set Priston ou 64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "100 (Arco Abissal)", agilidade: "Resto", vitalidade: "Base" } }, { tipo: "Semi-Pure", descricao: "build equilibrada", status: { forca: "198 (Armadura Verus)", inteligencia: "Set Priston ou 64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "100 (Arco Abissal)", agilidade: "Resto", vitalidade: "Base" } }, { tipo: "Híbrida", descricao: "foco em resistência", status: { forca: "273 (Armadura Abissal)", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "100 (Arco Abissal)", agilidade: "Resto", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Arqueira", habilidades: [ { label: "Falcão Vigia", value: 10 }, { label: "Mestra do Tir", value: 10 }, { label: "Flesha de Vent", value: 1 }, { label: "Mira Perfeito", value: 1 } ] }, { tier: 2, nome: "Mestra da Caça", habilidades: [ { label: "Olho de Dion", value: 10 }, { label: "Falcão Espiritual", value: 10 }, { label: "Flecha da Fúria", value: 1 }, { label: "Avalanche", value: 1 } ] }, { tier: 3, nome: "Discípula de Dion", habilidades: [ { label: "Tiro Elemental", value: 1 }, { label: "Falcão Dourado", value: 10 }, { label: "Tiro Explosivo", value: 1 }, { label: "Perfuração", value: 1 } ] }, { tier: 4, nome: "Sagitária", habilidades: [ { label: "Invocar Wolverine", value: "(o que sobrar)" }, { label: "Mestra Sagitária", value: 10 }, { label: "Tiro Fênix", value: 10 }, { label: "Força da Natureza", value: 10 } ] }, { tier: 5, nome: "Guerreira Fênix", habilidades: [ { label: "Tiro Evasivo: 10 (o que sobrar)", value: 10 }, { label: "Trovão Roop: 10", value: 10 }, { label: "Respingo da Natureza", value: 1 }, { label: "Armadilha Espiral", value: "8 (10 tem delay)" } ] } ] },
    { nome: "Assassina", emoji: "⚔️", builds: [ { tipo: "Normal", descricao: "Foco em força", status: { forca: "Resto", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Adaga Abissal) ", agilidade: "84", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Assassina", habilidades: [ { label: "Ferrão", value: 1 }, { label: "Ataque Duplo", value: 1 }, { label: "Maestria em Adagas", value: 10 }, { label: "Wisp", value: 10 } ] }, { tier: 2, nome: "Trapaceira", habilidades: [ { label: "Presa Venenosa", value: 10 }, { label: "Alas", value: 10 }, { label: "Choque na Alma", value: 10 }, { label: "Maestria no Ataque", value: 10 } ] }, { tier: 3, nome: "Sombra", habilidades: [ { label: "Adaga Dolorida", value: "(o que sobrar)" }, { label: "Espancamento", value: 1 }, { label: "Inpes", value: 10 }, { label: "Sombria", value: 10 } ] }, { tier: 4, nome: "Andarilha das Sombras", habilidades: [ { label: "Vento Gelado: 1", value: 1 }, { label: "Maestria Fatal: 10", value: 10 }, { label: "Poluir: 10", value: 10 }, { label: "Sombra Ninja: 1", value: 1 } ] }, { tier: 5, nome: "Senhora das Sombras", habilidades: [ { label: "Bombástica", value: 1 }, { label: "Golpe Crescente", value: 10 }, { label: "Violência", value: 10 }, { label: "Tempestade", value: 10 } ] } ] },
    { nome: "Atalanta", emoji: "🔱", builds: [ { tipo: "Pure", descricao: "foco em agilidade e dano", status: { forca: "125 (Armadura Extrema) ou 132 (Armadura Nox Khan)", inteligencia: "Set Priston ou 64 (Set Boss 2 - Shy e Tulla)", talento: "110 (Lança Abissal)", agilidade: "Resto", vitalidade: "Base" } }, { tipo: "Semi-Pure", descricao: "build equilibrada", status: { forca: "198 (Armadura Verus AS+)", inteligencia: "Set Priston ou 64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Lança Abissal)", agilidade: "Resto", vitalidade: "Base" } }, { tipo: "Híbrida", descricao: "foco em resistência", status: { forca: "273 (Armadura Abissal AS+)", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Lança Abissal)", agilidade: "Resto", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Atalanta", habilidades: [ { label: "Golpe do Escudo", value: 10 }, { label: "Farina", value: 10 }, { label: "Mestra do Arremesso", value: 10 }, { label: "Lança Gigante", value: 1 } ] }, { tier: 2, nome: "Valquíria", habilidades: [ { label: "Windy", value: 10 }, { label: "Lança Giratória", value: 1 }, { label: "Ladrão de Almas", value: 10 }, { label: "Lança de Fogo", value: 1 } ] }, { tier: 3, nome: "Brynhild", habilidades: [ { label: "Lança Partida", value: 10 }, { label: "Triunfo de Valhalla", value: 10 }, { label: "Lança de Raios", value: 1 }, { label: "Chuva de Lanças", value: 1 } ] }, { tier: 4, nome: "Valhala", habilidades: [ { label: "Inferno de Valhalla", value: 10 }, { label: "Fúria-X", value: 1 }, { label: "Lança de Gelo", value: 10 }, { label: "Vingança", value: 10 } ] }, { tier: 5, nome: "Rainha da Valhala", habilidades: [ { label: "Talaria", value: 10 }, { label: "Golpe Galaxial", value: 7 }, { label: "Invocar Arcuda", value: "(o que sobrar)" }, { label: "Medo", value: 10 } ] } ] },
    { nome: "Cavaleiro", emoji: "🛡️", builds: [ { tipo: "Normal", descricao: "Foco em força", status: { forca: "Resto", inteligencia: "68 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "115 (Espada Abissal)", agilidade: "79", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Cavaleiro", habilidades: [ { label: "Rajada Sagrada", value: 1 }, { label: "Corpo Sagrado", value: 10 }, { label: "Treinamento Físico", value: 10 }, { label: "Golpe Duplo", value: 1 } ] }, { tier: 2, nome: "Paladino", habilidades: [ { label: "Valor Sagrado", value: 10 }, { label: "Brandish", value: 10 }, { label: "Piercing", value: 1 }, { label: "Espírito Drástico", value: 10 } ] }, { tier: 3, nome: "Cavaleiro Divino", habilidades: [ { label: "Mestre da Espada", value: 10 }, { label: "Escudo Divino", value: 10 }, { label: "Encantamento Sagrado", value: 10 }, { label: "Grande Cruzada", value: 10 } ] }, { tier: 4, nome: "Cavaleiro Santo", habilidades: [ { label: "Espada da Justiça", value: 1 }, { label: "Escudo dos Deuses", value: 10 }, { label: "Bênção Divina", value: 10 }, { label: "Piercing Divino", value: 10 } ] }, { tier: 5, nome: "Cavaleiro Lendário", habilidades: [ { label: "Quebra Alma", value: 10 }, { label: "Lua Crescente", value: 10 }, { label: "Espada Sagrada", value: 10 }, { label: "Sagrado Benedito", value: 10 } ] } ] },
    { nome: "Guerreira", emoji: "🥊", builds: [ { tipo: "Normal", descricao: "Foco em força", status: { forca: "Resto", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Machado Abissal)", agilidade: "84", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Guerreira", habilidades: [ { label: "Chute Baixo", value: "(o que sobrar)" }, { label: "Maestria em Força", value: 10 }, { label: "Golpe Duplo", value: 1 }, { label: "Hiper Direto", value: 1 } ] }, { tier: 2, nome: "Nocauteadora", habilidades: [ { label: "Enfurecer", value: 10 }, { label: "Patriota", value: "(o que sobrar)" }, { label: "Cutovelada Veloz", value: 1 }, { label: "Maestria em Resistência", value: 10 } ] }, { tier: 3, nome: "Gladiadora", habilidades: [ { label: "Força Instantânea", value: 10 }, { label: "Canhão Tigre", value: 10 }, { label: "Grito de Guerra", value: 10 }, { label: "Chute Aéreo", value: 10 } ] }, { tier: 4, nome: "Expert", habilidades: [ { label: "Combinação", value: 10 }, { label: "Força Metálica", value: 10 }, { label: "Obstrução", value: 1 }, { label: "Tufão", value: 10 } ] }, { tier: 5, nome: "Mestra", habilidades: [ { label: "Maestria no Ataque", value: 10 }, { label: "Falcão Caçador", value: 9 }, { label: "Quebra de Linha", value: 7 }, { label: "Treinamento Árduo", value: 10 } ] } ] },
    { nome: "Lutador", emoji: "🪓", builds: [ { tipo: "Normal", descricao: "Foco em força", status: { forca: "Resto", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Machado Abissal)", agilidade: "80", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Lutador", habilidades: [ { label: "Mestre das Armas", value: 10 }, { label: "Resistência a Fogo", value: 10 }, { label: "Raiva", value: 1 }, { label: "Impacto", value: 1 } ] }, { tier: 2, nome: "Guerreiro", habilidades: [ { label: "Impacto Triplo", value: "(o que sobrar)" }, { label: "Girada Brutal", value: "(o que sobrar)" }, { label: "Rugido", value: 6 }, { label: "Furia de Zecram", value: 1 } ] }, { tier: 3, nome: "Campeão", habilidades: [ { label: "Concentração", value: 10 }, { label: "Golpe da Vingança", value: 1 }, { label: "Machado Veloz", value: 10 }, { label: "Quebra Ossos", value: "(o que sobrar)" } ] }, { tier: 4, nome: "Guerreiro Imortal", habilidades: [ { label: "Destroyer", value: 10 }, { label: "Fúria", value: 10 }, { label: "Golpe Giratório", value: 1 }, { label: "Bônus de Vitalidade", value: 10 } ] }, { tier: 5, nome: "Senhor da Guerra", habilidades: [ { label: "Golpe Baixo", value: 7 }, { label: "Colisão", value: 10 }, { label: "Golpe Mortal", value: 7 }, { label: "Fúria Sangrenta", value: 10 } ] } ] },
    { nome: "Mago", emoji: "🔮", builds: [ { tipo: "Normal", descricao: "Foco em inteligência", status: { forca: "79", inteligencia: "Resto", talento: "95 (Cajado Abissal)", agilidade: "81", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Mago", habilidades: [ { label: "Agonia", value: "4 ou 10" }, { label: "Fagulha", value: 1 }, { label: "Zenith", value: 10 }, { label: "Bola de Fogo", value: 1 } ] }, { tier: 2, nome: "Feiticeiro", habilidades: [ { label: "Mestre da Mente", value: 10 }, { label: "Wartornado", value: "(o que sobrar)" }, { label: "Encanto", value: 10 }, { label: "Raio da Morte", value: 10 } ] }, { tier: 3, nome: "Feiticeiro Real", habilidades: [ { label: "Escudo Energético", value: 10 }, { label: "Terremoto", value: 1 }, { label: "Espírito Elemental", value: 10 }, { label: "Espada Dancante", value: 10 } ] }, { tier: 4, nome: "Mago Arcano", habilidades: [ { label: "Chama Elemental", value: "(o que sobrar)" }, { label: "Ondas de Fogo", value: 1 }, { label: "Distorção", value: 10 }, { label: "Meteoro", value: 10 } ] }, { tier: 5, nome: "Mestre Elemental", habilidades: [ { label: "Silraphim", value: 10 }, { label: "Vis Tenus", value: 10 }, { label: "Prima Ignis", value: 10 }, { label: "Third Anima", value: 10 } ] } ] },
    { nome: "Mecânico", emoji: "🔧", builds: [ { tipo: "Normal", descricao: "Foco em força", status: { forca: "Resto", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Garra Abissal) ou (Martelo Abissal)", agilidade: "78", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Mecânico", habilidades: [ { label: "Escudo Extremo", value: 10 }, { label: "Bomba Mecânica", value: 1 }, { label: "Resistência a Veneno", value: 10 }, { label: "Absorção Física", value: 10 } ] }, { tier: 2, nome: "Mestre Mecânico", habilidades: [ { label: "Grande Golpe", value: "(o que sobrar)" }, { label: "Mestre da Automação", value: 1 }, { label: "Automação", value: 1 }, { label: "Spark", value: "(o que sobrar)" } ] }, { tier: 3, nome: "Lider Mecânico", habilidades: [ { label: "Armadura Metálica: 10", value: 10 }, { label: "Golpe Grandioso: 10", value: 10 }, { label: "Mestre dos Mecânicos: 10", value: 10 }, { label: "Escudo Espinhoso: 10", value: 10 } ] }, { tier: 4, nome: "Metaleiro", habilidades: [ { label: "Impulso", value: 1 }, { label: "Implosão", value: 10 }, { label: "Esfera Magnética", value: 10 }, { label: "Golem de Metal", value: "(o que sobrar)" } ] }, { tier: 5, nome: "Fúria de Metal", habilidades: [ { label: "Mina Terrestre: 8", value: 8 }, { label: "Hipersônico: 10", value: 10 }, { label: "Ciclone: 8", value: 8 }, { label: "Encanto Poderoso: 10", value: 10 } ] } ] },
    { nome: "Sacerdotiza", emoji: "🔮", builds: [ { tipo: "Normal", descricao: "Foco em inteligência", status: { forca: "80", inteligencia: "Resto", talento: "94 (Cajado Abissal)", agilidade: "80", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Sacerdotisa", habilidades: [ { label: "Cura", value: 1 }, { label: "Fagulha Sagrada", value: 1 }, { label: "Espinhos Múltiplos", value: 1 }, { label: "Feitiço Divino", value: 10 } ] }, { tier: 2, nome: "Santa", habilidades: [ { label: "Meditação", value: 10 }, { label: "Raios Divinos", value: 1 }, { label: "Reflexão Divina", value: 10 }, { label: "Cura Máxima", value: 10 } ] }, { tier: 3, nome: "Episcopisa", habilidades: [ { label: "Esfera de Vigor: 10", value: 10 }, { label: "Ressurreição", value: "(o que sobrar)" }, { label: "Extinção", value: 10 }, { label: "HP Virtual", value: 10 } ] }, { tier: 4, nome: "Celestial", habilidades: [ { label: "Espinhos Glaciais", value: 10 }, { label: "Benção Celestial", value: 10 }, { label: "Raios Contínuos", value: 1 }, { label: "Invocar Muspell", value: 10 } ] }, { tier: 5, nome: "Arcanjo", habilidades: [ { label: "Impacto Espiritual", value: 10 }, { label: "Gelo Perfurante", value: 10 }, { label: "Invocar Ramiel", value: 10 }, { label: "Benção de Krishna", value: 10 } ] } ] },
    { nome: "Pike", emoji: "🗡️", builds: [ { tipo: "Normal", descricao: "Foco em força", status: { forca: "Resto", inteligencia: "64 (Set Boss 2 - Shy e Tulla) ou 76 (Set Yag)", talento: "110 (Foice Abissal)", agilidade: "76", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Pike", habilidades: [ { label: "Sopro Afiado", value: 10 }, { label: "Resistência a Gelo", value: 10 }, { label: "Ataque crítico", value: 10 }, { label: "Pulo Fatal", value: 10 } ] }, { tier: 2, nome: "Combatente", habilidades: [ { label: "Espinhos de Gelo", value: 10 }, { label: "Tornado", value: 10 }, { label: "Maestria em Bloqueio", value: 10 }, { label: "Expansão", value: "5 (sem delay)" } ] }, { tier: 3, nome: "Lançador", habilidades: [ { label: "Lanças Venenosas", value: 1 }, { label: "Desaparecer", value: 10 }, { label: "Mestre do ATQ Crítico", value: 10 }, { label: "Foice de Aço", value: 10 } ] }, { tier: 4, nome: "Lancelot", habilidades: [ { label: "Olho Assassino", value: 10 }, { label: "Golpe Carregado", value: 10 }, { label: "Furtivo", value: 10 }, { label: "Mestre das Sombras", value: 1 } ] }, { tier: 5, nome: "Mestre da Foice", habilidades: [ { label: "Ceifador Dançante", value: 10 }, { label: "Lança Final", value: 1 }, { label: "Amplificado", value: 10 }, { label: "Ataque Lateral", value: "10 (pvp) ou 5 (up)" } ] } ] },
    { nome: "Xamã", emoji: "🔮", builds: [ { tipo: "Normal", descricao: "Foco em inteligência", status: { forca: "79", inteligencia: "Resto", talento: "94 (Fantasma Abissal)", agilidade: "80", vitalidade: "Base" } } ], skills: [ { tier: 1, nome: "Xamã", habilidades: [ { label: "Raio Negro: 1", value: 1 }, { label: "Onda Negra: 1", value: 2 }, { label: "Maldição Preguiçosa: 10", value: 10 }, { label: "Paz Interior: 10", value: 10 } ] }, { tier: 2, nome: "Conjurador", habilidades: [ { label: "Labareda Espiritual", value: 1 }, { label: "Algemador", value: 1 }, { label: "Caçada", value: 10 }, { label: "Advento Migal", value: 10 } ] }, { tier: 3, nome: "Mestre Conjurador", habilidades: [ { label: "Chuva", value: 10 }, { label: "Fantasmaria", value: 1 }, { label: "Assombrar", value: 10 }, { label: "Arranhar", value: "(o que sobrar)" } ] }, { tier: 4, nome: "Coletor de Almas", habilidades: [ { label: "Chamar Cavaleiro Sanguinário", value: "(o que sobrar)" }, { label: "Julgamento", value: 1 }, { label: "Advento Midranda", value: 10 }, { label: "Manhã de Oração", value: 1 } ] }, { tier: 5, nome: "Senhor das Almas", habilidades: [ { label: "Crença", value: 10 }, { label: "Força Divina", value: 10 }, { label: "Prego Fantasmagórico", value: 9 }, { label: "Vida Divina", value: 10 } ] } ] }
];

// Dados dos bosses
export const BOSSES_DATA = [
    {
        nome: "Babel", 
        local: "Estrada de Ferro do Caos (Iron 1)", 
        horarios: [0, 3, 6, 9, 12, 15, 18, 21],
        drop: ["Itens do mapa, Essência do Babel e Receita de Relíquias (0,60% de chance)."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_babel.webp",
        spaw : "img/bosses/maps/estrada-de-ferro-do-caos.png",
        lvl : 100
    },
    {
        nome: "Babel", 
        local: "Coração de Perum (Iron 2)", 
        horarios: [1, 4, 7, 10, 13, 16, 19, 22],
        drop: ["Itens do mapa, Essência do Babel e Receita de Relíquias (0,60% de chance)."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_babel.webp",
        spaw : "img/bosses/maps/coracao-de-perum.png",
        lvl : 100
    },
    {
        nome: "Fúria", 
        local: "Templo Maldito - 3° Andar (S3)", 
        horarios: [2, 5, 8, 11, 14, 17, 20, 23],
        drop: ["Itens do mapa, Essência do Fúria e Receita de Relíquias (1,20% de chance)."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_furia.webp",
        spaw : "img/bosses/maps/templo-maldito-3.png",
        lvl : 105
    },
    {
        nome: "Valento", 
        local: "Vale Gallubia (ICE2)", 
        horarios: [1, 5, 9, 13, 17, 21],
        drop: ["Itens do mapa, Essência do Valento e Receita de Relíquias (1,60% de chance), e Anel do Valento 0,17% de Chance."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_valento.webp",
        spaw : "img/bosses/maps/vale-gallubia.png",
        lvl : 110
    },
    {
        nome: "Kelvezu", 
        local: "Covil do Kelvezu", 
        horarios: [1, 7, 13, 19],
        drop: ["Itens do mapa, Essência do Kelvezu e Receita de Relíquias (1,20% de chance), e Colar do Kelvezu 0,17% de Chance."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_kelvezu.webp",
        spaw : "img/bosses/maps/covil-do-kelvezu.png",
        lvl : 115
    },
    {
        nome: "Mokova", 
        local: "Templo Perdido (Lost 2)", 
        horarios: [2, 8, 14, 20],
        drop: ["Itens do mapa, Essência do Mokova e Botas do Mokova 0,14% de Chance."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_mokova.webp",
        spaw : "img/bosses/maps/templo-perdido.png",
        lvl : 120
    },
    {
        nome: "Shy", 
        local: "Torre Sem Fim 3° Andar (ET3)", 
        horarios: [7, 15, 23],
        drop: ["Itens do mapa, Essência do Shy e Receita de Relíquias (1,60% de chance), e Anel Shy 0,14% de Chance."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_shy.webp",
        spaw : "img/bosses/maps/torre-sem-fim-3-andar.png",
        lvl : 125
    },
    {
        nome: "Tulla", 
        local: "Mina de Gelo (Mina)", 
        horarios: [4, 12, 20],
        drop: ["Itens do mapa, Essência do Tulla e Receita de Relíquias (1,60% de chance), e Amuleto Tulla 0,14% de Chance."],
        dano1: ["Não tem roleta"], 
        dano2: ["Não tem roleta"], 
        dano3: ["Não tem roleta"],
        img: "img/bosses/miniaturas/mini_tulla.webp",
        spaw : "img/bosses/maps/mina-de-gelo.png",
        lvl : 130
    },
    {
        nome: "Draxos", 
        local: "Laboratório Secreto (Lab)", 
        horarios: [9, 19],
        drop: ["Itens do mapa, Essência do Draxos (2,40%), Receita de Relíquia (2,40%), Botas do Draxos 0,14% de Chance"],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Mokova, Shy ou Tulla) (5%)."],
        dano2: ["Pergaminho de Invocação do Draxos (10%), Runas Superiores (26%), Buff Especial (3H) (20%), Pergaminho de Invocação de Boss (Mokova, Shy ou Tulla) (15%), Itens de Ataque level 118 (17%), 33.766.200.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (10%)."],
        dano3: ["Pergaminho de Invocação do Draxos (10%), Caixa Priston (3H) (8%), Pergaminho de Invocação de Boss (Mokova, Shy ou Tulla) (15%), Itens de Defesa level 118 (21%), Itens de Ataque level 118 (21%), Essência do Draxos (5%), 41.496.000.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (10%)."],
        img: "img/bosses/miniaturas/mini_draxos.webp",
        spaw : "img/bosses/maps/laboratorio-secreto.png",
        lvl : 135
    },
    {
        nome: "Greedy", 
        local: "Arma Antiga (Arma)", 
        horarios: [10, 21],
        drop: ["Itens do mapa, Essência do Greedy e Receita de Relíquias (2,40% de chance), e Luvas do Greedy 0,14% de Chance."],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Mokova, Shy ou Tulla) (5%)."],
        dano2: ["Pergaminho de Invocação do Greedy (10%), Runas Superiores (26%), Buff Especial (3H) (20%), Pergaminho de Invocação de Boss (Tulla, Shy ou Draxos) (15%), Itens de Ataque level 123 (17%), 41.496.000.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (2%)."],
        dano3: ["Pergaminho de Invocação do Greedy (10%), Pergaminho de Invocação de Boss (Shy, Tulla ou Draxos) (15%), Essências do Aging (I), (A) ou (S) (10%), Itens de Defesa level 123 (21%), Itens de Ataque level 123 (21%), Caixa Priston (3H) (8%), Essência do Greedy (5%), ou 69.949.440.000 pontos de Experiência (5%)."],
        img: "img/bosses/miniaturas/mini_greedy.webp",
        spaw : "img/bosses/maps/arma-antiga.png",
        lvl : 140
    },
    {
        nome: "Espectro do<br>Midranda", 
        local: "Estrada Sombria (Estrada)", 
        horarios: [11, 19],
        drop: ["Itens do mapa, Receita de Relíquia"],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Greedy, Tulla ou Draxos) (5%)."],
        dano2: ["Pergaminho de Invocação Espectro do Midranda (10%), Runas Superiores (26%), Buff Especial (3H) (20%), Pergaminho de Invocação de Boss (Draxos, Tulla ou Greddy) (15%), Itens de Ataque level 130 (17%), 69.959.440.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (2%)."],
        dano3: ["Pergaminho de Invocação Espectro do Midranda (10%), Pergaminho de Invocação de Boss (Greedy, Tulla ou Draxos) (15%), Essências do Aging (I), (A) ou (S) (10%), Itens de Defesa level 130 (21%), Itens de Ataque level 130 (21%), Caixa Priston (3H) (8%), Essências do Babel, Fúria, Valento, Kelvezu, Mokova, Shy, Tulla, Draxos ou Greedy (5%), ou 84.779.847.000 pontos de Experiência (5%)."],
        img: "img/bosses/miniaturas/mini_espectro.webp",
        spaw : "img/bosses/maps/estrada-sombria.png",
        lvl : 150
    },
    {
        nome: "Yagditha", 
        local: "Abismo do Mar (AB1)", 
        horarios: [20],
        drop: ["Itens do mapa, Essência do Yagditha e Receita de Relíquias (3,69% de chance), Amuleto do Yagditha (Alfa, Beta, Gama e Zeta) (0,16% de chance) Amuleto do Yagditha."],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Greedy, Draxos ou Espectro do Midranda) (5%)."],
        dano2: ["Pergaminho de Invocação Espectro do Midranda (20%), Runas Superiores (26%), Buff Especial (3H) (15%), Pergaminho de Invocação de Boss (Draxos ou Greddy) (15%), Itens de Ataque level 140 (17%), 84.779.847.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (2%)."],
        dano3: ["Pergaminho de Invocação Espectro do Midranda (10%), Pergaminho de Invocação de Boss (Greedy ou Draxos) (15%), Essências do Aging (I), (A) ou (S) (15%), Itens de Defesa level 140 (21%), Itens de Ataque level 140 (21%), Caixa Priston (3H) (8%), Essências do Yagditha (5%), ou 135.933.805.500 pontos de Experiência (5%)."],
        img: "img/bosses/miniaturas/mini_yagditha.webp",
        spaw : "img/bosses/maps/abismo-do-mar.png",
        lvl : 160
    },
    {
        nome: "Dragão<br>Snowstorn", 
        local: "Abismo do Mar Congelado (AB2)", 
        horarios: [11, 22],
        drop: ["Itens do mapa"],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Greedy, Draxos ou Espectro do Midranda) (5%)."],
        dano2: ["Pergaminho de Invocação Espectro do Midranda (20%), Runas Superiores (26%), Buff Especial (3H) (15%), Pergaminho de Invocação de Boss (Draxos ou Greddy) (15%), Itens de Ataque level 140 (17%), 135.933.805.500 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (2%)."],
        dano3: ["Pergaminho de Invocação Espectro do Midranda (10%), Pergaminho de Invocação de Boss (Greedy ou Draxos) (15%), Essências do Aging (I), (A) ou (S) (15%), Itens de Defesa level 140 (21%), Itens de Ataque level 140 (21%), Caixa Priston (3H) (8%), Essências do Babel, Valento, Kelvezu, Fúria, Mokova, Tulla, Draxos, Greedy e Yagditha (5%), ou 150.878.802.000 pontos de Experiência (5%)."],
        img: "img/bosses/miniaturas/mini_snow.webp",
        spaw : "img/bosses/maps/abismo-do-mar-congelado.png",
        lvl : 160
    },
    {
        nome: "Midranda<br>Ressurgido", 
        local: "Santuário do Abismo (AB3)", 
        horarios: [19],
        drop: ["Itens do mapa, Essência do Midranda e Receita de Relíquias (4,80% de chance), e Brinco do Midranda (Alfa, Beta, Gama e Zeta. 0,16% de chance)."],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Greedy, Espectro do Midranda ou Yagditha) (5%)."],
        dano2: ["Pergaminho de Invocação Espectro do Midranda (20%), Runas Superiores (26%), Buff Especial (3H) (15%), Pergaminho de Invocação de Boss (Yagditha ou Greddy) (15%), Itens de Ataque level 140 (17%), 150.878.802.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (2%)."],
        dano3: ["Pergaminho de Invocação Espectro do Midranda (10%), Pergaminho de Invocação de Boss (Greedy ou Yagditha) (15%), Essências do Aging (I), (A) ou (S) (15%), Itens de Defesa level 140 (21%), Itens de Ataque level 140 (21%), Caixa Priston (3H) (8%), Essência do Midranda (5%), ou 199.600.125.000 pontos de Experiência (5%)."],
        img: "img/bosses/miniaturas/mini_midrandaress.webp",
        spaw : "img/bosses/maps/santuario-do-abismo.png",
        lvl : 180
    },
    // {
    //     nome: "Guardião<br>de Elite<br>(Evento)", 
    //     local: "Mais Frequentado Santuário do Abismo (AB1)<br><b>Outros Lugares:</b> AB3, Arma, Lab, Mina, Lost1, Ice2", 
    //     horarios: [11,22],
    //     drop: ["+531.925.821.428 de Experiência "],
    //     dano1: ["Não tem roleta"], 
    //     dano2: ["Abaixo de 360 de dano Não tem roleta acima +531.925.821.428 de Experiência "], 
    //     dano3: ["+531.925.821.428 de Experiência"],
    //     img: "img/bosses/miniaturas/mini_guardiao_elite.webp",
    //     spaw : "img/bosses/maps/abismo-do-mar-oposto.png",
    //     lvl : 200
    // }
    {
        nome: "Hopi de<br>Lacinho<br>(Evento)", 
        local: "Mais Frequentado Santuário do Abismo (AB1)<br><b>Outros Lugares:</b> AB3, Arma, Lab, Mina, Lost1, Ice2", 
        horarios: [5,9,15,20,23],
        drop: ["Saco da Sorte(LÁ ELE) "],
        dano1: ["Não tem roleta"], 
        dano2: ["Abaixo de 360 de dano somente Saco da Sorte(LÁ ELE) "], 
        dano3: ["2x Gravata"],
        img: "img/bosses/miniaturas/hopi_gravata.webp",
        spaw : "img/bosses/maps/abismo-do-mar-oposto.png",
        lvl : 200
    }
];

// Opções de filtros
export const FILTER_OPTIONS = [
    'all',
    'Receita de Relíquias',
    'Anel do Valento',
    'Colar do Kelvezu',
    'Botas do Mokova',
    'Anel Shy',
    'Amuleto Tulla',
    'Botas do Draxos',
    'Luvas do Greedy',
    'Amuleto do Yagditha'
];

// Configurações de perfil padrão
export const DEFAULT_PROFILE = {
    favoritesBosses: [],
    soundSettings: {
        enabled: false,
        type: 'beep',
        volume: 50,
        earlyWarning: false
    },
    notificationsEnabled: false,
    lastAccess: new Date().toISOString(),
    stats: {
        totalVisits: 0,
        favoritesCount: 0
    }
};

// Configurações de cache
export const CACHE_CONFIG = {
    SERVER_DATA_EXPIRY: 300000, // 5 minutos
    PROFILE_SAVE_DEBOUNCE: 1000  // 1 segundo
}; 