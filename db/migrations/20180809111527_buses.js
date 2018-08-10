exports.up = function(knex, Promise) {
  return knex.schema.createTable('Buses', (table) => {
    table.increments(); //id
    table.integer("seats");
    table.string("bus_color");
    table.string("driver_name");
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Buses');
};
