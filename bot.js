const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

// --- CONFIGURATION ---
const TOKEN = '8402932181:AAHApCTN34h20ZtYVamIziiTKsFxXruwo-g'; // Paste your Bot Token
const CHAT_ID = '322614612'; // Paste your Chat ID

// --- MESSAGE VARIATIONS ---
const variations = [
    "Honey, it's time to take your pills",
    "Sweetheart, don't forget your medication",
    "Just a gentle reminder: it is pill time",
    "Time to take your medicine, my love",
    "Please take your pills now, darling",
    "Health check! Time for your pills",
    "My love, please remember your medication",
    "It's 10 o'clock! Time for your pills",
    "Here is your daily reminder to take your medicine",
    "Don't forget to take care of yourself and take your pills",
    "Remember to keep up with your health routine, it's time for the pills",
    "Sending you a reminder for your daily dose, my dear",
    "A quick chime to let you know it's time for your medication",
    "Pill alert! Keep yourself healthy and take them now",
    "It's the perfect time to grab your medicine, sweetheart",
    "You're doing great! Time for your pills now",
    "Keep that smile bright, it's medicine time",
    "Taking care of you! Reminder to take your pills",
    "The clock says 10, which means time for your medication",
    "Just popping in to remind you about your pills",
    "Your health is the priority! Please take your pills",
    "Time to pause for your medication, love",
    "Stay consistent, darling! It's pill reminder time",
    "A moment for you and your health. Pills now!",
    "One small task for great health: take your pills"
];

// --- EMOJI VARIATIONS ---
const emojis = [
    '🦊', '❤️', '😘', '😶‍🌫️', '🤖', '😻', '🐭', '🐨', '🐸', '🦋', '🐣'
];

const bot = new TelegramBot(TOKEN, { polling: true });

console.log('Bot is running...');

// --- HELPER FUNCTION ---
const getRandomMessage = () => {
    // 1. Pick a random text variation
    const randomTextIndex = Math.floor(Math.random() * variations.length);
    const text = variations[randomTextIndex];

    // 2. Pick a random emoji
    const randomEmojiIndex = Math.floor(Math.random() * emojis.length);
    const emoji = emojis[randomEmojiIndex];

    // 3. Combine them
    return `${text} ${emoji}`;
};

// --- FUNCTION TO SEND MESSAGE ---
const sendReminder = () => {
    const message = getRandomMessage();
    
    bot.sendMessage(CHAT_ID, message)
        .then(() => {
            console.log(`Sent: "${message}" at ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}`);
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        });
};

// --- SCHEDULE JOBS (Warsaw Time) ---

// 10:00 AM
cron.schedule('0 10 * * *', sendReminder, {
    scheduled: true,
    timezone: "Europe/Warsaw"
});

// 10:00 PM (22:00)
cron.schedule('0 22 * * *', sendReminder, {
    scheduled: true,
    timezone: "Europe/Warsaw"
});

// Error handling
bot.on('polling_error', (error) => {
    console.log(error.code);
});