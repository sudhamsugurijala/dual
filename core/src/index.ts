import { WebSocketServer } from "ws";
import { GameManager } from "./game/GameManager";

const wss = new WebSocketServer({ port: 9090 }) ;
const gameManager: GameManager = new GameManager();

console.log("Server listening...");

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);
  ws.on("disconnect", () => gameManager.removeUser(ws));
});
