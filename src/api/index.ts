import { Router } from 'express';
import auth from './routes/auth';
import transaction from './routes/transaction';
import user from './routes/user';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
    transaction(app);
	return app
}