const Telegraf = require('telegraf');
const Config = require('config');
const Routes=require("./routes")();



const bot = new Telegraf(Config.get("telegram.token"));


const start = () => {

    bot.start((ctx) => {
        console.log(ctx.from);
        return ctx.reply("Merhaba, bu bot sadece yetkilendirilmiş kişiler tarafından kullanılabilir.\
        Yetkilendirilmemiş kişilerin mesajları yok sayılacaktır.");
    });

    bot.command('help',Routes.help);



    bot.startPolling();

};



module.exports = { start };

