import express from 'express';

import { getGraph, postGraph } from '../controllers/graph.js';

const router = express.Router();

router.get('/', getGraph);
router.post('/', postGraph);

export default router;