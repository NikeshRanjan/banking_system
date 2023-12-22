const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        console.log("db-sting", process.env.CONNECTION_STRING)
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "DataBase Connected:",
            connect.connection.host,
            connect.connection.name
        );
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = dbConnect;
