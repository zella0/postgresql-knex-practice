exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Buses').del()
    .then(function () {
      // Inserts seed entries
      return knex('Buses').insert([
        {seats: 8, bus_color: "red", driver_name: "Name 1"},
        {seats: 10, bus_color: "yellow", driver_name: "Name 2"},
        {seats: 10, bus_color: "green", driver_name: "Name 3"},
        {seats: 12, bus_color: "blue", driver_name: "Name 4"},
        {seats: 14, bus_color: "purple", driver_name: "Name 5"},
        {seats: 16, bus_color: "grey", driver_name: "Name 6"},
        {seats: 24, bus_color: "black", driver_name: "Name 7"},
        {seats: 20, bus_color: "white", driver_name: "Name 8"},
        {seats: 22, bus_color: "teal", driver_name: "Name 9"}
      ]);
    });
};
