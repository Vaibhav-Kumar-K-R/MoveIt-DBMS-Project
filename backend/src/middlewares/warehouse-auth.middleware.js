import jwt from "jsonwebtoken";

const verifyWarehouseToken = (req, res, next) => {
  const token = req.cookies["warehouse_auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.warehouseId = decoded.warehouseId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default {
  verifyWarehouseToken,
};
