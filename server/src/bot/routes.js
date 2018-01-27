const Actions=require("./actions/index");


// helper function to extract command and argument
extractCommArgument=(msg)=>{
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

    const help=(ctx)=>{
        return ctx.reply("Kullanabileceğiniz komutlar \
        şunlar:\n\/sıcaklık\n\/alarm [aç,kapa]\
        \n\/ortam");
    
    };

    const alarm=(ctx)=>{

        let comm,arg;
        [comm,arg]=extractCommArgument(ctx.message.text);

        let actions=Actions.getAlarmActions();
        let action=actions[arg];

        if(!action){
            return ctx.reply(`${comm} komutundan sonra bir boşluk bırakarak aksiyon belirtmelisiniz!`);
        }


        ctx.reply(action());
    };



    return {help,alarm};


};