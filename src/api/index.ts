import { Router } from 'express';
import auth from './routes/auth';
import transaction from './routes/transaction';
import user from './routes/user';
import reference from './routes/reference';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
    transaction(app);
	reference(app);
	return app
}