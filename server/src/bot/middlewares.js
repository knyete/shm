const DB=require("../dbApi/db");


// Middeware used to authenticate users
const auth=async (ctx, next)=>{
    //console.log(ctx.from);

    let user=DB.users.getUser(ctx.from.id);

    if(!user){
        return ctx.reply("You are not authorized to perform this action!");
        //return ctx.leaveChat(ctx.from.id);
    }

    await next();

};


module.exports={auth};