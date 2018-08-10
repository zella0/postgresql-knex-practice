exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Bus_routes').del()
    .then(function () {
      // Inserts seed entries
      return knex('Bus_routes').insert([
        {description: "This is a scenic route", bus_id: 1},
        {description: "This is a fast route", bus_id: 2},
        {description: "This is a slow route for old people", bus_id: 3},
        {description: "This is a route to pick up the most amount of people", bus_id: 2},
        {description: "This is a freeway route", bus_id: 1},
        {description: "This is a local route", bus_id: 4},
        {description: "This is an interstate route", bus_id: 3},
        {description: "This is a laksjflk jasdlkf jasldkjf", bus_id: 4}
      ]);
    });
};
