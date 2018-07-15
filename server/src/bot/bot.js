const Telegraf = require('telegraf');
const Config = require('config');
const Routes = require("./botRoutes")();
const Mdlw = require("./middlewares");
const OutgoingActions=require("./outgoingActions/index")


const bot = new Telegraf(Config.get("telegram.token"));



const start = () => {

    let msg="Hi, I'm here to help you with systems installed at home."+
    "So, just tell me what you want to do or learn."

    bot.start((ctx) => {
        return ctx.reply(msg);
    });

    bot.use(Mdlw.auth);

    bot.command('help', Routes.help);
    bot.command('alarm', Routes.alarm);
    bot.command("ambiance",Routes.ambiance);
    bot.command("report",Routes.report);
    bot.command("chart",Routes.chart);


    bot.startPolling();

};

module.exports=Object.assign({},{start},OutgoingActions(bot));










/* class Bot {
    
    constructor(){
        this._bot = new Telegraf(Config.get("telegram.token"));
        this._outgoingActions=OutgoingActions(this._bot);

    }

    start(){

        this._bot.start((ctx) => {
            return ctx.reply("Merhaba, bu bot sadece yetkilendirilmiş \
            kişiler tarafından kullanılabilir.\
            Yetkilendirilmemiş kişilerin mesajları yok sayılacaktır.");
        });
    
        this._bot.use(Mdlw.auth);
    
        this._bot.command('help', Routes.help);
        this._bot.command('alarm', Routes.alarm);
        this._bot.command("ambiance",Routes.ambiance);
    
    
        this._bot.startPolling();   
    }

    outgoingActions(){
        return this._outgoingActions;
    }


}


module.exports = new Bot() */





