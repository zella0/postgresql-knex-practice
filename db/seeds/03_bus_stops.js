exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Bus_stops').del()
    .then(function () {
      // Inserts seed entries
      return knex('Bus_stops').insert([
        {street_names: "123 W Ave"},
        {street_names: "345 W Ave"},
        {street_names: "678 W Ave"},
        {street_names: "987 E Drive"},
        {street_names: "765 E Drive"},
        {street_names: "432 E Drive"},
        {street_names: "321 E Drive"},
        {street_names: "111 S something Rd"},
        {street_names: "222 N something Dr"},
        {street_names: "33 this is a street Dr"},
        {street_names: "444 idk Ln"},
        {street_names: "5555 W asdf"}
      ]);
    });
};
