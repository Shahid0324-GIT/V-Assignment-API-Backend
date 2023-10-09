const asyncHandler = require("express-async-handler");
const ifsc = require("ifsc");
const dotenv = require("dotenv");
dotenv.config();
const { UserModel, AccountsModel } = require("../models/users");

const registerUser = asyncHandler(async (req, res) => {
  const { user_id, user_name, back_accounts } = req.body;
  let eUser;
  let allUsers;

  const userExists = await UserModel.findOne({ user_name });

  // console.log(userExists);

  if (!userExists) {
    const bankData = await Promise.all(
      back_accounts.map(async (bank) => {
        const ifscRes = await ifsc.fetchDetails(bank);
        const ip = req.headers['x-forwarded-for'];
        const fetch_res = await fetch(`https://ipapi.co/${ip}/json/`);
        const fetch_data = await fetch_res.json();

        const lat = fetch_data.latitude;
        const lon = fetch_data.longitude;
        const geo = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_KEY}`
        );
        const weatherResults = await geo.json();
        // console.log(weatherResults);
        const temp = weatherResults.main.temp || 32;
        const humidity = weatherResults.main.humidity || 52;

        return { ...ifscRes, weather: { temp, humidity } };
      })
    );

    const newUser = new UserModel({
      user_id,
      user_name,
      back_accounts,
    });

    const newAcc = new AccountsModel({
      user: newUser._id,
      name: newUser.user_name,
      bank: bankData[0].BANK,
      city: bankData[0].CITY,
      address: bankData[0].ADDRESS,
      branch: bankData[0].BRANCH,
      bank_code: bankData[0].BANKCODE,
      weather: bankData[0].weather,
    });

    await newAcc.save();

    const userInAcc = await AccountsModel.findOne({ user: newUser._id });
    const userId = userInAcc.user;
    const accId = newAcc._id;
    await newUser.save();

    await UserModel.findByIdAndUpdate(userId, { $set: { accounts: accId } });

    await newUser.save();
    console.log(newUser);

    let data = await UserModel.findOne({ accounts: accId })
      .populate("accounts")
      .exec();

    res.status(200).json({ message: "User Created.", data });
  } else {
    const exUser = await UserModel.findOne({ user_id });
    const exUserAccId = exUser.accounts;

    // const exUserAccDetails = await AccountsModel.findOne({ _id: exUserAccId });
    let data = await UserModel.findOne({ accounts: exUserAccId }).populate(
      "accounts"
    );
    res.status(200).json({ message: "User Exists. Here is the data", data });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const data = await UserModel.find({}).populate("accounts");

  if (!data.length) {
    res.send(400).json({
      message: "Please add the data first",
    });
  }

  res.status(200).json({ message: "All the data is here", data });
});

module.exports = { registerUser, allUsers };
