const Ambiance=require("./ambiance");
const Users=require("./users");
const Parameters=require("./parameters")



module.exports=(getDbInstance)=>{

    return Object.assign({},
        {parameters:Parameters(getDbInstance)},
        Ambiance(getDbInstance),
        Users(getDbInstance)
    );

}