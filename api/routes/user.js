const express = require('express');
const userSchema = require('../models/user.schema');
const checkIfUserExists = require('../middlewares/checkIfUserExists');
const MongoStore = require("connect-mongo")
const userRouter = express.Router()
const session = require("express-session")
const { v4: uuidv4 } = require('uuid');

const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//Post Method

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
	console.log(accessToken)
	console.log(refreshToken)
	try {
		let user = await userSchema.findOne({ email: profile.emails[0].value })
		if (user) {
			return done(null, user)
		}
		else {
			const user = await userSchema.create({
				userId: uuidv4(),
				googleId: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
				isVerified: profile.emails[0].verified,
				profile_pics: profile.photos[0].value,
				refreshToken: refreshToken,  // Save refreshToken
			})
			return done(null, user)
		}
	} catch (error) {
	console.log(error, null);
	}
}
)
)

passport.serializeUser(async (user, done) => {
	console.log(user.userId)
	try {
		done(null, user.userId)
	}
	catch (error) {
		return done(error, null);
	}
})

passport.deserializeUser(async ({ userId }, done) => {
	try {
		const user = await userSchema.findById(userId)
		done(null, user)
	}
	catch (error) {
		done(error, null)
	}
})

//configure express session



app.use(passport.initialize())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: process.env.DATABASE_URL
	}),
	// cookie: { maxAge: 60000 * 60 * 24 * 7 }
}))
app.use(passport.session())


userRouter.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }), async (req, res) => {
})
userRouter.get('/google/redirect', passport.authenticate("google", { failureRedirect: "/" }), async (req, res) => {
	res.redirect("http://localhost:8080/signup")
})

userRouter.get('/logout', passport.authenticate("google", { failureRedirect: "/" }), async (req, res) => {
	req.logout((err) => {
		if (err) return next(err)
		res.redirect("http://localhost:8080/signup")
	})
})

userRouter.post('/login', checkIfUserExists, async (req, res) => {
	res.json(res.user)
	console.log(res.user)
})
//Get all Method
userRouter.get('/user', (req, res) => {
	console.log(req.headers.cookie)
	if (req.isAuthenticated()) {
		res.json(req.user)
	} else {
		res.status(401).json({
			error: "UnAuthorized"
		})
	}
})
userRouter.get('/getAll', (req, res) => {
	res.send('Get All API')
})

//Get by ID Method
userRouter.get('/getOne/:id', (req, res) => {
	res.send('Get by ID API')
})

//Update by ID Method
userRouter.patch('/update/:id', (req, res) => {
	res.send('Update by ID API')
})

//Delete by ID Method
userRouter.delete('/delete/:id', (req, res) => {
	res.send('Delete by ID API')
})

module.exports = app.use('/auth', userRouter);


/* 
	defaultValues = (details: CreateAuthDto) => {
				return {
						profile_pics: `https://ui-avatars.com/api/?name=${details.name}&size=128&background=ca8a04`,
						role: "mentee",
						user_id: uuidv4(),
						plan: "basic",
						visibility: "public",
						isVerified: false,
						whoCanMessage: "everyone",
						...details,
				}
		} */

/* 
	email: profile.emails[0].value,
			isVerified: profile.emails[0].verified,
			profile_pics: profile.photos[0].value,
			name: profile.displayName */
