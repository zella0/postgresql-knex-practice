exports.up = function(knex, Promise) {
  return knex.schema.createTable('Bus_stops', (table) => {
    table.increments(); // id
    table.string("street_names");
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Bus_stops');
};
