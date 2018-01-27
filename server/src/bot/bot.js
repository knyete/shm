const Telegraf = require('telegraf');
const Config = require('config');
const Routes = require("./routes")();
const Mdlw = require("./middlewares");



const bot = new Telegraf(Config.get("telegram.token"));


const start = () => {

    bot.start((ctx) => {
        return ctx.reply("Merhaba, bu bot sadece yetkilendirilmiş \
        kişiler tarafından kullanılabilir.\
        Yetkilendirilmemiş kişilerin mesajları yok sayılacaktır.");
    });

    bot.use(Mdlw.auth);

    bot.command('help', Routes.help);
    bot.command('alarm', Routes.alarm);


    bot.startPolling();

};

const getInstance = () => {
    return bot.telegram;
};



module.exports = { start, getInstance };

