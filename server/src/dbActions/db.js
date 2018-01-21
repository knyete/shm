const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

let adapter = null;
let db = null;


const connect = (path) => {
    adapter = new FileSync(path);
    db = Low(adapter);
    db.defaults({users: []}).write();
}

const getDB = () => db;

const test=()=>{
    db.get("users").push({id:7,name:"Ferdi"}).write();

};

module.exports = { connect, getDB,test };