const UserModel = require("../models/userModels");

// POST - api/auth/register
exports.createNewUser = async (req, res) => {
  try {
    const {
      email,
      mobno,
      address,
      pincode,
      District,
      State,
      country,
      dob,
      marital_status,
      gender,
      username,
      name,
    } = req.body;

    if (
      !email ||
      !mobno ||
      !address ||
      !pincode ||
      !District ||
      !State ||
      !country ||
      !dob ||
      !marital_status ||
      !gender ||
      !username ||
      !name
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Oops! Some fields are missing. Please complete all required fields before submitting.",
      });
    }

    let isUser = await UserModel.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        status: "fail",
        message: "Value alreay exists",
      });
    }

    let newUser = new UserModel({
      name,
      username,
      email,
      gender,
      marital_status,
      dob,
      country,
      State,
      District,
      pincode,
      address,
      mobno,
    });

    await newUser.save();

    return res.status(201).json({
      status: "success",
      data: {
        userData: newUser,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

// POST - api/auth/register
exports.getUsers = (req, res) => {
  console.log("new user will create");
};
