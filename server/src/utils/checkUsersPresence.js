const Ping = require('ping');
const DB = require("../dbApi/db");

const ONEHOUR=(60000*60);

// this class is used to find out if users are at home checking their ip adresses
class CheckUsersPresence {

    constructor() {

    }

    saveStatus(status) {
        DB.setStatusOfUsers(status);
    }

    async check() {

        try {

            const IPs = DB.getUsersIPs();
            for (let host of IPs) {

                let { alive } = await Ping.promise.probe(host);

                if (alive) {
                    this.saveStatus(true);
                    return;
                }
            }

            this.saveStatus(false);

        } catch (error) {
            console.error(error.message)
        }


    }


    start() {
        this.check();

        setInterval(() => {
            this.check();
        }, ONEHOUR);
    }

}


module.exports = new CheckUsersPresence();