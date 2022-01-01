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

    newGame(client: any, roomName: any,draw3:any) {
        const options={...this.options}
        options.draw3=draw3
        const state = { 
            options,
            randomNumbers:utils.makeRandomNumbers(51)
         }
        this.states[roomName] = {state,playerOne:{clientId:client._id,name:client.name,photo:client.photo},playerTwo:null,finish:false}
        this.rooms[client._id] = roomName
        
    }


    joinGame(client: any, roomName: any) {
        let state = this.states[roomName]
        state.playerTwo={clientId:client._id,name:client.name,photo:client.photo}
        this.setState(roomName,state)
        this.rooms[client._id] = roomName
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
    
    getClientInRoomName(roomName: any) {
        let keys=Object.keys(this.rooms),i=0,clients:any=[]
        while(i<keys.length && clients.length < 2 ){
            if(this.rooms[keys[i]]===roomName)
                clients.push(keys[i])
            i++;
        }

        return clients;
    }

    removeGame(roomName: any,clients: any){
        delete this.states[roomName]
        clients.forEach((id:any)=> delete this.rooms[id])
    }

    

}