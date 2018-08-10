exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Route_stops').del()
    .then(function () {
      // Inserts seed entries
      return knex('Route_stops').insert([
        {bus_route_id: 1, bus_stop_id: 1},
        {bus_route_id: 1, bus_stop_id: 2},
        {bus_route_id: 2, bus_stop_id: 3},
        {bus_route_id: 2, bus_stop_id: 2},
        {bus_route_id: 3, bus_stop_id: 5},
        {bus_route_id: 3, bus_stop_id: 1},
        {bus_route_id: 4, bus_stop_id: 4},
        {bus_route_id: 4, bus_stop_id: 2},
        {bus_route_id: 5, bus_stop_id: 6},
        {bus_route_id: 5, bus_stop_id: 3},
        {bus_route_id: 6, bus_stop_id: 6},
        {bus_route_id: 6, bus_stop_id: 5}
      ]);
    });
};
