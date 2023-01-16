const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers?.authorization.split(`"`)[1];

    if (!token) return res.status(401).send({ message: "Unauthorized" });

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === "jwt expired")
      return res.status(401).send({ message: "Unauthorized" });
    res.status(400).send({ message: "Error" });
  }
};

const verifyTokenSocket = async (socket, next) => {
  const {
    handshake: {
      auth: { token },
    },
  } = socket;

  if (!token) return;

  try {
    let decoded = await jwt.verify(token.split(`"`)[1], process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    if (error.message === "jwt expired")
      return res.status(401).send({ message: "Unauthorized" });
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  verifyToken,
  verifyTokenSocket,
};
