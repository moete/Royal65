import utils from "../common/utils";
export default class Solitaire {
    states: {[key: string]: string} = {};
    rooms:  {[key: string]: string} = {};
    private options: any;

    constructor() {
        this.options = {
            draw3: true,
            allowedDraws: Infinity,
            every: 10,
            deduct: 2,
            points: {
                move_to_foundation: 10,
                waste_to_tableau: 5,
                foundation_to_tableau: -15,
                turn_card: 5
            }
        }
    }

    newGame(clientId: any, roomName: any) {
        const state = { ...this.options }
        state.randomNumbers = utils.makeRandomNumbers(51)
        this.states[roomName] = state
        this.rooms[clientId] = roomName
        
    }


    joinGame(clientId: any, roomName: any) {
        let state = this.states[roomName]
        this.rooms[clientId] = roomName
        return state;
    }


    getStates() {
        return {...this.states}
    }

    getRooms() {
        return { ...this.rooms }
    }

    getState(roomName: any) {
        return this.states[roomName]
    }

    getClientRoomName(clientId: any) {
        return this.rooms[clientId]
    }
    

}