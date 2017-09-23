'use strict';

import express from 'express';
import {
  index,
  create
} from './product.controller';

const router = express.Router();

router.get('/', index);
router.post('/', create);

module.exports = router;
