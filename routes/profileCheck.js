function profileCheck(req, res, next) {
    if (req.user._id!=req.params.id|| req.user.isAdmin!=true) return res.status(403).send("Access Denied");
    next();
  }
  module.exports = profileCheck;
  