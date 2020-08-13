//static imports of express and Cross Origin Resource Sharing middleware
const express = require("express")
const cors = require("cors")
//creates an instance of express
const app = express()

//port that server will run at
const port = process.env.PORT || 8080

// Allows acceptance of cross origin site requests from both dev and locally served production environments
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"],
}
app.use(cors(corsOptions))

//persistent data that our api is serving
const data = require("./data.json")

//route that serves initial list of data that can be requested in future calls
app.get("/api/dataIdList", ({ res }) => res.send(data.rowIdFullList))

//route that serves one row for each call
app.get("/api/dataItem/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad Request - missing id")
    return
  }
  res.send(data.rows[`row${req.params.id}`])
})

//begins express listening on provided port
app.listen(port, () => console.log(`Listening on port ${port}`))
