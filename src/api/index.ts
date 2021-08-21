import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import game from './routes/game';
import mails from './routes/mail';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	game(app);
	mails(app);

	return app
}