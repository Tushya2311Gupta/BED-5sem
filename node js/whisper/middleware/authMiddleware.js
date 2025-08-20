// Checks if user is logged in by verifying session
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

module.exports = { isAuthenticated };
