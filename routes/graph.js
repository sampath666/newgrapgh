import express from 'express';

import { getGraph, postGraph, getGraphs } from '../controllers/graph.js';

const router = express.Router();

router.get('/:id', getGraphs);
router.get('/', getGraph);
router.post('/', postGraph);

export default router;