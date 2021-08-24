import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import game from './routes/game';
import mails from './routes/mailing';
import promo from './routes/promo';
import paypal from './routes/paypal';
import stripe from './routes/stripe';
import transaction from './routes/transaction';
import reference from './routes/reference';
import recla from './routes/recla';
// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	recla(app);
    promo(app)
    paypal(app)
    stripe(app)
	user(app);
	game(app);
	mails(app);
	user(app);
    transaction(app);
	reference(app);
	return app
}