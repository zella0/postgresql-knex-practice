exports.up = function(knex, Promise) {
  return knex.schema.createTable('Bus_routes', (table) => {
    table.increments(); // id
    table.string("description");
    table.integer("bus_id")
      .notNullable()
      .references('id')
      .inTable('Buses')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Bus_routes');
};
