const DB=require("../../dbApi/db");


const activateAlarm = () => {

    let msg="Alarm active edildi!";

    try {
        DB.parameters.setAlarmSatus(true);    
    } catch (e) {
        msg="Bir hata oluştu";
    }

    return msg;

};


const deactivateAlarm = () => {

    let msg="Alarm deaktive edildi!";

    try {
        DB.parameters.setAlarmSatus(false);       
    } catch (e) {
        msg="Bir hata oluştu";
    }

    return msg;

};

const actions = {};
actions["aç"] = activateAlarm;
actions["kapat"] = deactivateAlarm;



module.exports = () => {
    return {
        getAlarmActions() {
            return actions;
        }
    }
};