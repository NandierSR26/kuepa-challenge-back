import { Server } from "./server";


(async()=> {
  main();
})();


async function main() {

  const server = new Server({
    port: 3000,
  });

  server.start();
}