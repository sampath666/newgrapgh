import express from 'express';

import { getGraph, postGraph, getGraphs, getCost } from '../controllers/graph.js';

const router = express.Router();

router.get('/:id', getGraphs);
router.get('/', getGraph);
router.get('/sub/', getCost);
router.post('/', postGraph);

export default router;