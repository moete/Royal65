import { Request, Response } from "express";
import Services from "../../services";
import TournamentService from "../../services/tournamentservice";

const tournamentService: any = new Services.TournamentService();

const Addtournament = (req: Request, res: Response) => {
  try {
    const tournament = tournamentService.save({
      title: req.body.title,
      price: req.body.price,
      status: req.body.status,
      start_date: req.body.start_date,
      end_time: req.body.end_time,
      game: req.body.game,
      photo: req.file?.path ? req.file : null,
      entry_fee: req.body.entry_fee,
      capacity: req.body.capacity,
      description: req.body.description,
    });
    if (tournament.message) {
      return res.status(400).send(tournament);
    }
    tournament
      .then((succ: any) => {
        res.status(200).send({ message: "tournament successfully created" });
      })
      .catch((err: any) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Please Verify tournament information!" });
      });
  } catch {}
};
const getAllTournaments = async (req: any, res: Response) => {
  res.status(200).send({ data: await tournamentService.getAllTournaments() });
};
const getTournamentById = async (req: Request, res: Response) => {
  try {
    // const id = req.params.id.trim();
    const response = await tournamentService.getTournamentById(req.params.id);
    console.log(response);
    if (response) res.status(200).send({ data: response });
    else res.status(400).send({ message: "Please Verify your information!" });

    // if (response) res.status(200);
    // else res.status(400).send({ message: "Please Verify your information!" });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ message: "An error has occurred!" });
  }
};
const getTournamentByTitle = async (req: Request, res: Response) => {
  try {
    const response = await tournamentService.getByTitle(req.params.title);
    console.log(response);
    if (response) res.status(200);
    else res.status(400).send({ message: "please verify your information" });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ message: "An error has occured" });
  }
};

const join = async (req: any, res: Response) => {
  try {
    const tournament = await tournamentService.joinTournament({
      _id: req.body.id,
      userId: req.userId,
    });
    if (tournament)
      res.status(200).send({ message: "You Are successfully joined" });
    else res.status(400).send({ message: "Please Verify your information!" });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ message: "An error has occurred!" });
  }
};

const deleteTournament = async (req: any, res: Response) => {
  try {
    const _id = req.params.id;

    const tournament = tournamentService.deleteTournament(_id);
    tournament
      .then(async (tournament: any) => {
        res.send({ message: "Tournament was deleted successfully!" });
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).send({ message: "Please Verify your information!" });
      });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ message: "An error has occurred!" });
  }
};

const unjoin = async (req: any, res: Response) => {
  try {
  } catch (error) {}
};

export default {
  Addtournament,
  getAllTournaments,
  getTournamentById,
  getTournamentByTitle,
  join,
  deleteTournament,
};
