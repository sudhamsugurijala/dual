import { WebSocket } from "ws";
import { INIT_GAME } from "./Messages";
import { PLAYER1_COLOR, PLAYER2_COLOR } from "../constants/Constants";

export class Game{
    private p1: WebSocket;
    private p2: WebSocket;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.p1 = player1;
        this.p2 = player2;
        this.startTime = new Date();

        this.p1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: PLAYER1_COLOR
            }
        }
        ));
        console.log("Player 1 joined the game...");

        this.p2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: PLAYER2_COLOR
            }
        }
        ));
        console.log("Player 2 joined the game...");
    }
}
