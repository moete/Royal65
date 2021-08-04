import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import game from './routes/game';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	game(app);

	return app
}