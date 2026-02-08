import Redis from "ioredis";

const redis = process.env.REDIS_URL
    ? new Redis(process.env.REDIS_URL)
    : new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        retryStrategy: (times) => {
            // Retry connection every 2 seconds, up to 5 times
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    });

redis.on("connect", () => {
    console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

export default redis;
