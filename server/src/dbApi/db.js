const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Controllers=require("./dbControllers");

let adapter = null;
let db = null;


const connect = (path) => {
    adapter = new FileSync(path);
    db = Low(adapter);
    db.defaults({users: [],measurements:{}}).write();
}

const getInstance = () => db;



module.exports = Object.assign({},{connect,getInstance},Controllers(getInstance));