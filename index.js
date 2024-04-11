const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const mainroute = require("./routes/index");
const coresObject = {
  origin: "http://localhost:3000",
  // kon hit kar sakta hai
  optionsSuccessStatus: 200,
};

app.use(cors(coresObject));
app.use(express.json());
app.use("/api/v1", mainroute);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App is running on port ${PORT}`);
  }
});
