const utils = require("../utils/utils");

module.exports = (getDbInstance) => {


        // updates ambiance values to local DB
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
        }

        const getUsers = () => {
            const db = getDbInstance();
            let users = db.get("users").value();
            return users;
        }


        return {
            updateAmbianceValues,
            getUser,
            getUsers
        };


};