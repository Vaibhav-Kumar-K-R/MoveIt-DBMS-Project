import jwt from "jsonwebtoken";

const verifyManagerToken = (req, res, next) => {
  const token = req.cookies["manager_auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.managerId = decoded.managerId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default {
  verifyManagerToken,
};
