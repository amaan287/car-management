import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createCar,
  deleteCar,
  getCars,
  updateCar,
} from "../controller/car.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createCar);
router.get("/getCars", getCars);
router.delete("/deleteCar/:carId/:userId", verifyToken, deleteCar);
router.put("/updatecar/:carId/:userId", verifyToken, updateCar);

export default router;
