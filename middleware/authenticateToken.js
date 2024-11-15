const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });
  try {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token." });

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(403).json({ error: "Token inválido ou expirado" });
  }
};

module.exports = authenticateToken;
