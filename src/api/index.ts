import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import match from './routes/match';
import mails from './routes/mail';
import paypal from './routes/paypal';
import stripe from './routes/stripe';
import transaction from './routes/transaction';
import reference from './routes/reference';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
    paypal(app)
    stripe(app)
	user(app);
	match(app);
	mails(app);
	user(app);
    transaction(app);
	reference(app);

	return app
}