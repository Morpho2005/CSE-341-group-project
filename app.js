// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const setupSwagger = require('./swagger');
const errorMiddleware = require('./middleware/errorMiddleware');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const passport = require('passport');

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
