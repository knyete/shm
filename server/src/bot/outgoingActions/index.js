const DB = require("../../dbApi/db");



module.exports = (bot) => {

    const sendMessageToAllUsers = async (msg) => {
        const users=DB.getUsers();

        for(let user of users){
            await bot.telegram.sendMessage(user.chatId,msg);
        }

        return true;

    };









    return { sendMessageToAllUsers }



};