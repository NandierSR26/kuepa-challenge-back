import { envs } from "./config/envs";
import { connectDB } from "./database/db";
import { Server } from "./server";


(async()=> {
  main();
})();


async function main() {

  await connectDB({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  });

  const server = new Server({
    port: envs.PORT,
  });

  server.start();
}