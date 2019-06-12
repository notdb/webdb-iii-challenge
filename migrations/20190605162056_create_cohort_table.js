exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(table) {
    //primary key called id that auto-increments, int
    table.increments();

    //a varchar (string) called name, 28 chars long, unique, not null
    table
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
