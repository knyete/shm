const Actions = require("./routeActions");


// helper function to extract command and argument
extractCommArgument = (msg) => {
    //TODO : Birden fazla argument döncek şekilde modifiye et
    let commAndArg = msg.split(" ");

    let comm = commAndArg[0];
    let arg = "";

    if (commAndArg[1]) {
        arg = commAndArg[1];
        arg = arg.trim();
    }

    return [comm, arg];
};



module.exports = () => {


    // route for help
    const help = (ctx) => {

        let msg = "Kullanabileceğiniz komutlar şunlar:\n" +
            "\/ambiance\n\/alarm [aç,kapat]\n\/foto\n\/report";

        return ctx.reply(msg);
    };


    // route form alarm
    const alarm = (ctx) => {

        let comm, arg;
        [comm, arg] = extractCommArgument(ctx.message.text);

        const actions = Actions.getAlarmActions();
        let action = actions[arg];

        if (!action) {
            return ctx.reply(`${comm} komutundan sonra bir boşluk \
            bırakarak aksiyon belirtmelisiniz!`);
        }


        ctx.reply(action());
    };

    // route for ambiance values
    const ambiance = (ctx) => {

        const actions = Actions.getAmbianceActions();

        ctx.reply(actions.getAmbianceValues());

    };

    const report=(ctx)=>{

        const actions = Actions.getReportActions();

        ctx.reply(actions.generalReport());

    };



    return { help, alarm, ambiance,report };


};