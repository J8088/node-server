'use strict';

import express from 'express';
import * as auth from '../../auth/auth.service';
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
router.post('/image', auth.hasRole('admin'), [preStoreImageHandler, storeImageHandler, postStoreImageHandler]);
router.delete('/image', auth.hasRole('admin'), deleteImages);
router.get('/:id', show);
router.post('/', auth.hasRole('admin'), create);
router.put('/:id', auth.hasRole('admin'), upsert);
router.patch('/:id', auth.hasRole('admin'), patch);
router.delete('/:id', auth.hasRole('admin'), destroy);

module.exports = router;
