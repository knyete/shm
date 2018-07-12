//const DB=require("../../dbApi/db");
const Ambiance = require("../../models/ambiance");
const Utils = require("../../utils/utils");





module.exports = () => {

    const getLastAmbianceRecord = async () => {

        let msg = "";

        try {
            // get the last record
            const docs = await Ambiance.find().
                sort({ _id: -1 }).
                limit(1).exec();

            if (docs) {
                let { temp, hum, gas, hpa, createdAt } = docs[0];
                createdAt = Utils.dateFromString(createdAt);

                msg = `Temperature: ${temp}°, Humidity : %${hum},\nAir Pressure : ${hpa}, Air Quality : ${gas} \n(${createdAt})`;

            } else {
                msg = "There is no record in the database!"
            }

        } catch (error) {
            msg = `ERROR : ${error.message}`;
        }

        return msg;

    };



    return {
        getAmbianceActions() {
            return {
                getLastAmbianceRecord
            };

        }
    }
};

/* const getAmbianceValues=()=>{
    const db=DB.getInstance();

    let msrmts=db.get("ambiance").value();
    let {temp,hum,pre,air,time}=msrmts; // extract tempreture and humudity

    return `Sıcaklık: ${temp}, Nem : %${hum},\nBasınç : %${pre}, \
    Hava Kalitesi : %${air}\n(${time})`;

} */