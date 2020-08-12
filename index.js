const express = require("express")

const app = express()
const port = process.env.PORT || 8080

const data = require("./data.json")

app.get("/api/dataIdList", (req, res) => {
  if (!req.query.datasize) {
    res.status(400).send("Bad Request - missing query")
    return
  }
  res.send(data.rowIdFullList)
})

app.get("/api/dataItem/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send("Bad Request - missing id")
    return
  }
  res.send(data.rows["row" + req.params.id])
})

app.listen(port, () => console.log(`Listening on port ${port}`))
