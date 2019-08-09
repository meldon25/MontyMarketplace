const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()

const SECRET = process.env.APP_SECRET

const signToken = (payload) => jwt.sign(payload, SECRET)

passport.use(
	'signup',
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: 'username',
			passwordField: 'password'
		},
		async (req, username, password, done) => {
			try {
				password = bcrypt.hashSync(password, SaltFactor)
				console.log(req.body)
				const user = await new User({
					name: { first: req.body.firstname, last: req.body.lastname },

					// firstName: req.body.name.firstName,
					email: req.body.email,
					username,
					password
				})
				if (!user)
					return done(null, false, { msg: '***Unable to create user***' })
				done(null, user)
			} catch (error) {
				done(error)
			}
		}
	)
)

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password'
		},
		async (username, password, done) => {
			try {
				const user = await User.findOne().where({ username: username })

				if (!user) return done(null, false, { msg: 'User not found' })

				const authenticateUser = await bcrypt.compare(password, user.password)
				if (!authenticateUser)
					return done(null, false, { msg: 'Could not validate password' })

				return done(null, user, { msg: 'User Authenticated' })
			} catch (error) {
				return done(error)
			}
		}
	)
)

passport.use(
	new JWTStrategy(
		{
			secretOrKey: SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		},
		async (token, done) => {
			try {
				const user = await User.findById(token.id)
				user ? done(null, user) : done(null, false)
			} catch (error) {
				done(error)
			}
		}
	)
)

const userAuthorized = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (error, token) => {
		if (error || !token) {
			let err = new Error('Could not authenticate!')
			err.status = 401
			next(err)
		}
		try {
			const user = await User.findById(token.id)
			req.user = user
		} catch (error) {
			next(error)
		}
		next()
	})(req, res, next)
}

module.exports = {
	userAuthorized,
	passport,
	signToken
}
