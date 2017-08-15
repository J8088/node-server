'use strict';

import express from 'express';
import {
  index,
  show,
  create,
  upsert,
  patch,
  destroy,
  storeImageHandler,
  preStoreImageHandler,
  postStoreImageHandler,
  showImagesAll,
  deleteImages
} from './product.controller';

const router = express.Router();

router.get('/', index);
router.get('/image', showImagesAll);
router.post('/image', [preStoreImageHandler, storeImageHandler, postStoreImageHandler]);
router.delete('/image', deleteImages);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', upsert);
router.patch('/:id', patch);
router.delete('/:id', destroy);

module.exports = router;
