const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");

const secretKey = "MySQL";

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const blacklistedToken = await BlacklistedToken.findOne({
      where: { token },
    });

    if (blacklistedToken) {
      return res.status(401).json({ message: "Token đã bị thu hồi" });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
