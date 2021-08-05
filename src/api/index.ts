import { Router } from "express";
import recla from "./routes/recla";
export default () => {
    const app = Router();
    recla(app)

    return app ;

}