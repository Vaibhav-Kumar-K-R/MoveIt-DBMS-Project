import jwt from "jsonwebtoken";

const verifyAdminToken = (req, res, next) => {
  const token = req.cookies["admin_auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default {
  verifyAdminToken,
};
