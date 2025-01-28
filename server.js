const express = require("express");
const { scanDynamoDB } = require("./dynamodb");
const app = express();

app.get("/query-offers", async (req, res) => {
  try {
    // scan the database, using the dynamodb.jf file
    const items = await scanDynamoDB();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// use public files, only index, css and js as single page

app.use(express.static("public"));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// this is a comment
