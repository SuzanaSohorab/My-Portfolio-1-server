const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;

const connectDB = async () => {
    try {
        await client.connect();

        db = client.db("portfolio_database");

        await db.command({ ping: 1 });

        console.log("MongoDB Connected Successfully!");

        return db;
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };