import jwt from "jsonwebtoken";

const getAuthStatus = async (req, res, next) => {
  try {
    const [employee, manager, vendor, warehouse] = [
      verifyToken(req.cookies["employee_auth_token"]),
      verifyToken(req.cookies["manager_auth_token"]),
      verifyToken(req.cookies["vendor_auth_token"]),
      verifyToken(req.cookies["warehouse_auth_token"]),
    ];

    if (!employee && !manager && !vendor && !warehouse) {
      return res.status(401).json({
        isAuthenticated: false,
      });
    }

    res.status(200).json({
      isAuthenticated: true,
    });
  } catch (error) {
    next(error);
  }
};

const verifyToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  getAuthStatus,
};
