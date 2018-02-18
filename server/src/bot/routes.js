const Actions=require("./actions/index");


// helper function to extract command and argument
extractCommArgument=(msg)=>{
    //TODO : Birden fazla argument döncek şekilde modifiye et
    let commAndArg=msg.split(" ");

    let comm=commAndArg[0];
    let arg="";

    if(commAndArg[1]){
        arg=commAndArg[1];
        arg=arg.trim();
    }

    return [comm,arg];
};



module.exports=()=>{

    // route for help
    const help=(ctx)=>{
        return ctx.reply("Kullanabileceğiniz komutlar \
        şunlar:\n\/ambiance\n\/alarm [aç,kapa]\
        \n\/foto");
    
    };


// route form alarm
    const alarm=(ctx)=>{

        let comm,arg;
        [comm,arg]=extractCommArgument(ctx.message.text);

        let actions=Actions.getAlarmActions();
        let action=actions[arg];

        if(!action){
            return ctx.reply(`${comm} komutundan sonra bir boşluk \
            bırakarak aksiyon belirtmelisiniz!`);
        }


        ctx.reply(action());
    };

    // route for ambiance values
    const ambiance=(ctx)=>{
        
        let actions = Actions.getAmbianceActions();

        ctx.reply(actions.getAmbianceValues());
        
    };



    return {help,alarm,ambiance};


};