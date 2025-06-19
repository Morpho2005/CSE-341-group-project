const router = require("express").Router();
const passport = require('passport');

/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags: [Auth]
 *     summary: Login with GitHub (OAuth2)
 *     description: Initiates GitHub OAuth2 flow
 *     security:
 *       - GitHubOAuth: []  # Reference the security scheme
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication
 */
//login with GitHub
router.get('/login', passport.authenticate('github'), (req, res) => {});

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logout user
 *     description: Destroys session and logs out user
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/api')
})

module.exports = router;