/**
 * Utilitários e funções auxiliares
 */

// Cache simples para otimização
const cache = new Map();

/**
 * Obtém a data/hora no fuso de São Paulo
 * @returns {Date} Data no fuso de São Paulo
 */
export function getSaoPauloDate() {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(now);

    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hour = parts.find(p => p.type === 'hour').value;
    const minute = parts.find(p => p.type === 'minute').value;
    const second = parts.find(p => p.type === 'second').value;

    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
}

/**
 * Formata a data/hora atual para exibição
 * @returns {string} Data formatada
 */
export function formatCurrentTime() {
    const now = getSaoPauloDate();
    const timeZone = 'America/Sao_Paulo';

    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(now);
    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hour = parts.find(p => p.type === 'hour').value;
    const minute = parts.find(p => p.type === 'minute').value;

    return `${year}-${month}-${day}  ${hour}:${minute}`;
}

/**
 * Debounce para limitar chamadas de função
 * @param {Function} func - Função a ser debounced
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle para limitar chamadas de função
 * @param {Function} func - Função a ser throttled
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função throttled
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Cache com expiração
 * @param {string} key - Chave do cache
 * @param {*} value - Valor a ser cacheado
 * @param {number} expiry - Tempo de expiração em ms
 */
export function setCache(key, value, expiry = 300000) {
    const item = {
        value,
        expiry: Date.now() + expiry
    };
    cache.set(key, item);
}

/**
 * Obtém item do cache se válido
 * @param {string} key - Chave do cache
 * @returns {*} Valor do cache ou null se expirado
 */
export function getCache(key) {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
    }
    
    return item.value;
}

/**
 * Limpa cache expirado
 */
export function clearExpiredCache() {
    const now = Date.now();
    for (const [key, item] of cache) {
        if (now > item.expiry) {
            cache.delete(key);
        }
    }
}

/**
 * Calcula a chance de drop de um item específico
 * @param {Object} boss - Objeto do boss
 * @param {string} dropItemName - Nome do item
 * @returns {number} Porcentagem de chance
 */
export function getDropChance(boss, dropItemName) {
    if (!boss.drop) return 0;
    const dropString = boss.drop.join(' ');
    const regex = new RegExp(`${dropItemName}\\s*\\(([^)]+)%`, 'i');
    const match = dropString.match(regex);
    if (match && match[1]) {
        const chance = parseFloat(match[1].replace(',', '.'));
        return isNaN(chance) ? 0 : chance;
    }
    return 0;
}

/**
 * Calcula o próximo horário de aparição de um boss
 * @param {Array} horarios - Array de horários do boss
 * @returns {number} Próximo horário (pode ser > 24 para próximo dia)
 */
export function getNextAppearance(horarios) {
    const now = getSaoPauloDate();
    const currentHour = now.getHours();
    const sortedHorarios = horarios.slice().sort((a, b) => a - b);
    
    for (const horario of sortedHorarios) {
        if (horario >= currentHour) {
            return horario;
        }
    }
    return sortedHorarios[0] + 24;
}

/**
 * Valida se uma string é um email válido
 * @param {string} email - Email para validar
 * @returns {boolean} True se válido
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Formata números grandes com separadores
 * @param {number} num - Número para formatar
 * @returns {string} Número formatado
 */
export function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
}

/**
 * Cria um elemento DOM com atributos
 * @param {string} tag - Tag do elemento
 * @param {Object} attributes - Atributos do elemento
 * @param {string} content - Conteúdo do elemento
 * @returns {HTMLElement} Elemento criado
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

/**
 * Seleciona elemento DOM com cache
 * @param {string} selector - Seletor CSS
 * @param {boolean} useCache - Se deve usar cache
 * @returns {HTMLElement|null} Elemento encontrado
 */
export function $(selector, useCache = true) {
    if (useCache) {
        const cached = getCache(`dom_${selector}`);
        if (cached) return cached;
    }
    
    const element = document.querySelector(selector);
    
    if (useCache && element) {
        setCache(`dom_${selector}`, element, 60000); // Cache por 1 minuto
    }
    
    return element;
}

/**
 * Seleciona múltiplos elementos DOM
 * @param {string} selector - Seletor CSS
 * @returns {NodeList} Lista de elementos
 */
export function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Adiciona event listener com cleanup automático
 * @param {HTMLElement|string} element - Elemento ou seletor
 * @param {string} event - Nome do evento
 * @param {Function} handler - Handler do evento
 * @param {Object} options - Opções do evento
 * @returns {Function} Função para remover o listener
 */
export function addEventListenerWithCleanup(element, event, handler, options = {}) {
    const el = typeof element === 'string' ? $(element) : element;
    if (!el) return () => {};
    
    el.addEventListener(event, handler, options);
    
    return () => el.removeEventListener(event, handler, options);
}

/**
 * Anima elemento com transição suave
 * @param {HTMLElement} element - Elemento para animar
 * @param {Object} properties - Propriedades CSS para animar
 * @param {number} duration - Duração em ms
 * @returns {Promise} Promise que resolve quando animação termina
 */
export function animateElement(element, properties, duration = 300) {
    return new Promise(resolve => {
        const startTime = performance.now();
        const startStyles = {};
        
        // Captura estilos iniciais
        Object.keys(properties).forEach(prop => {
            startStyles[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
        });
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Aplica interpolação linear
            Object.entries(properties).forEach(([prop, endValue]) => {
                const startValue = startStyles[prop];
                const currentValue = startValue + (endValue - startValue) * progress;
                element.style[prop] = currentValue + (prop.includes('opacity') ? '' : 'px');
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        requestAnimationFrame(animate);
    });
}

/**
 * Verifica se dispositivo é mobile
 * @returns {boolean} True se é mobile
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Verifica se dispositivo suporta notificações
 * @returns {boolean} True se suporta
 */
export function supportsNotifications() {
    return 'Notification' in window && 'serviceWorker' in navigator;
}

/**
 * Converte string para slug
 * @param {string} text - Texto para converter
 * @returns {string} Slug gerado
 */
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Inicialização de limpeza de cache
setInterval(clearExpiredCache, 60000); // A cada minuto 