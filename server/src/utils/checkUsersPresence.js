const Ping = require('ping');
const DB = require("../dbApi/db");
const { sleep } = require("./utils");


// this class is used to find out if users are at home checking their ip adresses
class CheckUsersPresence {

    constructor() {

    }

    saveStatus(status) {
        DB.users.setStatusOfUsers(status);
    }

    async ping(host) {

        let { alive: ping1 } = await Ping.promise.probe(host);
        await sleep(2000);
        let { alive: ping2 } = await Ping.promise.probe(host);

        return (ping1 || ping2)

    }

    async check() {
        let isAlive = false;

        try {

            const IPs = DB.users.getUsersIPs();
            for (let host of IPs) {

                isAlive = await this.ping(host);

                if (isAlive) {
                    this.saveStatus(isAlive);
                    return this.scheduleTimeout(isAlive); // if one of users at home
                }
            }

            this.saveStatus(isAlive);

        } catch (error) {
            console.error(error.message)
        }

        this.scheduleTimeout(isAlive);
    }

    scheduleTimeout(status) {
        let time = 60000 * 30; // if users are at home

        if (!status) {
            time = 60000 * 2; // if users are not at home
        }

        setTimeout(() => {
            this.check();
        }, time);

    }


    start() {
        this.check();
    }

}


module.exports = new CheckUsersPresence();