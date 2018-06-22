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

        let msg = "Commands you can use are:\n" +
            "\/ambiance\n\/alarm [on,off]\n\/foto\n\/report";

        return ctx.reply(msg);
    };


    // route form alarm
    const alarm = (ctx) => {

        let comm, arg;
        [comm, arg] = extractCommArgument(ctx.message.text);

        const actions = Actions.getAlarmActions();
        let action = actions[arg];

        if (!action) {
            return ctx.reply(`${comm} you must define your action after putting a space after this command.`);
        }


        ctx.reply(action());
    };

    // route for ambiance values
    const ambiance = (ctx) => {

        const actions = Actions.getAmbianceActions();

        actions.getLastAmbianceRecord().then((response) => {
            ctx.reply(response);
        });

    };

    const report = (ctx) => {

        const actions = Actions.getReportActions();

        ctx.reply(actions.generalReport());

    };



    return { help, alarm, ambiance, report };


};