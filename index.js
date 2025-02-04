const express = require("express");
const helmet = require("helmet");

const server = require("./api/server.js");

server.use(express.json());
server.use(helmet());

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);

/*
server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});
*/
server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const cohorts = await db("students")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    res.status(201).json(cohort);
  } catch (error) {
    const message = error[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
