/**
 * Configurações e constantes da aplicação
 */

// Configurações da API
export const API_CONFIG = {
    SHEET_URL: 'https://script.google.com/macros/s/AKfycbxBOyU1-CxIpSqHJW94imrkMctg8WrbO7w8ZnWBmlyVRz53KaNklmyPbBVIdyluI246/exec',
    FETCH_INTERVAL: 300000, // 5 minutos
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
        drop: ["Itens do mapa, Essência do Valento e Receita de Relíquias (1,60% de chance), e Anel do Valento (0,17% de Chance, e 0,19% no Omega)."],
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
        drop: ["Itens do mapa, Essência do Kelvezu e Receita de Relíquias (1,20% de chance), e Colar do Kelvezu (0,17% de Chance, e 0,19% no Omega)."],
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
        drop: ["Itens do mapa, Essência do Mokova e Botas do Mokova (0,14% de Chance, e 0,16% no Omega)."],
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
        drop: ["Itens do mapa, Essência do Shy e Receita de Relíquias (1,60% de chance), e Anel Shy (0,14% de Chance, e 0,16% no Omega)."],
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
        drop: ["Itens do mapa, Essência do Tulla e Receita de Relíquias (1,60% de chance), e Amuleto Tulla (0,14% de Chance, e 0,16% no Omega)."],
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
        drop: ["Itens do mapa, Essência do Draxos (2,40%), Receita de Relíquia (2,40%), Botas do Draxos (0,14% de Chance, e 0,16% no Omega)"],
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
        drop: ["Itens do mapa, Essência do Greedy e Receita de Relíquias (2,40% de chance), e Luvas do Greedy (0,14% de Chance, e 0,16% no Omega)."],
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
        drop: ["Itens do mapa, Essência do Yagditha e Receita de Relíquias (3,69% de chance), Amuleto do Yagditha (Alfa, Beta, Gama e Zeta) (0,16% de chance) Amuleto do Yagditha (Omega) (0,25% de chance)."],
        dano1: ["3x Sol (45%), 3x Meteoritos Idetas (12%), Runas Superiores (38%) ou Pergaminho de Invocação de Boss (Greedy, Draxos ou Espectro do Midranda) (5%)."],
        dano2: ["Pergaminho de Invocação Espectro do Midranda (20%), Runas Superiores (26%), Buff Especial (3H) (15%), Pergaminho de Invocação de Boss (Draxos ou Greddy) (15%), Itens de Ataque level 140 (17%), 84.779.847.000 pontos de Experiência (5%) ou Essências do Aging (I), (A) ou (S) (2%)."],
        dano3: ["Pergaminho de Invocação Espectro do Midranda (10%), Pergaminho de Invocação de Boss (Greedy ou Draxos) (15%), Essências do Aging (I), (A) ou (S) (15%), Itens de Defesa level 140 (21%), Itens de Ataque level 140 (21%), Caixa Priston (3H) (8%), Essências do Yagditha (5%), ou 135.933.805.500 pontos de Experiência (5%)."],
        img: "img/bosses/miniaturas/mini_yagditha.webp",
        spaw : "img/bosses/maps/abismo-do-mar.png",
        lvl : 160
    },
    {
        nome: "Dragão Snowstorn", 
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
    {
        nome: "Guardião de Elite <br>(Evento)", 
        local: "Mais Frequentado Santuário do Abismo (AB1)<br><b>Outros Lugares:</b> AB3, Arma, Lab, Mina, Lost1, Ice2", 
        horarios: [11,22],
        drop: ["+531.925.821.428 de Experiência "],
        dano1: ["Não tem roleta"], 
        dano2: ["Abaixo de 360 de dano Não tem roleta acima +531.925.821.428 de Experiência "], 
        dano3: ["+531.925.821.428 de Experiência"],
        img: "img/bosses/miniaturas/mini_guardiao_elite.webp",
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