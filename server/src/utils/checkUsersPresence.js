const Ping = require('ping');
const DB = require("../dbApi/db");


// this class is used to find out if users are at home checking their ip adresses
class CheckUsersPresence {

    constructor() {

    }

    saveStatus(status) {
        DB.users.setStatusOfUsers(status);
    }

    async ping(host) {

        let { alive: ping1 } = await Ping.promise.probe(host);
        let { alive: ping2 } = await Ping.promise.probe(host);

        return (ping1 || ping2)

    }

    async check() {

        try {

            const IPs = DB.users.getUsersIPs();
            for (let host of IPs) {

                let alive = await this.ping(host);

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
        }, 60000 * 15);
    }

}


module.exports = new CheckUsersPresence();