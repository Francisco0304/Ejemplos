const routes = require('express').Router();

const {
  findAll,
  save,
  erase,
  update
} = require('./../controllers/controll-projects');

routes.get('/', findAll);
routes.post('/:id', save);
routes.delete('/:id', erase);
module.exports = routes;
