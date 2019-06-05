exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students").insert([
    { name: "a student", cohort_id: 1 },
    { name: "b student", cohort_id: 1 },
    { name: "c student", cohort_id: 1 }
  ]);
};
