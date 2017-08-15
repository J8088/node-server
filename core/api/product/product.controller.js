/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  upsert
 * PATCH   /api/products/:id          ->  patch
 * DELETE  /api/products/:id          ->  destroy
 */


'use strict';

import jsonpatch from 'fast-json-patch';
import multer  from 'multer';
import Product, {ProductImage} from './product.model';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.customUserFileId + '-' + file.originalname);
  }
});

const upload = multer({storage: storage}).single('uploadImages');

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

export const storeImageHandler = upload;

export const preStoreImageHandler = (req, res, next) => {
  ProductImage.create({})
    .then((data) => {
      req['customUserFileId'] = data._id;
      next();
    })
    .catch(handleError(res));
};

export const postStoreImageHandler = (req, res) => {
  ProductImage.findById(req.customUserFileId).exec()
    .then((data) => {
      data['path'] = req.file.path;
      data['originalName'] = req.file.originalname;
      data.save();
      return data;
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const showImagesAll = (req, res) => {
  return ProductImage.find({}).exec()
    .then((data) => {
      return data;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const deleteImages = (req, res) => {
  return ProductImage.find({}).remove()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const index = (req, res) => {
  return Product.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export const show = (req, res) => {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Creates a new Thing in the DB
export const create = (req, res) => {
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
};

// Upserts the given Thing in the DB at the specified ID
export const upsert = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }

  return Product.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Updates an existing Thing in the DB
export const patch = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

// Deletes a Thing from the DB
export const destroy = (req, res) => {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};