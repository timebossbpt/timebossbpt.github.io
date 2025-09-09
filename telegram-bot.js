// Telegram Bot Integration for PT Bosses Portal
// Instructions for setup:
// 1. Create a bot with @BotFather on Telegram
// 2. Get your bot token
// 3. Replace TELEGRAM_BOT_TOKEN with your actual token
// 4. Deploy this to a serverless function (Netlify/Vercel) or server

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Discord Webhook Integration (FREE)
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

// Boss data - you can sync this with your main application
const allBossesData = [
    // Copy the same boss data from your main file
    { nome: "Valento", local: "Vale Gallubia", horarios: [1, 5, 9, 13, 17, 21] },
    { nome: "Kelvezu", local: "Covil do Kelvezu", horarios: [1, 7, 13, 19] },
    // ... add all other bosses
];

// Function to get next boss spawn
function getNextBoss() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    let nextBoss = null;
    let minTimeToNext = Infinity;
    
    allBossesData.forEach(boss => {
        boss.horarios.forEach(hour => {
            let timeToNext;
            if (hour > currentHour || (hour === currentHour && currentMinute < 30)) {
                timeToNext = (hour - currentHour) * 60 - currentMinute;
            } else {
                timeToNext = (24 - currentHour + hour) * 60 - currentMinute;
            }
            
            if (timeToNext < minTimeToNext) {
                minTimeToNext = timeToNext;
                nextBoss = { ...boss, nextHour: hour, timeToNext };
            }
        });
    });
    
    return nextBoss;
}

// Telegram Bot Functions
async function sendTelegramMessage(chatId, message, options = {}) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    const body = {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...options
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (error) {
        console.error('Telegram Error:', error);
    }
}

// Discord Webhook Function (FREE!)
async function sendDiscordMessage(message, embeds = []) {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        console.log('Discord webhook not configured');
        return;
    }
    
    const body = {
        content: message,
        embeds: embeds
    };
    
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return response.ok;
    } catch (error) {
        console.error('Discord Error:', error);
    }
}

// Handle Telegram commands
function handleTelegramCommand(message) {
    const chatId = message.chat.id;
    const text = message.text;
    const command = text.split(' ')[0].toLowerCase();
    
    switch (command) {
        case '/start':
            sendTelegramMessage(chatId, 
                `🐉 <b>Bem-vindo ao Portal PT Bosses!</b>\n\n` +
                `Comandos disponíveis:\n` +
                `/proximo - Próximo boss a spawnar\n` +
                `/todos - Lista todos os bosses de hoje\n` +
                `/valento - Horários do Valento\n` +
                `/kelvezu - Horários do Kelvezu\n` +
                `/help - Ver todos os comandos`
            );
            break;
            
        case '/proximo':
            const nextBoss = getNextBoss();
            if (nextBoss) {
                const hours = Math.floor(nextBoss.timeToNext / 60);
                const minutes = nextBoss.timeToNext % 60;
                sendTelegramMessage(chatId,
                    `⏰ <b>Próximo Boss</b>\n\n` +
                    `🐉 <b>${nextBoss.nome}</b>\n` +
                    `📍 ${nextBoss.local}\n` +
                    `⏱️ Em: ${hours}h ${minutes}min\n` +
                    `🕐 Horário: ${nextBoss.nextHour}:XX`
                );
            }
            break;
            
        case '/todos':
            sendTodaysBosses(chatId);
            break;
            
        case '/help':
            sendTelegramMessage(chatId,
                `🤖 <b>Comandos do Bot</b>\n\n` +
                `/start - Iniciar o bot\n` +
                `/proximo - Próximo boss\n` +
                `/todos - Bosses de hoje\n` +
                `/valento - Horários do Valento\n` +
                `/kelvezu - Horários do Kelvezu\n` +
                `/mokova - Horários do Mokova\n` +
                `/shy - Horários do Shy\n` +
                `/tulla - Horários do Tulla\n` +
                `/draxos - Horários do Draxos\n` +
                `/greedy - Horários do Greedy\n` +
                `/yagditha - Horários do Yagditha\n\n` +
                `🌐 Portal Web: [PT Bosses](https://your-domain.com)`
            );
            break;
            
        default:
            // Check if it's a boss name command
            const bossName = command.substring(1);
            const boss = allBossesData.find(b => 
                b.nome.toLowerCase().includes(bossName) || 
                bossName.includes(b.nome.toLowerCase().replace('<br>', ''))
            );
            
            if (boss) {
                const horariosStr = boss.horarios.map(h => `${h}:XX`).join(', ');
                sendTelegramMessage(chatId,
                    `🐉 <b>${boss.nome.replace('<br>', ' ')}</b>\n\n` +
                    `📍 <b>Local:</b> ${boss.local}\n` +
                    `🕐 <b>Horários:</b> ${horariosStr}\n\n` +
                    `💡 Use /proximo para ver o próximo spawn!`
                );
            } else {
                sendTelegramMessage(chatId, 
                    `❌ Comando não reconhecido.\nUse /help para ver os comandos disponíveis.`
                );
            }
    }
}

// Send today's bosses schedule
function sendTodaysBosses(chatId) {
    const now = new Date();
    const currentHour = now.getHours();
    
    let message = `📅 <b>Bosses de Hoje</b>\n\n`;
    
    // Get all spawns for today sorted by time
    const todaysSpawns = [];
    allBossesData.forEach(boss => {
        boss.horarios.forEach(hour => {
            todaysSpawns.push({
                boss: boss.nome.replace('<br>', ' '),
                local: boss.local,
                hour: hour,
                isPast: hour < currentHour
            });
        });
    });
    
    todaysSpawns.sort((a, b) => a.hour - b.hour);
    
    todaysSpawns.forEach(spawn => {
        const status = spawn.isPast ? '✅' : (spawn.hour === currentHour ? '🔥' : '⏳');
        message += `${status} <b>${spawn.hour}:XX</b> - ${spawn.boss} (${spawn.local})\n`;
    });
    
    sendTelegramMessage(chatId, message);
}

// Auto-notification system (run this every minute)
async function checkAndNotifyUpcomingBosses() {
    const nextBoss = getNextBoss();
    
    if (!nextBoss) return;
    
    const timeToNext = nextBoss.timeToNext;
    
    // Notify at 5 minutes and 1 minute before spawn
    if (timeToNext === 5) {
        const message = `⚠️ <b>AVISO - 5 MINUTOS</b>\n\n🐉 <b>${nextBoss.nome.replace('<br>', ' ')}</b>\n📍 ${nextBoss.local}\n🕐 Aparece às ${nextBoss.nextHour}:XX`;
        
        // Send to all subscribed users (you need to maintain a user database)
        // await sendToAllSubscribers(message);
        
        // Send to Discord
        await sendDiscordMessage('', [{
            title: '⚠️ Boss em 5 minutos!',
            description: `**${nextBoss.nome.replace('<br>', ' ')}**\n📍 ${nextBoss.local}\n🕐 ${nextBoss.nextHour}:XX`,
            color: 0xffd700,
            timestamp: new Date().toISOString()
        }]);
    }
    
    if (timeToNext === 1) {
        const message = `🚨 <b>ÚLTIMO AVISO - 1 MINUTO</b>\n\n🐉 <b>${nextBoss.nome.replace('<br>', ' ')}</b>\n📍 ${nextBoss.local}\n🕐 Aparece AGORA às ${nextBoss.nextHour}:XX`;
        
        await sendDiscordMessage('', [{
            title: '🚨 Boss em 1 minuto!',
            description: `**${nextBoss.nome.replace('<br>', ' ')}**\n📍 ${nextBoss.local}\n🕐 ${nextBoss.nextHour}:XX`,
            color: 0xff4444,
            timestamp: new Date().toISOString()
        }]);
    }
}

// Webhook handler for deployment (Netlify/Vercel Functions)
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Handle Telegram webhook
        const update = req.body;
        
        if (update.message) {
            handleTelegramCommand(update.message);
        }
        
        res.status(200).json({ ok: true });
    } else if (req.method === 'GET') {
        // Health check or manual trigger
        await checkAndNotifyUpcomingBosses();
        res.status(200).json({ message: 'Bot is running!' });
    }
}

// For Node.js server deployment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleTelegramCommand,
        sendTelegramMessage,
        sendDiscordMessage,
        checkAndNotifyUpcomingBosses,
        getNextBoss
    };
}

/* 
SETUP INSTRUCTIONS:

=== TELEGRAM BOT (FREE) ===
1. Open Telegram and search for @BotFather
2. Send /newbot and follow instructions
3. Copy the bot token and replace TELEGRAM_BOT_TOKEN
4. Set webhook: POST to https://api.telegram.org/botYOUR_TOKEN/setWebhook
   Body: {"url": "https://your-domain.com/api/telegram"}

=== DISCORD WEBHOOK (FREE) ===
1. Go to your Discord server settings
2. Integrations > Webhooks > New Webhook
3. Copy webhook URL and replace DISCORD_WEBHOOK_URL

=== DEPLOYMENT OPTIONS ===

Option 1: Netlify Functions (FREE)
- Create netlify/functions/telegram.js with this code
- Deploy to Netlify

Option 2: Vercel Functions (FREE)  
- Create api/telegram.js with this code
- Deploy to Vercel

Option 3: Railway/Render (FREE tier)
- Create Node.js server with this code
- Deploy to Railway or Render

=== CRON JOB FOR AUTO-NOTIFICATIONS ===
Add to your deployment:
- Netlify: Use Netlify scheduled functions
- Vercel: Use Vercel cron jobs
- Railway: Use node-cron package

Example cron (every minute):
fetch('https://your-domain.com/api/telegram')
  .then(() => console.log('Notification check completed'));
*/ 