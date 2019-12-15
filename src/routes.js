const express = require('express');

const ChaoticController = require('./controllers/ChaoticController');

const routes = express.Router();

routes.get('/api/v2/order-by-status', ChaoticController.getByStatus);

routes.get('/api/v2/order-total/:status', ChaoticController.getTotalValeuOfStatus);

routes.get('/api/v2/order-major-values', ChaoticController.getAllStatusOrdedByTotalAmount);

routes.get('/api/v2/group-by-country', ChaoticController.getByCountry);

routes.get('*', (req, res) => {
    res.status(404).send({error : 'Route Not Found'});
  });

module.exports = routes;