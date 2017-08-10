'use strict';

import express from 'express';
import {
  index,
  show,
  create,
  upsert,
  patch,
  destroy
} from './product.controller';


const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', upsert);
router.patch('/:id', patch);
router.delete('/:id', destroy);

module.exports = router;
