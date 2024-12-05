import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";
import dotenv from "dotenv";
import io from "./socket-io";
dotenv.config();

const port = parseInt(process.env.PORT || "4000", 10);
const dev = process.env.MODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  // เพิ่ม socket เข้ามาใน server   
  io?.attach(httpServer);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.MODE_ENV
    }`
  );
});
