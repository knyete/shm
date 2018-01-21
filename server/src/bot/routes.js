



module.exports=()=>{

    const help=(ctx)=>{
        return ctx.reply("Kullanabileceğiniz komutlar şunlar: \n\/sıcaklık\n\/guvenlik [komut]");
    
    }

    return {help};


};