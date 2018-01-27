


const activateAlarm = () => {

    return "Alarm activated";

};


const deactivateAlarm = () => {

    return "Alarm deactivated";

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