import { WebSocket } from "ws";
import { INIT_GAME } from "./Messages";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(user: WebSocket) {
        this.users.push(user);
        this.addHandler(user);
    }

    removeUser(user: WebSocket) {
        this.users = this.users.filter(existingUser => existingUser !== user);
    }

    private addHandler(user: WebSocket) {
        user.on("message", (data) => {
            const message = JSON.parse(data.toString());
            switch(message.type) {
                case INIT_GAME:
                    if(this.pendingUser) {
                        const game = new Game(this.pendingUser, user);
                        this.games.push(game);
                        this.pendingUser = null;
                    } else {
                        this.pendingUser = user;
                    }
                    break;
                    
            }
        });
    }
}
