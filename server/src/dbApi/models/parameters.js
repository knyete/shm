



module.exports = (getDbInstance) => {


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

    const setAlarmSatus=(status)=>{
        const db = getDbInstance();
        db.set("parameters.isAlarmActivated", status).write();
    };


    return {
        getStatusOfAlarm,
        getNightModeTimeRange,
        setAlarmSatus
    }

};