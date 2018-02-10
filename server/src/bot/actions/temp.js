const DB=require("../../dbApi/db");

const getTempAndHumidity=()=>{
    const db=DB.getInstance();

    let msrmts=db.get("measurements").value();
    let {temp,hum}=msrmts; // extract tempreture and humudity

    return `Sıcaklık: ${temp}, Nem : %${hum}`;

}


const actions = {getTempAndHumidity};


module.exports=()=>{

    return {
        getTempActions(){
            return actions;

        }
    }
};