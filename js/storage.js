/**
 * Sistema de gerenciamento de localStorage com backup e recuperação
 */

import { DEFAULT_PROFILE } from './config.js';
import { debounce } from './utils.js';

class StorageManager {
    constructor() {
        this.storageKey = 'ptBossesProfile';
        this.backupKey = 'ptBossesProfile_backup';
        this.saveDebounced = debounce(this.saveToStorage.bind(this), 1000);
    }

    /**
     * Salva dados no localStorage
     * @param {string} key - Chave do localStorage
     * @param {*} data - Dados para salvar
     * @returns {boolean} Sucesso da operação
     */
    saveToStorage(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
            
            // Cria backup automático
            if (key === this.storageKey) {
                localStorage.setItem(this.backupKey, serialized);
            }
            
            return true;
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
            this.handleStorageError(error);
            return false;
        }
    }

    /**
     * Carrega dados do localStorage
     * @param {string} key - Chave do localStorage
     * @param {*} defaultValue - Valor padrão se não encontrado
     * @returns {*} Dados carregados ou valor padrão
     */
    loadFromStorage(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
            
            // Tenta recuperar do backup
            if (key === this.storageKey) {
                return this.recoverFromBackup();
            }
            
            return defaultValue;
        }
    }

    /**
     * Recupera dados do backup
     * @returns {*} Dados do backup ou padrão
     */
    recoverFromBackup() {
        try {
            const backup = localStorage.getItem(this.backupKey);
            if (backup) {
                const data = JSON.parse(backup);
                console.log('📁 Dados recuperados do backup');
                return data;
            }
        } catch (error) {
            console.error('Erro ao recuperar backup:', error);
        }
        
        return DEFAULT_PROFILE;
    }

    /**
     * Trata erros de armazenamento
     * @param {Error} error - Erro ocorrido
     */
    handleStorageError(error) {
        if (error.name === 'QuotaExceededError') {
            this.cleanOldData();
        }
    }

    /**
     * Limpa dados antigos para liberar espaço
     */
    cleanOldData() {
        try {
            // Remove itens expirados de cache
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                
                // Remove caches antigos (que começam com cache_)
                if (key && key.startsWith('cache_')) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            console.log(`🧹 Limpeza automática: removidos ${keysToRemove.length} itens de cache`);
        } catch (error) {
            console.error('Erro na limpeza automática:', error);
        }
    }

    /**
     * Remove item do localStorage
     * @param {string} key - Chave para remover
     * @returns {boolean} Sucesso da operação
     */
    removeFromStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Erro ao remover do localStorage:', error);
            return false;
        }
    }

    /**
     * Verifica se localStorage está disponível
     * @returns {boolean} Disponibilidade do localStorage
     */
    isLocalStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, 'test');
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Obtém informações sobre uso do storage
     * @returns {Object} Informações de uso
     */
    getStorageInfo() {
        if (!this.isLocalStorageAvailable()) {
            return { available: false };
        }

        let totalSize = 0;
        let itemCount = 0;
        
        try {
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length;
                    itemCount++;
                }
            }
            
            return {
                available: true,
                itemCount,
                totalSize,
                totalSizeKB: Math.round(totalSize / 1024 * 100) / 100,
                quota: this.getStorageQuota()
            };
        } catch (error) {
            return { 
                available: true, 
                error: error.message 
            };
        }
    }

    /**
     * Estima quota de armazenamento
     * @returns {number} Quota estimada em KB
     */
    getStorageQuota() {
        // Estimativa baseada em testes comuns
        // A maioria dos browsers modernos permite 5-10MB
        try {
            if (navigator.storage && navigator.storage.estimate) {
                navigator.storage.estimate().then(estimate => {
                    console.log('Storage quota:', estimate.quota / 1024 / 1024, 'MB');
                });
            }
        } catch (error) {
            // Fallback para estimativa
        }
        
        return 5120; // 5MB em KB
    }

    /**
     * Exporta todos os dados do usuário
     * @returns {Object} Dados para exportação
     */
    exportUserData() {
        const profile = this.loadFromStorage(this.storageKey, DEFAULT_PROFILE);
        
        return {
            exportDate: new Date().toISOString(),
            version: '1.0',
            profile,
            metadata: {
                browser: navigator.userAgent,
                timestamp: Date.now()
            }
        };
    }

    /**
     * Importa dados do usuário
     * @param {Object} importData - Dados para importar
     * @returns {boolean} Sucesso da importação
     */
    importUserData(importData) {
        try {
            if (!importData.profile) {
                throw new Error('Dados de perfil não encontrados');
            }

            // Valida estrutura dos dados
            const profile = { ...DEFAULT_PROFILE, ...importData.profile };
            
            // Backup dos dados atuais
            const currentData = this.loadFromStorage(this.storageKey, DEFAULT_PROFILE);
            this.saveToStorage(`${this.storageKey}_pre_import_backup`, currentData);
            
            // Salva novos dados
            const success = this.saveToStorage(this.storageKey, profile);
            
            if (success) {
                console.log('📥 Dados importados com sucesso');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Erro na importação:', error);
            return false;
        }
    }

    /**
     * Salva perfil com debounce
     * @param {Object} profile - Dados do perfil
     */
    saveProfile(profile) {
        this.saveDebounced(this.storageKey, profile);
    }

    /**
     * Carrega perfil do usuário
     * @returns {Object} Perfil do usuário
     */
    loadProfile() {
        return this.loadFromStorage(this.storageKey, DEFAULT_PROFILE);
    }

    /**
     * Limpa todos os dados do usuário
     * @returns {boolean} Sucesso da operação
     */
    clearUserData() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.backupKey);
            localStorage.removeItem(`${this.storageKey}_pre_import_backup`);
            
            // Remove outros dados relacionados
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('ptBosses')) {
                    keysToRemove.push(key);
                }
            }
            
            keysToRemove.forEach(key => localStorage.removeItem(key));
            
            console.log('🗑️ Dados do usuário limpos');
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    }

    /**
     * Migra dados de versões antigas
     */
    migrateOldData() {
        try {
            // Verifica se existem dados da versão antiga
            const oldData = this.loadFromStorage('oldPTBossesData');
            if (oldData) {
                console.log('🔄 Migrando dados da versão antiga...');
                
                const migratedProfile = {
                    ...DEFAULT_PROFILE,
                    favoritesBosses: oldData.favorites || [],
                    soundSettings: {
                        ...DEFAULT_PROFILE.soundSettings,
                        ...oldData.soundSettings
                    },
                    stats: {
                        ...DEFAULT_PROFILE.stats,
                        totalVisits: oldData.visits || 0
                    }
                };
                
                this.saveProfile(migratedProfile);
                this.removeFromStorage('oldPTBossesData');
                
                console.log('✅ Migração concluída');
            }
        } catch (error) {
            console.error('Erro na migração:', error);
        }
    }
}

// Instância singleton
export const storageManager = new StorageManager();

// Inicialização
storageManager.migrateOldData(); 