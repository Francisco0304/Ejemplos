const routes = require('express').Router();

const {
  findAll,
  save,
  findById,
  update,
  erase
} = require('./../controllers/controll-modalities');

routes.get('/', findAll);
routes.post('/', save);
routes.get('/:id', findById);
routes.put('/:id', update);

routes.delete('/:id',erase);

module.exports = routes;
