import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
  });
};
