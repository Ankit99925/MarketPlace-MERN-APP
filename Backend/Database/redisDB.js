const redis = require("redis");

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

//connect event

async function connectRedis() {
  try {
    await redisClient.on("connect", () => {
      console.log("Redis connected");
    });
  } catch (error) {
    console.log("Redis error: ", error);
  } finally {
    await redisClient.quit();
  }
}

//error handling
redis.on("error", (error) => {
  console.log("Redis error: ", error);
});
