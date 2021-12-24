import * as redis from "redis";
const client = redis.createClient();

(async () => {
    client.on("connect", () => {
        console.log("redis connected");
    });
    client.on("ready", () => {
        console.log("redis ready to use");
    });

    client.on("end", () => {
        console.log("Client disconnected from redis");
    });

    process.on("SIGINT", () => {
        client.quit();
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
})();

export default client;
