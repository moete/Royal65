
import { Request, Response } from 'express';
import Services from "../../services/"
const matchService: any = new Services.MatchService()
import { PLAYERS_JOIN, START_GAME, GET_STATE, JOIN_SOLITAIRE_GAME, GAME_END, NEW_SOLITAIRE_GAME } from "../../config/types";


const save = async (req: any, res: Response) => {
    console.log("save ", req.body)
    try {
        const body = req.body;
        const game = await matchService.save({
            amount: body.amount,
            userId: req.userId,
            free: body.free,
            status: body.status,
            password: body.password,
            capacity: body.capacity,
            name: body.name
        })
        if (game.message) {
            return res.status(400).send(game);
        }

        if (game) {

            return res.status(200).send({ message: "Game successfully created", match: game });
        }
        else
            return res.status(500).send({ message: "Please Verify your information!" });

    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};


const myGames = async (req: any, res: Response) => {

    try {
        const myRoom = matchService.myGames(req.userId)

        myRoom.then(
            (myRoom: any) => {
                res.status(200).send({ data: myRoom });
            }
        ).catch((err: any) => {
            console.log(err);
            res.status(500).send({ message: "An error has occurred!" });
        })
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};

const getMatchByUser = async (req: any, res: Response) => {

    try {
        const myRoom = matchService.getMatchByUser(req.userId)

        myRoom.then(
            (myRoom: any) => {
                res.status(200).send({ room: myRoom });
            }
        ).catch((err: any) => {
            console.log(err);
            res.status(500).send({ message: "An error has occurred!" });
        })
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};

const saveTransaction = async (req: any, res: Response) => {
    try {
        const gameT = matchService.saveTransaction({
            userId: req.userId,
            gameId: req.body.gameId
        })
        if (gameT.message) {

            return res.status(400).send(gameT);
        }

        gameT.then(
            (succ: any) => {

                res.status(200).send({ message: "Game Transactions successfully created" });
            }
        ).catch((err: any) => {

            console.log(err);
            res.status(500).send({ message: "Please Verify your information!" });
        })
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};


const deleteGame = async (req: any, res: Response) => {

    try {

        const _id = req.params.id;

        const game = matchService.deleteGame(_id);
        game.then(
            async (game: any) => {

                res.send({ message: "Game was deleted successfully!" });
            }
        ).catch((err: any) => {
            console.log(err); res.status(500).send({ message: "Please Verify your information!" });
        })

    } catch (err: any) {
        console.log(err);
        res.status(500).send({ message: "An error has occurred!" });
    }

}




const getRoomById = async (req: Request, res: Response) => {
    try {
        const room = await matchService.getRoomById(req.params.id)
        if (room)
            return res.status(200).send({ data: room });
        else
            return res.status(400).send({ message: "Please Verify your information!" });

    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};

const getAll = async (req: Request, res: Response) => {

    try {

        res.status(200).send({ data: await matchService.getAll() });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};


const getAllTransactions = async (req: Request, res: Response) => {

    try {

        res.status(200).send({ data: await matchService.getTransactions() });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};



const join = async (req: any, res: Response) => {
    console.log("join ", req.body)
    try {
        const socket = req.app.get('socket')
        const game = await matchService.join({
            _id: req.body._id,
            password: req.body.password,
            userId: req.userId,
        })

        if (game.message) {
            return res.status(400).send(game);
        }


        if (game) {

            game.players.forEach((player: any, index: any) => {
                if (index != game.players.length - 1)
                    socket.emit(`${player._id}`, { type: PLAYERS_JOIN, data: game })
            })
            socket.emit(`${game.players[0]._id}`, { type: JOIN_SOLITAIRE_GAME, data: game })
            res.status(200).send({ message: "You Are successfully joined", game });
        }
        else
            res.status(400).send({ message: "Please Verify your information!" });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }


};

const unJoin = async (req: any, res: Response) => {

    try {

        const game = await matchService.join({
            _id: req.body._id,
            userId: req.userId,
        })
        if (game)
            res.status(200).send({ message: "You Are successfully joined" });
        else
            res.status(400).send({ message: "Please Verify your information!" });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};

const getOpen = async (req: any, res: Response) => {

    try {
        res.status(200).send({ data: await matchService.getOpen() });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};

const addUpdateScore = async (req: Request, res: Response) => {

    try {
        const score = await matchService.addUpdateScore({
            scoreId: req.body.scoreId,
            score: req.body.score,
            player: req.body.player,
            game: req.body.game,
        })

        if (score)
            res.status(200).send({ message: "Updated successfully" });
        else
            res.status(400).send({ message: "Please Verify your information!" });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }



};


const getScoreByGameId = async (req: Request, res: Response) => {
    try {
        const score = await matchService.getScoreByGameId(req.params.id)
        if (score)
            return res.status(200).send({ data: score });
        else
            return res.status(400).send({ message: "Please Verify your information!" });

    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};


const getScoresByUserId = async (req: Request, res: Response) => {

    try {

        const score = await matchService.getScoresByUserId(req.params.id)
        if (score)
            res.status(200);
        else
            res.status(400).send({ message: "Please Verify your information!" });
    } catch (err: any) { console.log(err); res.status(500).send({ message: "An error has occurred!" }); }

};


export default {
    save,
    getAll,
    join,
    unJoin,
    getOpen,
    addUpdateScore,
    getScoreByGameId,
    getScoresByUserId,
    deleteGame,
    saveTransaction,
    getAllTransactions,
    getMatchByUser,
    myGames,
    getRoomById
}