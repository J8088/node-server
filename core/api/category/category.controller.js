'use strict';

import jsonpatch from 'fast-json-patch';
import {ProductCategory} from '../product/product.model';


const respondWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;

  return entity => {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
};

const patchUpdates = patches => {
  return entity => {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
};

const removeEntity = res => {
  return entity => {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
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
  return ProductCategory.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const show = (req, res) => {
  return ProductCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const create = (req, res) => {
  return ProductCategory.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};

export const upsert = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }

  return ProductCategory.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const patch = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  return ProductCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const destroy = (req, res) => {
  return ProductCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
