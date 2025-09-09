/**
 * Gerenciador de som com Web Audio API
 */

import { SOUND_CONFIG } from './config.js';
import { $ } from './utils.js';

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = false;
        this.earlyWarningEnabled = false;
        this.volume = SOUND_CONFIG.DEFAULT_VOLUME;
        this.soundType = SOUND_CONFIG.DEFAULT_TYPE;
        this.lastPlayedTime = 0;
        this.minPlayInterval = 500; // Mínimo 500ms entre sons
        
        this.initializeElements();
    }

    /**
     * Inicializa referências dos elementos DOM
     */
    initializeElements() {
        this.elements = {
            soundToggle: $('#sound-toggle'),
            earlyWarningToggle: $('#early-warning-toggle'),
            soundTypeSelect: $('#sound-type-select'),
            volumeSlider: $('#volume-slider'),
            volumeDisplay: $('#volume-display')
        };
    }

    /**
     * Inicializa o contexto de áudio
     * @returns {boolean} Sucesso da inicialização
     */
    initAudioContext() {
        if (this.audioContext) return true;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            
            // Alguns navegadores requerem interação do usuário
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            console.log('🔊 Contexto de áudio inicializado');
            return true;
        } catch (error) {
            console.error('Erro ao inicializar áudio:', error);
            return false;
        }
    }

    /**
     * Gera som de notificação
     * @param {string} type - Tipo de som
     * @returns {Promise} Promise que resolve quando som termina
     */
    async playNotificationSound(type = null) {
        // Throttling para evitar spam de sons
        const now = Date.now();
        if (now - this.lastPlayedTime < this.minPlayInterval) {
            return;
        }
        this.lastPlayedTime = now;

        if (!this.enabled || !this.initAudioContext()) {
            return;
        }

        const soundType = type || this.soundType;
        const config = SOUND_CONFIG.TYPES[soundType];
        
        if (!config) {
            console.warn(`Tipo de som "${soundType}" não encontrado`);
            return;
        }

        try {
            await this.generateToneSequence(config);
        } catch (error) {
            console.error('Erro ao tocar som:', error);
        }
    }

    /**
     * Gera sequência de tons
     * @param {Object} config - Configuração do som
     * @returns {Promise} Promise que resolve quando sequência termina
     */
    generateToneSequence(config) {
        return new Promise(resolve => {
            let time = this.audioContext.currentTime;
            
            config.frequencies.forEach((frequency, index) => {
                const duration = config.durations[index] / 1000;
                this.createTone(frequency, time, duration);
                time += duration + 0.05; // Pequena pausa entre tons
            });
            
            // Resolve após todos os tons
            setTimeout(() => resolve(), time * 1000);
        });
    }

    /**
     * Cria um tom específico
     * @param {number} frequency - Frequência em Hz
     * @param {number} startTime - Tempo de início
     * @param {number} duration - Duração em segundos
     */
    createTone(frequency, startTime, duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        // Envelope ADSR suave
        const attackTime = 0.01;
        const releaseTime = 0.01;
        const sustainLevel = this.volume * 0.3;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration - releaseTime);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }

    /**
     * Alterna som ligado/desligado
     */
    toggleSound() {
        this.enabled = !this.enabled;
        const btn = this.elements.soundToggle;
        
        if (this.enabled) {
            this.initAudioContext();
            btn.textContent = '🔊 ON';
            btn.classList.add('active');
            this.playNotificationSound(); // Som de teste
        } else {
            btn.textContent = '🔇 OFF';
            btn.classList.remove('active');
        }
        
        this.updateProfile();
    }

    /**
     * Alterna aviso antecipado
     */
    toggleEarlyWarning() {
        this.earlyWarningEnabled = !this.earlyWarningEnabled;
        const btn = this.elements.earlyWarningToggle;
        
        if (this.earlyWarningEnabled) {
            btn.textContent = '⚠️ ON';
            btn.classList.add('active');
        } else {
            btn.textContent = '⚠️ OFF';
            btn.classList.remove('active');
        }
        
        this.updateProfile();
    }

    /**
     * Altera tipo de som
     */
    changeSoundType() {
        const select = this.elements.soundTypeSelect;
        this.soundType = select.value;
        
        // Toca som de teste se habilitado
        if (this.enabled) {
            this.playNotificationSound();
        }
        
        this.updateProfile();
    }

    /**
     * Atualiza volume
     */
    updateVolume() {
        const slider = this.elements.volumeSlider;
        const display = this.elements.volumeDisplay;
        
        this.volume = slider.value / 100;
        display.textContent = slider.value + '%';
        
        this.updateProfile();
    }

    /**
     * Atualiza perfil no storage
     */
    updateProfile() {
        // Será implementado quando o profileManager estiver disponível
        if (window.profileManager) {
            window.profileManager.updateSoundSettings({
                enabled: this.enabled,
                type: this.soundType,
                volume: Math.round(this.volume * 100),
                earlyWarning: this.earlyWarningEnabled
            });
        }
    }

    /**
     * Carrega configurações do perfil
     * @param {Object} soundSettings - Configurações de som
     */
    loadSettings(soundSettings) {
        this.enabled = soundSettings.enabled || false;
        this.soundType = soundSettings.type || SOUND_CONFIG.DEFAULT_TYPE;
        this.volume = (soundSettings.volume || 50) / 100;
        this.earlyWarningEnabled = soundSettings.earlyWarning || false;
        
        this.updateUI();
    }

    /**
     * Atualiza interface baseada nas configurações
     */
    updateUI() {
        // Botão de som
        if (this.elements.soundToggle) {
            this.elements.soundToggle.textContent = this.enabled ? '🔊 ON' : '🔇 OFF';
            this.elements.soundToggle.classList.toggle('active', this.enabled);
        }
        
        // Botão de aviso antecipado
        if (this.elements.earlyWarningToggle) {
            this.elements.earlyWarningToggle.textContent = this.earlyWarningEnabled ? '⚠️ ON' : '⚠️ OFF';
            this.elements.earlyWarningToggle.classList.toggle('active', this.earlyWarningEnabled);
        }
        
        // Seletor de tipo
        if (this.elements.soundTypeSelect) {
            this.elements.soundTypeSelect.value = this.soundType;
        }
        
        // Slider de volume
        if (this.elements.volumeSlider) {
            this.elements.volumeSlider.value = Math.round(this.volume * 100);
        }
        
        // Display de volume
        if (this.elements.volumeDisplay) {
            this.elements.volumeDisplay.textContent = Math.round(this.volume * 100) + '%';
        }
    }

    /**
     * Sons especiais para diferentes tipos de notificação
     */
    async playWarningSound() {
        await this.playNotificationSound('chime');
    }

    async playAlertSound() {
        await this.playNotificationSound('alert');
    }

    async playSuccessSound() {
        await this.playNotificationSound('bell');
    }

    async playErrorSound() {
        await this.playNotificationSound('horn');
    }

    /**
     * Testa se som está funcionando
     * @returns {Promise<boolean>} Sucesso do teste
     */
    async testSound() {
        if (!this.enabled) {
            return false;
        }
        
        try {
            await this.playNotificationSound('chime');
            return true;
        } catch (error) {
            console.error('Erro no teste de som:', error);
            return false;
        }
    }

    /**
     * Limpa recursos de áudio
     */
    cleanup() {
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
            this.audioContext = null;
        }
    }

    /**
     * Obtém configurações atuais
     * @returns {Object} Configurações de som
     */
    getSettings() {
        return {
            enabled: this.enabled,
            type: this.soundType,
            volume: Math.round(this.volume * 100),
            earlyWarning: this.earlyWarningEnabled
        };
    }
}

// Instância singleton
export const soundManager = new SoundManager();

// Torna funções globais para compatibilidade com HTML
window.soundManager = soundManager;

// Event listeners para cleanup
window.addEventListener('beforeunload', () => {
    soundManager.cleanup();
});

// Auto-resume do contexto de áudio quando necessário
document.addEventListener('click', () => {
    if (soundManager.audioContext && soundManager.audioContext.state === 'suspended') {
        soundManager.audioContext.resume();
    }
}, { once: true }); 