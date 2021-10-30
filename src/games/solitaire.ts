import utils from "../common/utils";
export default class Solitaire {
    states: {[key: string]: any} = {};
    rooms:  {[key: string]: any} = {};
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
            },
            duration:240000
        }
    }

    newGame(clientId: any, roomName: any) {
        const state = { 
            options:this.options,
            randomNumbers:utils.makeRandomNumbers(51)
         }
        this.states[roomName] = {state,playerOne:null,playerTwo:null,finish:false}
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

    setState(roomName: any,state:any) {
        return this.states[roomName]=state
    }
    
    getClientRoomName(clientId: any) {
        return this.rooms[clientId]
    }

    

}