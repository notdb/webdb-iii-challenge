const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  findStudentById,
  add
};

function find() {
  return db("cohorts");
}

function findStudentById(id) {
  return db("students")
    .where({ id })
    .first();
}

function add(cohort) {
  return find().insert(cohort);
}
