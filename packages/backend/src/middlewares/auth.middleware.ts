import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';
import UserService from '@/services/user.service';

const userService = new UserService();

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET || 'secret',
};

passport.use(
	new Strategy(opts, async (jwt_payload, done) => {
		try {
			const user = await userService.findByEmail(jwt_payload.email);
			if (user) return done(null, user);
		} catch (error) {
			return done(error, false);
		}
	}),
);
