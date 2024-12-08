import jwt from "jsonwebtoken";

const verifyVendorToken = (req, res, next) => {
  const token = req.cookies["vendor_auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.vendorId = decoded.vendorId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default {
  verifyVendorToken,
};
