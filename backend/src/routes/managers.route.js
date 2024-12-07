import express from "express";

const managerRouter = express.Router();

managerRouter.get("/", (req, res) => {
  res.json({
    route: "Manager",
  });
});

export default managerRouter;
