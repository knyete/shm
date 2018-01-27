

const auth=async (ctx, next)=>{
    //console.log(ctx.from);
    console.log(ctx.message);

    await next();

};


module.exports={auth};