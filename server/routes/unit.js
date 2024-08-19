const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
const Units = require("../models/Units");
const nodemailer = require("../service/nodemailer");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const path = require("path");

dotenv.config();

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

// update units
exports.UpdateUnits = async (request, response) => {
  let { price, unitsToUpdate, _id } = request.body;
  if (_id === undefined) {
    _id = request.id;
  }
  const existingUnits = await Units.findOne({ userID: _id, price: price });
  if (existingUnits) {
    existingUnits.units += unitsToUpdate;
    if (existingUnits.units === 0) existingUnits.status = "completed";
    else existingUnits.status = "pending";
    existingUnits.save(async (err) => {
      if (err) {
        return response.status(404).json({
          success: false,
          message:
            "Your request could not be processed as entered. Please try again.",
          severity: "info",
        });
      }
    });
  } else {
    const user = await User.findOne({ _id });
    const existingUnits = new Units({
      userID: _id,
      price,
      units: unitsToUpdate,
      status: "pending",
      userName: user.name,
      userEmail: user.email,
    });
    existingUnits.save(async (err) => {
      if (err) {
        return response.status(404).json({
          success: false,
          message:
            "Your request could not be processed as entered. Please try again.",
          severity: "info",
        });
      }
    });
  }
  response.status(200).json({
    success: true,
    message: `Units have been updated!`,
    severity: "success",
  });
};

exports.FetchUnits = async (request, response) => {
  const units = await Units.find({ units: { $gt: 0 } });
  response.status(200).json(units);
};
