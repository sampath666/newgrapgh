import express from 'express';
import mongoose from 'mongoose';

import graghM from '../models/graph.js';

const router = express.Router();

export const getGraph = async (req, res) => {

    const minDistance = (dist,sptSet,V) =>{
        let min = Number.MAX_VALUE;
        let min_index = -1;

        for(let v = 0; v < V; v++)
        {
            if (sptSet[v] == false && dist[v] <= min)
            {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }
    const dijkstra = (graph, src)=> {
        const V = graph.length
        let dist = new Array(V);
        let sptSet = new Array(V);

        for(let i = 0; i < V; i++)
        {
            dist[i] = Number.MAX_VALUE;
            sptSet[i] = false;
        }

        dist[src] = 0;

        for(let count = 0; count < V - 1; count++)
        {

            let u = minDistance(dist, sptSet,V);
            sptSet[u] = true;
            for(let v = 0; v < V; v++)
            {
                if (!sptSet[v] && graph[u][v] != 0 &&
                    dist[u] != Number.MAX_VALUE &&
                    dist[u] + graph[u][v] < dist[v])
                {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }

        return dist
    }

    try {
        const posts = await graghM.find().sort({ _id: -1 });
        const p1 = posts[0];
        const p2 = Object.entries(p1)[5][1];
        const arr = Object.entries(p2)[2][1];
        const st = Object.entries(p2)[0][1];
        const ans = JSON.stringify(dijkstra(arr, 0 ));
        res.json({ data: ans,stations:JSON.stringify(st)} );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getGraphs = async (req, res) => {
    const { id } = req.params;

    const minDistance = (dist,sptSet,V) =>{
        let min = Number.MAX_VALUE;
        let min_index = -1;

        for(let v = 0; v < V; v++)
        {
            if (sptSet[v] == false && dist[v] <= min)
            {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }
    const dijkstra = (graph, src)=> {
        const V = graph.length
        let dist = new Array(V);
        let sptSet = new Array(V);

        for(let i = 0; i < V; i++)
        {
            dist[i] = Number.MAX_VALUE;
            sptSet[i] = false;
        }

        dist[src] = 0;

        for(let count = 0; count < V - 1; count++)
        {

            let u = minDistance(dist, sptSet,V);
            sptSet[u] = true;
            for(let v = 0; v < V; v++)
            {
                if (!sptSet[v] && graph[u][v] != 0 &&
                    dist[u] != Number.MAX_VALUE &&
                    dist[u] + graph[u][v] < dist[v])
                {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }

        return dist
    }

    try {
        const posts = await graghM.find().sort({ _id: -1 });
        const p1 = posts[0];
        const p2 = Object.entries(p1)[5][1];
        const arr = Object.entries(p2)[2][1];
        const st = Object.entries(p2)[0][1];
        const ans = JSON.stringify(dijkstra(arr, parseInt(id)));
        res.json({ data: ans,stations:JSON.stringify(st)} );
        // console.log(id);
        //const a = JSON.parse(posts[0].arr)
        //const ans = JSON.stringify(dijkstra(a, parseInt(id)));
        //res.json({ data: ans,idp:id} );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const postGraph = async (req, res) => {
    const post = req.body;

    const newGraghM = new graghM({ ...post})

    try {
        await newGraghM.save();

        res.status(201).json(newGraghM);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;