const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Models=require("./models");

let adapter = null;
let db = null;


const connect = (path) => {
    adapter = new FileSync(path);
    db = Low(adapter);
    db.defaults({users: [],ambiance:{},parameters:{}}).write();
}

const getInstance = () => db;



module.exports = Object.assign({},{connect,getInstance},Models(getInstance));