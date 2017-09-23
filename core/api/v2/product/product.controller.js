"use strict";

const models = require('../models/index');

const respondWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;

  return entity => {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
};

const handleEntityNotFound = res => {
  return entity => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
};

const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;
  return err => {
    res.status(statusCode).send(err);
  };
};

export const index = (req, res) => {
  return models.Products.findAll({})
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const create = (req, res) => {
  return models.Products.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};