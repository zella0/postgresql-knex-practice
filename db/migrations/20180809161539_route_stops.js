exports.up = function(knex, Promise) {
  return knex.schema.createTable('Route_stops', (table) => {
    table.increments(); // id
    table.integer('bus_route_id')
      .notNullable()
      .references('id')
      .inTable('Bus_routes')
      .onDelete('CASCADE')
      .index();
    table.integer('bus_stop_id')
      .notNullable()
      .references('id')
      .inTable('Bus_stops')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Route_stops');
};
