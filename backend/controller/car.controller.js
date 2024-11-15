import Car from "../models/car.model.js";
import { errorHandler } from "../utils/error.js";

// Create Car
export const createCar = async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newCar = new Car({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    next(error);
  }
};

// Get Cars with Filtering and Pagination
export const getCars = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const startIndex = (page - 1) * limit;

    const cars = await Car.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.car_type && { "tags.car_type": req.query.car_type }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.carId && { _id: req.query.carId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
          { "tags.company": { $regex: req.query.searchTerm, $options: "i" } },
          { "specifications.transmission": { $regex: req.query.searchTerm, $options: "i" } },
          { "specifications.fuelType": { $regex: req.query.searchTerm, $options: "i" } },
          { "specifications.year": { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalCars = await Car.countDocuments();
    res.status(200).json({
      cars,
      totalCars,
      currentPage: page,
      totalPages: Math.ceil(totalCars / limit),
    });
  } catch (error) {
    next(error);
  }
};

// Delete Car
export const deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car || car.userId.toString() !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to delete this car"));
    }
    await Car.findByIdAndDelete(req.params.carId);
    res.status(200).json("The car has been deleted");
  } catch (error) {
    next(error);
  }
};

// Update Car
export const updateCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car || car.userId.toString() !== req.user.id) {
      return next(errorHandler(403, "You are not allowed to update this car"));
    }
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.carId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};
