import Redis from "ioredis";

const redis = process.env.REDIS_URL
    ? new Redis(process.env.REDIS_URL, {
        tls: process.env.REDIS_URL.startsWith("rediss://") ? {} : undefined,
        maxRetriesPerRequest: 1, // Don't hang the app if Redis is down
    })
    : new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        maxRetriesPerRequest: 1,
    });

redis.on("error", (err) => {
    // Just log, don't crash
    console.error("⚠️ Redis Error (App will continue with DB):", err.message);
});

export default redis;
