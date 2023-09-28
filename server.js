const express = require("express");
const ifsc = require("ifsc");

const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoutes");

connectDB();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// app.get("/", async (req, res) => {
// const ip = "45.127.58.226";
// const fetch_res = await fetch(`https://ipapi.co/${ip}/json/`);
// const fetch_data = await fetch_res.json();

// const lat = fetch_data.latitude;
// const lon = fetch_data.longitude;

//   try {
// const geo = await fetch(
//   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_KEY}`
// );
// const weatherResults = await geo.json();
// const temp = weatherResults.main.temp;
// const humidity = weatherResults.main.humidity;
//     // res.send({ temp, humidity });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send("Error Occured");
//   }

//   try {
//     const bank_accounts = ["HDFC0CAGSBK", "HDFC0003933"];
//     // const ifscRes = await ifsc.fetchDetails("SBIN0020451");
//     const results = await Promise.all(
//       bank_accounts.map(async (bank) => {
//         const ifscRes = await ifsc.fetchDetails(bank);
//         const city = await ifscRes.STATE;
//         const geo = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&appid=${process.env.WEATHER_KEY}`
//         );
//         const weatherResults = await geo.json();
//         const temp = weatherResults.main.temp;
//         const humidity = weatherResults.main.humidity;

//         return { ...ifscRes, weather: { temp, humidity } };
//       })
//     );
//     console.log(results);
//     res.send("Done");
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/", (req, res) => res.send("Hello World"));

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
