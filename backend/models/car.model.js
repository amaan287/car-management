// src/models/Car.model.js
import mongoose from "mongoose";
const carSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [{
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        default: function () {
          return this.title;
        }
      }
    }],
    specifications: {
      year: {
        type: Number,
        required: true,
      },
      fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'],
        required: true
      },
      transmission: {
        type: String,
        enum: ['Manual', 'Automatic', 'Semi-Automatic'],
        required: true
      }
    },
    tags: {
      car_type: {
        type: String,
        enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Wagon', 'Other'],
        required: true
      },
      company: {
        type: String,
        required: true,
        trim: true
      },
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Reserved', 'Maintenance'],
      default: 'Available'
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

export default Car;