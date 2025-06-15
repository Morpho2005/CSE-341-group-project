// server.js
const app = require('./app');
const connectDB = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

require('dotenv').config();

connectDB();

const PORT = process.env.PORT || 3000;

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

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        `Swagger documentation is available at http://localhost:${PORT}/api-docs`,
      );
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
startServer();
