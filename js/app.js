/**
 * Aplicação principal - Integração de todos os módulos
 */

import { API_CONFIG, BOSSES_DATA } from './config.js';
import { getSaoPauloDate, formatCurrentTime, debounce, $, throttle } from './utils.js';
import { storageManager } from './storage.js';
import { soundManager } from './sound-manager.js';

class AppManager {
    constructor() {
        this.serverTimesData = [];
        this.serverDataLoaded = false;
    this.lastNotifiedBosses = {}; // Armazena status de notificação por bossKey
    this._lastBossKey = null;
    this._lastBossTimeToNext = null;
        this.userProfile = null;
    this.showOnlyFavorites = false;
    this.notifyOnlyFavorites = false;

        // this.initializeApp(); // Inicialização movida para main.js
    }

    /**
     * Inicializa a aplicação
     */
    async initializeApp() {
        console.log('🚀 Inicializando aplicação...');

        // Carrega perfil do usuário
        this.loadProfile();

        // Inicializa sistemas básicos
        this.initializeBasicSystems();

        // Carrega dados dos servidores
        await this.fetchServerTimes();

        // Inicializa timers e eventos
        this.initializeTimersAndEvents();

        // Inicializa sistema de abas
        this.initializeTabSystem();

        // Inicializa sistema de loteria
        this.initializeLottery();

        // Inicializa PWA
        this.initializePWA();

        console.log('✅ Aplicação inicializada com sucesso');
    }

    /**
     * Carrega perfil do usuário
     */
    loadProfile() {
        this.userProfile = storageManager.loadProfile();
        console.log('📁 Perfil carregado:', this.userProfile);

        // Atualiza estatísticas
        this.userProfile.stats.totalVisits++;
        this.userProfile.lastAccess = getSaoPauloDate().toISOString();

        // Carrega configurações de som
        soundManager.loadSettings(this.userProfile.soundSettings);

        // Atualiza interface
        this.updateProfileDisplay();

        // Salva perfil atualizado
        this.saveProfile();

        // Carrega opção de notificação apenas favoritos
        if (typeof this.userProfile.notifyOnlyFavorites === 'undefined') {
            this.userProfile.notifyOnlyFavorites = false;
        }
        this.notifyOnlyFavorites = this.userProfile.notifyOnlyFavorites;
    }

    /**
     * Salva perfil do usuário
     */
    saveProfile() {
    this.userProfile.notifyOnlyFavorites = this.notifyOnlyFavorites;
    storageManager.saveProfile(this.userProfile);
    }

    /**
     * Inicializa sistemas básicos
     */
    initializeBasicSystems() {
        // Atualiza tempo
        this.updateTimeDisplay();

        // Renderiza bosses
        this.renderBosses();

        // Gera opções de horário dinamicamente
        this.generateTimeFilterOptions();

        // Inicializa event listeners
        this.initializeEventListeners();
    }

    /**
     * Gera opções de filtro de horário
     */
    generateTimeFilterOptions() {
        const timeFilterSelect = $('#time-filter-select');
        if (timeFilterSelect && timeFilterSelect.children.length <= 1) {
            // Só gera se ainda não foi gerado (evita duplicação)
            for (let i = 0; i < 24; i++) {
                const hour = String(i).padStart(2, '0');
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${hour}hXX`;
                timeFilterSelect.appendChild(option);
            }
            console.log('✅ Opções de filtro de horário geradas dinamicamente');
        }
    }

    /**
     * Inicializa event listeners
     */
    initializeEventListeners() {
        // Filtros de boss
        const filterSelect = $('#filter-select');
        const timeFilterSelect = $('#time-filter-select');
        const sortSelect = $('#sort-select');

        if (filterSelect) filterSelect.addEventListener('change', () => this.renderBosses());
        if (timeFilterSelect) timeFilterSelect.addEventListener('change', () => this.renderBosses());
        if (sortSelect) sortSelect.addEventListener('change', () => this.renderBosses());

        // Scroll behavior para timer
        window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 100));

        // Cleanup na saída
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    /**
     * Inicializa timers e intervalos
     */
    initializeTimersAndEvents() {
        // Timers principais
        setInterval(() => this.updateCountdownTimer(), API_CONFIG.UPDATE_INTERVAL);
        setInterval(() => this.renderBosses(), API_CONFIG.RENDER_INTERVAL);
        setInterval(() => this.updateTimeDisplay(), API_CONFIG.UPDATE_INTERVAL);

        // Re-fetch de dados do servidor
        setInterval(() => this.fetchServerTimes(), API_CONFIG.FETCH_INTERVAL);
    }

    /**
     * Busca dados dos servidores
     */
    async fetchServerTimes() {
        try {
            console.log('🔄 Carregando dados dos servidores...');
            this.serverDataLoaded = false;

            const response = await fetch(API_CONFIG.SHEET_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.serverTimesData = data;

            this.updateSubserversDisplay();
            this.serverDataLoaded = true;
            this.updateCountdownTimer();

            console.log('✅ Dados dos servidores carregados');
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);

            // Usa dados mock em caso de erro
            this.serverTimesData = this.getMockServerData();
            this.updateSubserversDisplay();
            this.serverDataLoaded = true;
            this.updateCountdownTimer();
        }
    }

    /**
     * Obtém dados mock para fallback
     */
    getMockServerData() {
        const servers = ['ALFA', 'BETA', 'GAMA', 'DELTA', 'EPSILON', 'ZETA', 'ETA', 'THETA', 'IOTA', 'KAPPA', 'LAMBDA', 'MI', 'NU', 'XI'];
        return servers.map(server => ({ Idhas: server, Horario: '01' }));
    }

    /**
     * Atualiza display dos subservidores
     */
    updateSubserversDisplay() {
        const container = $('#subservers-container');
        if (!container) return;

        container.innerHTML = '';

        this.serverTimesData.forEach(item => {
            const name = item.Idhas;
            const time = item.Horario;

            if (name && time !== undefined) {
                const div = document.createElement('div');
                div.className = 'subservidor';
                div.innerHTML = `
                    <span class="subservidor-name">${name}:</span>
                    <span class="subservidor-time">${String(time).padStart(2, '0')}</span>
                `;
                container.appendChild(div);
            }
        });
    }

    /**
     * Atualiza display de tempo
     */
    updateTimeDisplay() {
        const timeDisplay = $('#current-time');
        if (timeDisplay) {
            timeDisplay.textContent = `Data e Hora de referência: ${formatCurrentTime()}`;
        }
    }

    /**
     * Renderiza lista de bosses
     */
    renderBosses() {
        const filterSelect = $('#filter-select');
        const timeFilterSelect = $('#time-filter-select');
        const sortSelect = $('#sort-select');
        const bossesContainer = $('#bosses-container');

        if (!bossesContainer) return;

        const selectedFilter = filterSelect?.value || 'all';
        const selectedTimeFilter = timeFilterSelect?.value || 'all';
        const selectedSort = sortSelect?.value || 'next-spawn';

        // Filtra bosses
        let filteredBosses = this.filterBosses(selectedFilter, selectedTimeFilter);

        // Ordena bosses
        let sortedBosses = this.sortBosses(filteredBosses, selectedSort);

        // Renderiza
        this.renderBossCards(sortedBosses, bossesContainer);
    }

    /**
     * Filtra bosses baseado nos critérios
     */
    filterBosses(itemFilter, timeFilter) {
        let filtered = BOSSES_DATA.filter(boss => {
            // Filtro por item
            if (itemFilter !== 'all') {
                const dropString = boss.drop ? boss.drop.join(' ') : '';
                if (!dropString.includes(itemFilter)) return false;
            }

            // Filtro por favoritos
            if (this.showOnlyFavorites) {
                if (!this.isFavorite(boss.nome)) return false;
            }

            // Filtro por horário
            if (timeFilter !== 'all') {
                const hourToFilter = parseInt(timeFilter);
                if (!boss.horarios.includes(hourToFilter)) return false;
            }

            return true;
        });

        return filtered;
    }

    /**
     * Ordena bosses
     */
    sortBosses(bosses, sortType) {
        const sorted = [...bosses];

        if (sortType === 'next-spawn') {
            sorted.forEach(boss => {
                boss.nextAppearance = this.getNextAppearance(boss.horarios);
            });
            sorted.sort((a, b) => a.nextAppearance - b.nextAppearance);
        } else {
            sorted.sort((a, b) => {
                const chanceA = this.getDropChance(a, sortType);
                const chanceB = this.getDropChance(b, sortType);
                return chanceB - chanceA;
            });
        }

        return sorted;
    }

    /**
     * Renderiza cards dos bosses
     */
    renderBossCards(bosses, container) {
        container.innerHTML = '';
        const currentHour = getSaoPauloDate().getHours();

        bosses.forEach(boss => {
            const card = this.createBossCard(boss, currentHour);
            container.appendChild(card);
        });
    }

    /**
     * Cria card de um boss
     */
    createBossCard(boss, currentHour) {
        const card = document.createElement('div');
        card.className = 'boss-card';

        // Estrela de favorito (SVG para cor customizada)
        const favoriteStar = document.createElement('div');
        favoriteStar.className = 'favorite-star';
        const isFav = this.isFavorite(boss.nome);
        favoriteStar.innerHTML = isFav
            ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>`
            : `<svg width="24" height="24" viewBox="0 0 24 24" fill="#666" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>`;
        favoriteStar.title = isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
        favoriteStar.onclick = (e) => {
            e.stopPropagation();
            this.toggleFavorite(boss.nome);
        };
        card.appendChild(favoriteStar);

        // Header do boss
        const header = document.createElement('div');
        header.className = 'boss-header';
        header.innerHTML = `
            <img src="${boss.img}" alt="Imagem de ${boss.nome}" loading="lazy">
            <h2>${boss.nome}</h2>
            <img src="${boss.spaw}" alt="Mapa de ${boss.nome}" loading="lazy" class="boss-spawn-img">
        `;

        // Informações do boss
        const info = document.createElement('div');
        info.className = 'boss-info';

        const horariosString = boss.horarios.map(h => {
            const formattedHour = String(h).padStart(2, '0') + 'hXX';
            return h === currentHour ? `<span class="highlight">${formattedHour}</span>` : formattedHour;
        }).join(', ');

        info.innerHTML = `
            <p><strong>Local:</strong> ${boss.local}</p>
            <p><strong>Horários:</strong> ${horariosString}</p>
        `;

        // Adiciona seções de drops e danos
        this.addBossSections(info, boss);

        card.appendChild(header);
        card.appendChild(info);

        return card;
    }

    /**
     * Adiciona seções de drops e danos ao boss
     */
    addBossSections(infoElement, boss) {
        const sections = [
            { title: 'Drops', items: boss.drop },
            { title: 'Dano 1 (50.000 a 349.999)', items: boss.dano1 },
            { title: 'Dano 2 (350.000 a 999.999)', items: boss.dano2 },
            { title: 'Dano 3 (1.000.000 e superior)', items: boss.dano3 }
        ];

        sections.forEach(section => {
            if (section.items && section.items.length > 0) {
                const sectionTitle = document.createElement('h3');
                sectionTitle.className = 'section-title';
                sectionTitle.textContent = section.title;
                infoElement.appendChild(sectionTitle);

                const ul = document.createElement('ul');
                section.items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                infoElement.appendChild(ul);
            }
        });
    }

    /**
     * Sistema de favoritos
     */
    toggleFavorite(bossName) {
        const index = this.userProfile.favoritesBosses.indexOf(bossName);
        if (index > -1) {
            this.userProfile.favoritesBosses.splice(index, 1);
        } else {
            this.userProfile.favoritesBosses.push(bossName);
        }
        this.saveProfile();
        this.renderBosses();
        this.updateProfileDisplay();
    }

    isFavorite(bossName) {
        return this.userProfile.favoritesBosses.includes(bossName);
    }

    toggleFavoritesFilter() {
        this.showOnlyFavorites = !this.showOnlyFavorites;
        const toggle = $('#favorites-toggle');

        if (toggle) {
            if (this.showOnlyFavorites) {
                toggle.style.background = 'var(--text-accent)';
                toggle.style.color = 'var(--bg-primary)';
                toggle.title = 'Mostrar todos os bosses';
            } else {
                toggle.style.background = 'var(--bg-secondary)';
                toggle.style.color = 'var(--text-accent)';
                toggle.title = 'Mostrar favoritos';
            }
        }

        this.renderBosses();
    }

    /**
     * Atualiza display do perfil
     */
    updateProfileDisplay() {
        const favoritesCount = $('#favorites-count');
        const notificationStatus = $('#notification-status');

        if (favoritesCount) {
            favoritesCount.textContent = this.userProfile.favoritesBosses.length;
        }

        if (notificationStatus) {
            notificationStatus.textContent = this.userProfile.notificationsEnabled ? 'Habilitadas' : 'Desabilitadas';
        }

        // Atualiza UI das notificações
        this.updateNotificationUI();

        // Atualiza UI do toggle de notificação só favoritos
        const notifyFavToggle = $('#notify-favorites-toggle');
        if (notifyFavToggle) {
            notifyFavToggle.checked = this.notifyOnlyFavorites;
        }
    }

    /**
     * Atualiza UI dos controles de notificação
     */
    updateNotificationUI() {
        const notificationToggle = $('#notification-toggle');

        if (notificationToggle) {
            const isEnabled = this.userProfile.notificationsEnabled;
            notificationToggle.textContent = isEnabled ? '🔔 ON' : '🔔 OFF';
            notificationToggle.classList.toggle('active', isEnabled);
        }

        // Atualiza UI do toggle de notificação só favoritos
        const notifyFavToggle = $('#notify-favorites-toggle');
        if (notifyFavToggle) {
            notifyFavToggle.checked = this.notifyOnlyFavorites;
        }

        // Se as notificações estão desabilitadas no perfil, 
        // não verificamos nem pedimos permissão do navegador
        if (!this.userProfile.notificationsEnabled) {
            console.log('📴 Notificações desabilitadas no perfil - não verificando permissão do navegador');
            return;
        }

        // Só verifica permissão se o usuário tem notificações habilitadas no perfil
        if ('Notification' in window && this.userProfile.notificationsEnabled) {
            if (Notification.permission === 'denied') {
                // Se foi negada pelo navegador, desabilita no perfil também
                this.userProfile.notificationsEnabled = false;
                this.updateNotificationUI();
                this.saveProfile();
                console.log('⚠️ Permissão de notificação foi negada - desabilitando no perfil');
            }
        }
    }

    /**
     * Sistema de countdown timer
     */
    updateCountdownTimer() {
        if (!this.serverDataLoaded) {
            this.updateTimerDisplay('⏳ Carregando...', 'Aguardando dados...', '📡 Conectando com servidor...');
            return;
        }

        const nextBoss = this.findNextBossWithServerTimes();

        if (!nextBoss) {
            this.updateTimerDisplay('--:--:--', 'Nenhum boss encontrado', '📍 Verifique os dados...');
            this._lastBossKey = null;
            this._lastBossTimeToNext = null;
            return;
        }

        const now = getSaoPauloDate();
        const timeToNext = nextBoss.timeToNext;
        const hours = Math.floor(timeToNext / 60);
        const minutes = timeToNext % 60;
        const seconds = 60 - now.getSeconds();

        const timeDisplay = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        const bossName = `${nextBoss.nome.replace('<br>', ' ')}${nextBoss.subserver ? ` (${nextBoss.subserver})` : ''}`;
        const location = `📍 ${nextBoss.local}${nextBoss.spawnTime ? ` às ${nextBoss.spawnTime}` : ''}`;

        this.updateTimerDisplay(timeDisplay, bossName, location);

        // Adiciona classe de aviso se menos de 10 minutos
        const timerElement = $('#countdown-timer');
        if (timerElement) {
            timerElement.classList.toggle('warning-timer', timeToNext <= 10);
        }

        // --- Notificação de nascimento do boss anterior se mudou ---
        const bossKey = `${nextBoss.nome}-${nextBoss.nextHour}-${nextBoss.nextMinute || 0}`;
        if (this._lastBossKey && this._lastBossKey !== bossKey && this._lastBossTimeToNext !== null) {
            // Se o boss anterior estava para nascer (timeToNext 1 ou 0 ou negativo), notifica spawn dele
            if (this._lastBossTimeToNext <= 1) {
                // Extrai dados do boss anterior do dicionário de notificações
                if (!this.lastNotifiedBosses[this._lastBossKey]) this.lastNotifiedBosses[this._lastBossKey] = {};
                if (!this.lastNotifiedBosses[this._lastBossKey].spawn) {
                    // Extrai nome, subserver, etc do bossKey
                    const [nome, nextHour, nextMinute] = this._lastBossKey.split('-');
                    // Busca boss e subserver
                    let bossObj = null, subserver = '', spawnTime = '';
                    for (const s of this.serverTimesData) {
                        if (parseInt(s.Horario) == nextMinute) {
                            subserver = s.Idhas;
                            break;
                        }
                    }
                    for (const b of BOSSES_DATA) {
                        if (b.nome === nome && b.horarios.includes(Number(nextHour))) {
                            bossObj = b;
                            break;
                        }
                    }
                    if (bossObj) {
                        spawnTime = `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`;
                        console.log('[NOTIFY][RECOVERY] Boss anterior nasceu! bossKey:', this._lastBossKey);
                        soundManager.playAlertSound();
                        this.showNotification(
                            `🐉(${subserver}) ${bossObj.nome.replace('<br>', ' ')} apareceu agora!`,
                            `${bossObj.local}${spawnTime ? ` às ${spawnTime}` : ''}`,
                            bossObj.nome,
                            bossObj.img,
                            bossObj.spaw
                        );
                        this.lastNotifiedBosses[this._lastBossKey].spawn = true;
                    }
                }
            }
        }

        // Notificações do boss atual
        this.handleNotifications(nextBoss, timeToNext);

        // Atualiza bossKey e timeToNext para o próximo ciclo
        this._lastBossKey = bossKey;
        this._lastBossTimeToNext = timeToNext;
    }

    /**
     * Atualiza display do timer
     */
    updateTimerDisplay(time, bossName, location) {
        const timerElement = $('#countdown-timer');
        const nameElement = $('#next-boss-name');
        const locationElement = $('#next-boss-location');

        if (timerElement) timerElement.textContent = time;
        if (nameElement) nameElement.innerHTML = bossName;
        if (locationElement) locationElement.textContent = location;
    }

    /**
     * Gerencia notificações
     */
    handleNotifications(nextBoss, timeToNext) {

    const bossKey = `${nextBoss.nome}-${nextBoss.nextHour}-${nextBoss.nextMinute || 0}`;
    if (!this.lastNotifiedBosses) this.lastNotifiedBosses = {};
    if (!this.lastNotifiedBosses[bossKey]) this.lastNotifiedBosses[bossKey] = {};
    // Debug: logs para depuração
    //console.log('[NOTIFY] timeToNext:', timeToNext, 'lastNotifiedBosses:', this.lastNotifiedBosses[bossKey], 'bossKey:', bossKey);

        // Se ativado, só notifica bosses favoritos
        if (this.notifyOnlyFavorites && !this.isFavorite(nextBoss.nome)) {
            return;
        }

        // Aviso antecipado (5 minutos)
        if (soundManager.earlyWarningEnabled && timeToNext === 5 && !this.lastNotifiedBosses[bossKey].early) {
            soundManager.playWarningSound();
            this.showNotification(
                `⚠️(${nextBoss.subserver}) - ${nextBoss.nome.replace('<br>', ' ')} aparecerá em 5 minutos!`,
                `${nextBoss.local}${nextBoss.spawnTime ? ` às ${nextBoss.spawnTime}` : ''}`,
                nextBoss.nome,
                nextBoss.img,
                nextBoss.spaw
            );
            this.lastNotifiedBosses[bossKey].early = true;
        }

        // Aviso final (1 minuto)
        if (soundManager.enabled && timeToNext === 1 && !this.lastNotifiedBosses[bossKey].final) {
            soundManager.playAlertSound();
            this.showNotification(
                `🚨(${nextBoss.subserver}) ${nextBoss.nome.replace('<br>', ' ')} aparecerá em 1 minuto!`,
                `${nextBoss.local}${nextBoss.spawnTime ? ` às ${nextBoss.spawnTime}` : ''}`,
                nextBoss.nome,
                nextBoss.img,
                nextBoss.spaw
            );
            this.lastNotifiedBosses[bossKey].final = true;
        }

        // Boss nasceu (garante notificação mesmo se timeToNext <= 0 por atraso de execução)
        if (timeToNext <= 0 && !this.lastNotifiedBosses[bossKey].spawn) {
            console.log('[NOTIFY] Boss nasceu! timeToNext:', timeToNext, 'bossKey:', bossKey);
            soundManager.playAlertSound();
            this.showNotification(
                `🐉(${nextBoss.subserver}) ${nextBoss.nome.replace('<br>', ' ')} apareceu agora!`,
                `${nextBoss.local}${nextBoss.spawnTime ? ` às ${nextBoss.spawnTime}` : ''}`,
                nextBoss.nome,
                nextBoss.img,
                nextBoss.spaw
            );
            this.lastNotifiedBosses[bossKey].spawn = true;
        }

        // Limpa notificações antigas para não crescer indefinidamente
        const now = Date.now();
        Object.keys(this.lastNotifiedBosses).forEach(key => {
            if (key !== bossKey) {
                // Remove notificações antigas se não for o boss atual
                delete this.lastNotifiedBosses[key];
            }
        });
    }

    // Alterna notificação só favoritos
    toggleNotifyOnlyFavorites() {
        this.notifyOnlyFavorites = !this.notifyOnlyFavorites;
        this.userProfile.notifyOnlyFavorites = this.notifyOnlyFavorites;
        this.saveProfile();
        this.updateProfileDisplay();
    }

    /**
     * Mostra notificação do sistema
     */
    showNotification(title, body, bossName = null, icon = null, badge = null) {
        if (!this.userProfile.notificationsEnabled) return;

        const isFavoriteBoss = bossName && this.isFavorite(bossName);

        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: icon || 'img/bosses/miniaturas/mini_babel.webp',
                badge: badge || 'img/bosses/miniaturas/mini_valento.webp',
                tag: `boss-${bossName}`,
                requireInteraction: isFavoriteBoss,
                vibrate: isFavoriteBoss ? [200, 100, 200] : [100, 50, 100]
            });
            setTimeout(() => notification.close(), 5000);
            // Algumas Pessoas reclamam do fechamento obrigatório quando é favorito
            // if (!isFavoriteBoss) {
            //     setTimeout(() => notification.close(), 5000);
            // }
        }
    }

    /**
     * Encontra próximo boss com dados do servidor
     */
    findNextBossWithServerTimes() {
     if (!this.serverDataLoaded || !this.serverTimesData.length) {
        return null;
    }

    const now = getSaoPauloDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let bossesUpcoming = [];

    this.serverTimesData.forEach(serverData => {
        const subserverName = serverData.Idhas;
        const referenceMinute = parseInt(serverData.Horario);

        BOSSES_DATA.forEach(boss => {
            boss.horarios.forEach(hour => {
                const spawnHour = hour;
                const spawnMinute = referenceMinute;
                const spawnTimeInMinutes = spawnHour * 60 + spawnMinute;
                const currentTimeInMinutes = currentHour * 60 + currentMinute;

                let timeToNext;
                if (spawnTimeInMinutes > currentTimeInMinutes) {
                    timeToNext = spawnTimeInMinutes - currentTimeInMinutes;
                } else {
                    timeToNext = (24 * 60) - currentTimeInMinutes + spawnTimeInMinutes;
                }

                bossesUpcoming.push({
                    ...boss,
                    nextHour: spawnHour,
                    nextMinute: spawnMinute,
                    subserver: subserverName,
                    timeToNext: timeToNext,
                    spawnTime: `${String(spawnHour).padStart(2, '0')}:${String(spawnMinute).padStart(2, '0')}`
                });
            });
        });
    });

    // Ordena por tempo de spawn e, em caso de empate, pelo maior lvl
    bossesUpcoming.sort((a, b) => {
        if (a.timeToNext !== b.timeToNext) {
            return a.timeToNext - b.timeToNext; // Menor tempo primeiro
        }
        return b.lvl - a.lvl; // Maior lvl primeiro em caso de empate
    });

    // Retorna o boss mais próximo (e de maior lvl em caso de empate)
    return bossesUpcoming[0] || null;
    }

    /**
     * Funções utilitárias
     */
    getDropChance(boss, dropItemName) {
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

    getNextAppearance(horarios) {
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
     * Sistema de abas
     */
    initializeTabSystem() {
        console.log("🔧 DOM pronto:", document.readyState);
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(tab.dataset.tab);
            });
        });
    }

    switchTab(tabName) {
        // Remove active de todas as abas
        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Adiciona active na aba clicada
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        } else {
        }

        // Mostra conteúdo correspondente
        const content = document.getElementById(tabName + '-content');
        if (content) {
            content.classList.add('active');
        } else {
        }

        // Se mudou para bosses, atualiza dados
        if (tabName === 'bosses') {
            this.fetchServerTimes();
            this.renderBosses();
        }
    }

    /**
     * Sistema de loteria
     */
    initializeLottery() {
        const form = $('#lottery-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLotterySubmit();
            });
        }
    }

    handleLotterySubmit() {
        const quantity = parseInt($('#quantity')?.value || 1);
        const minRange = parseInt($('#min-range')?.value || 1);
        const maxRange = parseInt($('#max-range')?.value || 100);
        const allowRepeats = $('#allow-repeats')?.checked || false;

        // Validação
        if (quantity < 1 || quantity > 100) {
            alert('Quantidade deve ser entre 1 e 100');
            return;
        }

        if (minRange >= maxRange) {
            alert('O valor mínimo deve ser menor que o máximo');
            return;
        }

        try {
            const results = this.generateNumbers(quantity, minRange, maxRange, allowRepeats);
            this.displayLotteryResults(results);
        } catch (error) {
            alert(error.message);
        }
    }

    generateNumbers(count, min, max, allowRepeats) {
        const numbers = [];
        const range = max - min + 1;

        if (!allowRepeats && count > range) {
            throw new Error(`Não é possível sortear ${count} números únicos entre ${min} e ${max}`);
        }

        if (allowRepeats) {
            for (let i = 0; i < count; i++) {
                numbers.push(Math.floor(Math.random() * range) + min);
            }
        } else {
            const available = Array.from({ length: range }, (_, i) => min + i);
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * available.length);
                numbers.push(available.splice(randomIndex, 1)[0]);
            }
        }

        return numbers;
    }

    displayLotteryResults(numbers) {
        const resultsDiv = $('#lottery-results');
        const display = $('#results-display');
        const timeSpan = $('#draw-time');

        if (!resultsDiv || !display || !timeSpan) return;

        const sortResults = $('#sort-results')?.checked || false;
        const finalNumbers = sortResults ? [...numbers].sort((a, b) => a - b) : numbers;

        display.innerHTML = '';

        finalNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'result-number';
                numberDiv.textContent = number;
                display.appendChild(numberDiv);
            }, index * 100);
        });

        timeSpan.textContent = getSaoPauloDate().toLocaleString('pt-BR');
        resultsDiv.style.display = 'block';

        // Scroll para resultados
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /**
     * PWA
     */
    initializePWA() {
        if (window.location.protocol !== 'file:') {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredPrompt = e;
                this.showPWABanner();
            });
        }
    }

    showPWABanner() {
        const banner = $('#pwa-banner');
        if (banner) {
            banner.style.display = 'block';

            const installBtn = $('#pwa-install-btn');
            if (installBtn) {
                installBtn.addEventListener('click', () => this.installPWA());
            }
        }
    }

    installPWA() {
        const banner = $('#pwa-banner');
        if (banner) banner.style.display = 'none';

        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();

            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('📱 PWA instalado');
                }
                this.deferredPrompt = null;
            });
        }
    }

    /**
     * Scroll behavior
     */
    handleScroll() {
        const timerSection = $('#timer-section');
        if (!timerSection || timerSection.classList.contains('no-scroll-fade')) return;

        timerSection.classList.add('scrolling');

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            timerSection.classList.remove('scrolling');
        }, 1000);
    }

    /**
     * Cleanup
     */
    cleanup() {
        soundManager.cleanup();
    }
}

// Inicializa aplicação
const app = new AppManager();

// Torna managers globais para compatibilidade
window.app = app;
window.profileManager = {
    togglePanel: () => {
        const panel = $('#profile-panel');
        if (panel) panel.classList.toggle('open');
    },
    exportProfile: () => {
        const data = storageManager.exportUserData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'pt-bosses-profile.json';
        link.click();
    },
    importProfile: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (storageManager.importUserData(data)) {
                            app.loadProfile();
                            app.renderBosses();
                            alert('✅ Configurações importadas com sucesso!');
                        } else {
                            alert('❌ Erro ao importar configurações.');
                        }
                    } catch (error) {
                        alert('❌ Arquivo inválido.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    },
    updateSoundSettings: (settings) => {
        if (app.userProfile) {
            app.userProfile.soundSettings = { ...app.userProfile.soundSettings, ...settings };
            app.saveProfile();
        }
    },
    clearProfile: () => {
        if (confirm('⚠️ Tem certeza que deseja limpar todos os dados?')) {
            storageManager.clearUserData();
            location.reload();
        }
    }
};

window.favoritesManager = {
    toggleFilter: () => app.toggleFavoritesFilter()
};

window.timerManager = {
    toggleScrollFade: () => {
        const timerSection = $('#timer-section');
        const pinToggle = $('#pin-toggle');

        if (timerSection && pinToggle) {
            const isDisabled = timerSection.classList.contains('no-scroll-fade');
            timerSection.classList.toggle('no-scroll-fade');
            pinToggle.classList.toggle('active');
            pinToggle.title = isDisabled ? 'Fixar/Desfixar' : 'Permitir transparência no scroll';
        }
    },
    toggleSettings: () => {
        const timerSection = $('#timer-section');
        if (timerSection) {
            timerSection.classList.toggle('expanded');
        }
    }
};

window.notificationManager = {
    toggleNotifications: async () => {
        if (app.userProfile.notificationsEnabled) {
            // Usuário quer desabilitar notificações
            app.userProfile.notificationsEnabled = false;
            console.log('🔔 Notificações desabilitadas pelo usuário');
        } else {
            // Usuário quer habilitar notificações
            if ('Notification' in window) {
                // Só pede permissão quando o usuário explicitamente quer habilitar
                if (Notification.permission === 'default') {
                    console.log('🔔 Solicitando permissão de notificação...');
                    const permission = await Notification.requestPermission();

                    if (permission === 'granted') {
                        app.userProfile.notificationsEnabled = true;
                        new Notification('✅ Notificações Habilitadas!', {
                            body: 'Você receberá alertas sobre spawns dos bosses.',
                            icon: 'img/bosses/miniaturas/mini_babel.webp'
                        });
                        console.log('✅ Permissão de notificação concedida');
                    } else {
                        app.userProfile.notificationsEnabled = false;
                        console.log('❌ Permissão de notificação negada');
                    }
                } else if (Notification.permission === 'granted') {
                    // Já tem permissão, só habilita
                    app.userProfile.notificationsEnabled = true;
                    console.log('✅ Notificações habilitadas (permissão já existente)');
                } else {
                    // Permissão foi negada anteriormente
                    app.userProfile.notificationsEnabled = false;
                    alert('❌ As notificações foram bloqueadas pelo navegador.\n\nPara habilitar:\n1. Clique no ícone de cadeado/configurações na barra de endereço\n2. Altere "Notificações" para "Permitir"\n3. Recarregue a página e tente novamente');
                    console.log('❌ Notificações bloqueadas pelo navegador');
                }
            } else {
                app.userProfile.notificationsEnabled = false;
                alert('❌ Seu navegador não suporta notificações');
                console.log('❌ Navegador não suporta notificações');
            }
        }

        app.updateProfileDisplay();
        app.saveProfile();
    },
    testNotification: () => {
        if (app.userProfile.notificationsEnabled) {
            app.showNotification('🧪 Teste de Notificação!', 'Funcionando perfeitamente!', 'Teste');
            if (soundManager.enabled) {
                soundManager.playNotificationSound('chime');
            }
        } else {
            alert('❌ Primeiro ative as notificações!');
        }
    }
};

window.lotteryManager = {
    toggleOptions: () => {
        const options = $('#lottery-options');
        const arrow = $('.options-toggle .arrow');

        if (options && arrow) {
            if (options.style.display === 'none') {
                options.style.display = 'block';
                arrow.textContent = '▲';
            } else {
                options.style.display = 'none';
                arrow.textContent = '▼';
            }
        }
    },
    copyResults: () => {
        const display = $('#results-display');
        if (display) {
            const numbers = Array.from(display.children).map(el => el.textContent);
            const text = `Números sorteados: ${numbers.join(', ')}\nData: ${getSaoPauloDate().toLocaleString('pt-BR')}`;

            navigator.clipboard.writeText(text).then(() => {
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = 'Copiado!';
                setTimeout(() => btn.textContent = originalText, 2000);
            });
        }
    },
    newDraw: () => {
        const results = $('#lottery-results');
        if (results) results.style.display = 'none';

        // Reset form
        const quantity = $('#quantity');
        const minRange = $('#min-range');
        const maxRange = $('#max-range');

        if (quantity) quantity.value = 1;
        if (minRange) minRange.value = 1;
        if (maxRange) maxRange.value = 100;
    }
};

window.pwaManager = {
    dismissBanner: () => {
        const banner = $('#pwa-banner');
        if (banner) banner.style.display = 'none';
    }
};

window.helpModal = {
    show: () => {
        const modal = $('#help-modal-overlay');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    },
    close: () => {
        const modal = $('#help-modal-overlay');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
};

// Event listener para ESC fechar modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.helpModal.close();
    }
});

// Expõe funções globais necessárias para event handlers inline do HTML
window.toggleProfilePanel = () => window.profileManager.togglePanel();
window.toggleFavoritesFilter = () => app.toggleFavoritesFilter();
window.testNotification = () => window.notificationManager.testNotification();
window.exportProfile = () => window.profileManager.exportProfile();
window.importProfile = () => window.profileManager.importProfile();
window.clearProfile = () => window.profileManager.clearProfile();
window.dismissPWABanner = () => window.pwaManager.dismissBanner();
window.switchTab = (tab) => app.switchTab(tab);
window.toggleScrollFade = () => window.timerManager.toggleScrollFade();
window.toggleSettings = () => window.timerManager.toggleSettings();
window.showHelpModal = () => window.helpModal.show();
window.closeHelpModal = () => window.helpModal.close();
window.toggleSound = () => soundManager.toggleSound();
window.changeSoundType = () => soundManager.changeSoundType();
window.toggleEarlyWarning = () => soundManager.toggleEarlyWarning();
window.updateVolume = () => soundManager.updateVolume();
window.toggleNotifications = () => window.notificationManager.toggleNotifications();
window.toggleNotifyOnlyFavorites = () => app.toggleNotifyOnlyFavorites();
window.toggleLotteryOptions = () => window.lotteryManager.toggleOptions();
window.copyResults = () => window.lotteryManager.copyResults();
window.newDraw = () => window.lotteryManager.newDraw();

export { app }; 