
module.exports = (getDbInstance) => {

    const getUser = (id_) => {
        const db = getDbInstance();
        let user = db.get("users").find({ id: id_ }).value();
        return user;
    };

    const getUsers = () => {
        const db = getDbInstance();
        let users = db.get("users").value();
        return users;
    };

    // internal IPs of owners
    const getUsersIPs = () => {
        const users = getUsers();
        const IPs = [];

        users.forEach(user => {
            if (user.internalIP) {
                IPs.push(user.internalIP);
            }
        });

        return IPs;
    };

    const setStatusOfUsers=(status)=>{
        const db = getDbInstance();
        db.set("parameters.areUsersAtHome", status).write();
    };

    const getStatusOfUsers=()=>{
        const db = getDbInstance();
        let {areUsersAtHome} = db.get("parameters").value();
        return areUsersAtHome;
    };



    return {
        getUser,
        getUsers,
        getUsersIPs,
        setStatusOfUsers,
        getStatusOfUsers
    }

};