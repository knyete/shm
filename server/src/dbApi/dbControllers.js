

module.exports = (getDbInstance) => {

    const getControlers = () => {

        // updates temprature and humudity values to local DB
        const updateTempAndHum = ({ temp = 0, hum = 0 }) => {
            const db = getDbInstance();

            //db.update('measurements', data => payload).write();
            db.set("measurements.temp", temp).write();
            db.set("measurements.hum", hum).write();
        };



        return { updateTempAndHum }

    }


    return { getControlers };

};