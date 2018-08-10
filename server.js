// setup knex to connect with our SQL server (postgres)
const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

// setup express for easier navigation via HTTP requests
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());

// * As a user, when I make a POST request to `/buses` and pass JSON data it should create a new bus based off of the data.
app.post('/buses', function(req, res) {
  knex('Buses')
    .insert({
      seats: req.body.seats,
      bus_color: req.body.bus_color,
      driver_name: req.body.driver_name
    })
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a PUT request to `/buses/:id` and pass JSON data it should update the bus matching the id in the route params.
app.put('/buses/:id', function(req, res) {
  knex('Buses')
    .where('Buses.id', req.params.id)
    .update({
      seats: req.body.seats,
      bus_color: req.body.bus_color,
      driver_name: req.body.driver_name
    })
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a DELETE request to `/buses/:id` and it should delete the bus that matches the id passed.
app.delete('/buses/:id', function(req, res) {
  knex('Buses')
    .where('Buses.id', req.params.id)
    .del()
    .then((result) => {
      res.sendStatus(200);
    })
})


// * As a user, when I make a GET request to `/buses` I should get back an array of all buses.
app.get('/buses', function(req, res) {
  knex('Buses')
    .then((result) => {
      res.json(result)
    })
})


// * As a user, when I make a GET request to `/buses/:id` I should get back the bus I requested for.
app.get('/buses/:id', function(req, res) {
  knex('Buses')
    .where('Buses.id', req.params.id)
    .then((result) => {
      res.json(result)
    })
})

// * As a user, when I make a POST request to `/bus_routes` and pass JSON data it should create a new bus_route based off of the data.
app.post('/bus_routes', function(req, res) {
  knex('Bus_routes')
    .insert({
      description: req.body.description,
      bus_id: req.body.bus_id,
    })
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a PUT request to `/bus_routes/:id` and pass JSON data it should update the bus_route matching the id in the route params.
app.put('/bus_routes/:id', function(req, res) {
  knex('Bus_routes')
    .where('Bus_routes.id', req.params.id)
    .update({
      description: req.body.description,
      bus_id: req.body.bus_id,
    })
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a DELETE request to `/bus_routes/:id` and it should delete the bus_route that matches the id passed.
app.delete('/bus_routes/:id', function(req, res) {
  knex('Bus_routes')
    .where('Bus_routes.id', req.params.id)
    .del()
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a GET request to `/bus_routes` I should get back an array of all bus_routes.
app.get('/bus_routes', function(req, res) {
  knex('Bus_routes')
    .then((result) => {
      res.json(result);
    })
})

// **STRETCH** As a user, when I make a GET request to `/bus_routes/:bus_id`
// I should get back an array of all bus routes that exist along the given bus.
app.get('/bus_routes/:bus_id', function(req, res) {
  knex('Bus_routes')
    .join('Buses', 'Buses.id', '=', 'Bus_routes.id')
    .where('Bus_routes.bus_id', req.params.bus_id)
    .then((result) => {
      let busObj = {
        bus_id: result[0].bus_id,
        driver_name: result[0].driver_name,
        seats: result[0].seats,
        bus_color: result[0].bus_color,
        bus_routes: []
      }
      result.map((item) => {
        busObj.bus_routes.push({
          [`route_id ${item.id}`]: item.description
        });
      })
      res.json(busObj);
    })
})


// // * As a user, when I make a GET request to `/bus_routes/:id` I should get back the bus_route I requested for.
// app.get('/bus_routes/:id', function(req, res){
//   knex('Bus_routes')
//   .where('Bus_routes.id', req.params.id)
//   .then((result)=>{
//     res.json(result);
//   })
// })

// * As a user, when I make a POST request to `/bus_stops` and pass JSON data it should create a new bus_stop based off of the data.
app.post('/bus_stops', function(req, res) {
  knex('Bus_stops')
    .insert({
      street_names: req.body.street_names
    })
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a PUT request to `/bus_stops/:id` and pass JSON data it should update the bus_stop matching the id in the route params.
app.put('/bus_stops/:id', function(req, res) {
  knex('Bus_stops')
    .where('Bus_stops.id', req.params.id)
    .update({
      street_names: req.body.street_names
    })
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a DELETE request to `/bus_stops/:id` and it should delete the bus_stop that matches the id passed.
app.delete('/bus_stops/:id', function(req, res) {
  knex('Bus_stops')
    .where('Bus_stops.id', req.params.id)
    .del()
    .then((result) => {
      res.sendStatus(200);
    })
})

// * As a user, when I make a GET request to `/bus_stops` I should get back an array of all bus_stops.
app.get('/bus_stops', function(req, res) {
  knex('Bus_stops')
    .then((result) => {
      res.json(result);
    })
})

// **STRETCH** As a user, when I make a GET request to `/bus_stops/:bus_route_id` I should get back an array of all bus stops
// that exist along the given bus_route.
app.get('/bus_stops/:bus_route_id', function(req, res) {
  knex('Bus_stops')
    // .select('Bus_stops.street_names', 'Bus_routes.description')
    .join('Route_stops', 'Bus_stops.id', '=', 'bus_stop_id')
    .join('Bus_routes', 'Bus_routes.id', '=', 'bus_route_id')
    .where('Bus_routes.id', req.params.bus_route_id)
    .then((result) => {
      let busStopsObj = {
        [`${result[0].description}`]: []
      }
      result.map((item) => {
        busStopsObj[`${result[0].description}`].push({
          [`bus_stops_id_${item.bus_stop_id}`]: item.street_names
        });
        console.log(item);
      })
      res.json(busStopsObj);
    })
})

// // * As a user, when I make a GET request to `/bus_stops/:id` I should get back the bus_stop I requested for.
// app.get('/bus_stops/:id', function(req, res){
//   knex('Bus_stops')
//   .where('Bus_stops.id', req.params.id)
//   .then((result)=>{
//     res.json(result);
//   })
// })

// **STRETCH** As a user, when I make a GET request to `/buses/:id/full_info` I should get back an object containing the bus information, and
// an array of bus_route objects, and within those bus_route objects there should be an array of bus_stops for the route.
app.get('/buses/:id/full_info', function(req, res){
  knex('Buses')
  .join('Bus_routes', 'Bus_routes.bus_id', '=', 'Buses.id')
  .join('Route_stops', 'Bus_routes.id', '=', 'bus_route_id')
  .join('Bus_stops', 'Bus_stops.id', '=', 'bus_stop_id')
  .where('Buses.id', req.params.id)
  .then((result)=>{
    let busObj = {
      bus_id: result[0].bus_id,
      driver_name: result[0].driver_name,
      seats: result[0].seats,
      bus_color: result[0].bus_color,
      bus_routes: []
    }
    result.map((item) => {
      busObj.bus_routes.push({
        [`route_id_${item.bus_route_id}`]: item.description,
        [`bus_stop_id_${item.bus_stop_id}`]: item.street_names
      });
    })
    res.json(busObj);
  })
})


app.listen(port, function() {
  console.log('server is up on port ' + port)
})
