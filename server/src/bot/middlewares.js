const DB=require("../dbApi/db");


// Middeware used to authenticate users
const auth=async (ctx, next)=>{
    //console.log(ctx.from);

    let user=DB.getUser(ctx.from.id);

    if(!user){
        return ctx.reply("Bu işlemi yapmaya yetkili değilsiniz!");
        //return ctx.leaveChat(ctx.from.id);
    }

    await next();

};


module.exports={auth};