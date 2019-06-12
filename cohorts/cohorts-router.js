const knex = require("knex");
const router = require("express").Router();

const Cohorts = require("./cohorts-model.js");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

router.get("/", async (req, res) => {
  try {
    const cohort = await Cohorts.find();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/students", async (req, res) => {
  try {
    const cohorts = await Cohorts.findStudentById(req.params.id);
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const [id] = await Cohorts.add(req.body, "id");
    const cohort = await db("cohorts")
      .where({ id })
      .first();
    res.status(201).json(cohort);
  } catch (error) {
    const message = error[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const api = await Cohorts.update(req.params.id, req.body);

    if (!req.body.name) {
      res.status(400).json({ message: "please add a name" });
    } else {
      res.status(200).json(api);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cohort = await Cohorts.order66(req.params.id);
    res.status(200).json(cohort);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error deleting account"
    });
  }
});

module.exports = router;
