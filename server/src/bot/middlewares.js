const DB=require("../dbApi/db");




// Middeware used to authenticate users
const auth=async (ctx, next)=>{
    //console.log(ctx.from);

    const db=DB.getInstance();

    let user=db.get("users").find({id:ctx.from.id}).value();

    if(!user){
        return ctx.reply("Bu işlemi yapmaya yetkili değilsiniz!");
        //return ctx.leaveChat(ctx.from.id);
    }

    await next();

};


module.exports={auth};