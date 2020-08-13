const express = require("express")
const cors = require("cors")
const app = express()

const port = process.env.PORT || 8080

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"],
}

app.use(cors(corsOptions))

const data = require("./data.json")

app.get("/api/dataIdList", ({ res }) => res.send(data.rowIdFullList))

app.get("/api/dataItem/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad Request - missing id")
    return
  }
  res.send(data.rows["row" + req.params.id])
})

app.listen(port, () => console.log(`Listening on port ${port}`))
