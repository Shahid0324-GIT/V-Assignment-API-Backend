const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the 'User' model
  },
  bank: String,
  branch: String,
  address: String,
  city: String,
  district: String,
  state: String,
  bank_code: String,
  weather: {
    temp: Number,
    humidity: Number,
  },
  name: String,
});

const userSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  user_name: {
    type: String,
  },
  back_accounts: [
    {
      type: String,
    },
  ],
  accounts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const UserModel = mongoose.model("BankUser", userSchema);
const AccountsModel = mongoose.model("Account", userAccountSchema);

module.exports = { UserModel, AccountsModel };
