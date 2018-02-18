const Alarm =require("./alarm");
const Ambiance =require("./ambiance");




const alarm=Alarm();
const amb=Ambiance();


const actions=Object.assign({},alarm,amb);


module.exports=actions;