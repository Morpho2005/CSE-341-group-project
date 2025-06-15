// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const setupSwagger = require('./swagger');
const errorMiddleware = require('./middleware/errorMiddleware');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({githubID: profile.id}, function (err, user) {
            return done(null, profile)
        //});
    }
));

// Routes
app.use('/api', routes);

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: 'api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/api')
})

// Swagger documentation
setupSwagger(app);

// Error middleware (should be last)
app.use(errorMiddleware);

module.exports = app;
