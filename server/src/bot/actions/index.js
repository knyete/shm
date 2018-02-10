const Alarm =require("./alarm");
const Temp =require("./temp");




const alarm=Alarm();
const temp=Temp();


const actions=Object.assign({},alarm,temp);


module.exports=actions;