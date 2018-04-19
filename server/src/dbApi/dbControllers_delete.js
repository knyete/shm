const utils = require("../utils/utils");

module.exports = (getDbInstance) => {


    // ok
    const updateAmbianceValues = ({ temp = 0, hum = 0, pre = 0, air = 0 }) => {
        const db = getDbInstance();

        //db.update('ambiance', data => payload).write();
        db.set("ambiance.temp", temp).write();
        db.set("ambiance.hum", hum).write();
        db.set("ambiance.pre", pre).write();
        db.set("ambiance.air", air).write();
        db.set("ambiance.time", utils.getLocalTime()).write();
    };

    const getUser = (id_) => {
        const db = getDbInstance();
        let user = db.get("users").find({ id: id_ }).value();
        return user;
    };

    const getUsers = () => {
        const db = getDbInstance();
        let users = db.get("users").value();
        return users;
    };

    // internal IPs of owners
    const getUsersIPs = () => {
        const users = getUsers();
        const IPs = [];

        users.forEach(user => {
            if (user.internalIP) {
                IPs.push(user.internalIP);
            }
        });

        return IPs;
    };

    const setStatusOfUsers=(status)=>{
        const db = getDbInstance();
        db.set("parameters.areUsersAtHome", status).write();
    };

    const getStatusOfUsers=()=>{
        const db = getDbInstance();
        let {areUsersAtHome} = db.get("parameters").value();
        return areUsersAtHome;
    };

    

    const getStatusOfAlarm=()=>{
        const db = getDbInstance();
        let {isAlarmActivated} = db.get("parameters").value();
        return isAlarmActivated;
    };

    const getNightModeTimeRange=()=>{
        const db = getDbInstance();
        let {nightModeTimeRange} = db.get("parameters").value();
        return nightModeTimeRange;
    };



    return {
        updateAmbianceValues,
        getUser,
        getUsers,
        getUsersIPs,
        setStatusOfUsers,
        getStatusOfUsers,
        getStatusOfAlarm,
        getNightModeTimeRange

    };


};