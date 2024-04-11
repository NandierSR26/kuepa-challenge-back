import { connectDB } from "./database/db";
import { Server } from "./server";


(async()=> {
  main();
})();


async function main() {

  await connectDB({
    dbName: 'chatdb',
    mongoUrl: 'mongodb+srv://main_user:BE9y9zyOn8v8lEpO@kuepa-technical-test.dldmio4.mongodb.net/kuepadb?retryWrites=true&w=majority&appName=kuepa-technical-test'
  });

  const server = new Server({
    port: 3000,
  });

  server.start();
}