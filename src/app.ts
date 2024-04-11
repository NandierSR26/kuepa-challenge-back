import { connectDB } from "./database/db";
import { Server } from "./server";


(async()=> {
  main();
})();


async function main() {

  await connectDB({
    dbName: 'chatdb',
    mongoUrl: 'mongodb://mongo-user:123456@localhost:27017'
  });

  const server = new Server({
    port: 3000,
  });

  server.start();
}