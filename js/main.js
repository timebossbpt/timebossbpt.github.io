/**
 * Script principal - Carrega todos os módulos e expõe funções globais
 */

// Importa a aplicação principal
import { app } from './app.js';

// Aguarda o DOM estar pronto antes de inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 DOM carregado - Sistema modular inicializado');
    
    // Inicializa a aplicação
    if (app && typeof app.initializeApp === 'function') {
        app.initializeApp().catch(error => {
            console.error('❌ Erro ao inicializar aplicação:', error);
        });
    } else {
        console.error('❌ Aplicação não encontrada ou método initializeApp não disponível');
    }
});

// Expõe funções globais necessárias para os event handlers inline
window.addEventListener('load', () => {
    // Verifica se o app global foi inicializado
    if (typeof window.app !== 'undefined') {
        console.log('✅ Aplicação global disponível');
    } else {
        console.error('❌ Aplicação global não encontrada');
    }
    
    // Verifica se os managers globais foram inicializados
    if (typeof window.soundManager !== 'undefined') {
        console.log('✅ Sound Manager global disponível');
    }
    
    if (typeof window.notificationManager !== 'undefined') {
        console.log('✅ Notification Manager global disponível');
    }
});
