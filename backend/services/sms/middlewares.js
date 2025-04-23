const jwt = require('jsonwebtoken');

// Authentication middleware
const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Login required!" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded._id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};


const requireRoleSeller = async (req, res, next) => {
  console.log(decoded.role)
  if (decoded.role === "seller") {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }

}

const requireRoleAdmin = async (req, res, next) => {
  if (decoded.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }

}

const requireRoleBuyer = async (req, res, next) => {
  if (decoded.role === "buyer") {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }

}

exports.requireAuth = requireAuth
exports.requireRoleSeller = requireRoleSeller;
exports.requireRoleAdmin = requireRoleAdmin;
exports.requireRoleBuyer = requireRoleBuyer;