const DB=require("../../dbApi/db");


const activateAlarm = () => {

    let msg="The alarm has been activated!";

    try {
        DB.parameters.setAlarmSatus(true);    
    } catch (e) {
        msg="An error occured!";
    }

    return msg;

};


const deactivateAlarm = () => {

    let msg="The alarm has been deactivated!";

    try {
        DB.parameters.setAlarmSatus(false);       
    } catch (e) {
        msg="An error occured!";
    }

    return msg;

};

const actions = {};
actions["on"] = activateAlarm;
actions["off"] = deactivateAlarm;



module.exports = () => {
    return {
        getAlarmActions() {
            return actions;
        }
    }
};