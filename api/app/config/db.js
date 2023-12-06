const mongoose = require('mongoose')
const config = require('../util/constants')

mongoose.set("strictQuery", false);

const connectDb = async () => {
    try {
        await mongoose.connect(config.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
        );
        console.log("Connected to DB");
    } catch (error) {
        console.error("DB connection error:", error.message);
    }

    const db = mongoose.connection;

    db.on("error", (error) => console.error("DB connection error:", error));
    db.once("open", () => console.log("DB connected."));
    db.on("disconnected", () => console.log("DB disconnected."));

    process.on("SIGINT", () => {
        db.close(() => {
            console.log("DB connection closed.");
            process.exit(0);
        });
    });
};

module.exports = connectDb;