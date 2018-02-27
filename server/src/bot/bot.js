const Telegraf = require('telegraf');
const Config = require('config');
const Routes = require("./commandRoutes")();
const Mdlw = require("./middlewares");


class Bot {
    
    constructor(){
        this.bot = new Telegraf(Config.get("telegram.token"));

    }

    start(){

        this.bot.start((ctx) => {
            return ctx.reply("Merhaba, bu bot sadece yetkilendirilmiş \
            kişiler tarafından kullanılabilir.\
            Yetkilendirilmemiş kişilerin mesajları yok sayılacaktır.");
        });
    
        this.bot.use(Mdlw.auth);
    
        this.bot.command('help', Routes.help);
        this.bot.command('alarm', Routes.alarm);
        this.bot.command("ambiance",Routes.ambiance);
    
    
        this.bot.startPolling();   
    }

    get telegram(){
        return this.bot.telegram;
    }
}


module.exports = new Bot()



/* const bot = new Telegraf(Config.get("telegram.token"));


const start = () => {

    bot.start((ctx) => {
        return ctx.reply("Merhaba, bu bot sadece yetkilendirilmiş \
        kişiler tarafından kullanılabilir.\
        Yetkilendirilmemiş kişilerin mesajları yok sayılacaktır.");
    });

    bot.use(Mdlw.auth);

    bot.command('help', Routes.help);
    bot.command('alarm', Routes.alarm);
    bot.command("ambiance",Routes.ambiance);


    bot.startPolling();

};

const getInstance = () => {
    return bot;
};
 */




