const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  findStudentById,
  add,
  update,
  order66
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

function update(id, changes) {
  return find()
    .where({ id })
    .update(changes, "*");
}

function order66(id) {
  return find()
    .where({ id })
    .del();
}
