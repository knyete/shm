const DB=require("../../dbApi/db");

const getAmbianceValues=()=>{
    const db=DB.getInstance();

    let msrmts=db.get("ambiance").value();
    let {temp,hum,pre,air,time}=msrmts; // extract tempreture and humudity

    return `Sıcaklık: ${temp}, Nem : %${hum},\nBasınç : %${pre}, \
    Hava Kalitesi : %${air}\n(${time})`;

}

const actions = {getAmbianceValues};


module.exports=()=>{

    return {
        getAmbianceActions(){
            return actions;

        }
    }
};