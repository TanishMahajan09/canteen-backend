const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Canteen } = require("../db");

router.get("/listofcanteens", (req, res) => {
  // res.send("hi");
  return res.status(200).json({
    data: [
      { id: 1, name: "UietCanteen" },
      { id: 2, name: "UicetCanteen" },
      { id: 3, name: "UblsCanteen" },
      // { id: 4, name: "LawCanteen" },
      // { id: 5, name: "GeologyCanteen" },
    ],
  });
});

router.get("/canteenitems", async (req, res) => {
  let queryParams = req.query.canteenname;
  let lowercaseparams = queryParams.toLowerCase();
  let cant = await Canteen.findOne({ canteenName: queryParams });
  if (!cant) {
    return res.json({
      msg: "Canteen does not exist",
    });
  }
  if (cant.items.length !== 0) {
    return res.json({
      items: cant.items,
    });
  }
  if (cant.items.length == 0) {
    return res.send("No Items");
  }
  res.send("ok");
});

//Post route is added temporarily just to check delete and create a new one
// router.post("/addcanteenitems", async (req, res) => {
//   await Canteen.create({
//     canteenName: "UblsCanteen",
//     items: ["samosa", "idli", "sambar", "wada"],
//   });
//   res.send("Added successfully ");
// });

module.exports = router;
