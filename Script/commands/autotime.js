const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.1',
    hasPermssion: 0,
    credits: 'Shahadat Islam',
    description: 'Automatically sends messages at scheduled times (BD Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: '__-এখন রাত ১২টা বেজে গেলো সবার কাজ হয়ে গেলো-!!😒🤟\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '1:00 AM', message: 'এখন সময় রাত 1:00 AM ⏳\nকিরে তুই এখনো ঘুমাস নাই? তাড়াতাড়ি ঘুমিয়ে পড়!😾😴🛌', special: null },
    { time: '2:00 AM', message: '__-এখন রাত ২টা বাজে যারা প্রেম করে তারা জেগে আসে-!!🤭🐸\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '3:00 AM', message: '__-এখন রাত ৩টা বাজে-কিছু মানুষ প্রেম করে😩কিছু মানুষ ঘুমায়😑আমি শুধু জেগে আসি-!!😶\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '4:00 AM', message: '__-এখন রাত ৪টা বাজে-একটু পর ফজরের আযান দিবে- নামাজ পড়ে নিও সবাই-!!😍😘\n\𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '5:00 AM', message: '__-এখন ভোর ৫টা বাজে সবাই নামাজ পড়ছো তো-!!🤨না পড়লে পরে নাও ok-!!😍👍\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '6:00 AM', message: '__-এখন সকাল ৬টা বাজে-ঘুম থেকে উঠো সবাই-আর পড়তে বসো-!!😾🔪\n\𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '7:00 AM', message: '__-এখন সকাল ৭টা বাজে সবাই দাত মেজে-ব্রেকফাস্ট করে নাও-!!🍝😋🍜\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '8:00 AM', message: '__-এখন সকাল ৮ টা বাজে-সবার স্কুল-কলেজের সময় হইছে হয়তো-চলে যেও কিন্তু-!!🤗\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '9:00 AM', message: '__-এখন সকাল ৯ টা বাজে মন দিয়ে কাজ ও পড়াশুনা করো সবাই-!!🤗😚\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '10:00 AM', message: 'এখন সময় সকাল 10:00 AM ⏳\nকিরে ভন্ড, তুই আজ কলেজ যাস নাই? 😜📚🙄', special: null },
    { time: '11:00 AM', message: 'এখন সময় সকাল 11:00 AM ⏳\nনাটক কম কর পিও~ বস এখন বিজি আছে!🙄📱💼', special: null },
    { time: '12:00 PM', message: 'এখন সময় দুপুর 12:00 PM ⏳\nGood Afternoon! 🌞🙌🌸', special: null },
    { time: '1:00 PM', message: 'এখন সময় দুপুর 1:00 PM ⏳\nভন্ড কোথাকার মোবাইল বন্ধ করে জোহরের নামাজ পড়ে নাও😻❣️🥰', special: null },
    { time: '2:00 PM', message: '__-এখন দুপুর ২টা বাজে-সবাই দুপুরের খাবার খেয়ে নাও-!!🍜😋🍝\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '3:00 PM', message: '__-এখন দুপুর ৩টা বাজে-সবাই একটু ঘুমাও-!!😒😴\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '4:00 PM', message: '__-এখন বিকাল ৪টা বাজে আসরের আযান দিলে-সবাই নামাজ পড়ে নিও-!!😍😘\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '5:00 PM', message: '__-এখন বিকাল ৫টা বাজে-কেউ খেলা ধুলা করলে মাঠে যাও-!!😻\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '6:00 PM', message: '__-এখন সন্ধ্যা ৬টা বাজে-সবাই হাত মুখ ধুয়ে কিছু খেয়ে নাও এবং পরিবারের সাথে সময় কাটাও-!!😍😘\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '7:00 PM', message: '__-এখন সন্ধ্যা ৭ টা বাজে সবাই এখন এশারের নামাজ পড়ে নাও-!!🤗🤗\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '8:00 PM', message: '__-এখন রাত ৮টা বাজে-ফোন রেখে একটু পড়তে বসো সবাই-!!🐸\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '9:00 PM', message: '__-এখন রাত ৯টা বাজে সবাই কি শুয়ে পড়লা-!! গ্রুপ এ আসো সবাই-!!🙂👍\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '10:00 PM', message: '__-এখন রাত ১০টা বাজে সবাই আড্ডা দিচ্ছে -আমার বউ নাই রে ভাই🥺ঘুম ও আসে না😭আড্ডা ও দিতে পারি না🥺কি জ্বালা-!!😞💔\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null },
    { time: '11:00 PM', message: '__-এখন রাত ১১টা বাজে-কিছু কিছু মানুষ chrome a ঢুকছে-!!😩💦👍\n\n𝐌𝐀𝐒𝐇𝐈𝐊 ☢️_𖣘 -𝐌𝐀𝐇𝐈𝐑 ⚠️', special: null }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTOSENT COMMAND LOADED (BD TIME) ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Dhaka';
        rule.hour = hour24;
        rule.minute = parseInt(minute, 10);

        schedule.scheduleJob(rule, () => {
            if (!global.data?.allThreadID) return;
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });

        console.log(chalk.hex("#00FFFF")(`Scheduled (BDT): ${time} => ${message}`));
    });
};

module.exports.run = () => {
    // Main logic is in onLoad
};
