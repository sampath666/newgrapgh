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
        res.json({ data: ans,stations:JSON.stringify(st),arr:arr} );
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

    const getDistance = (start,end,ans,st) =>{
        const m = st[start]
        let maxDistance=0,c=0,v=0;

        m.map(each => {
            c += 1 ;
            if(each[2]==1 && maxDistance<each[1]){
                maxDistance = each[1];
                v = each[0]

            }
        })
        const gp = dijkstra(ans,start-1)
        if (gp[end-1] < maxDistance  ){
            let n = maxDistance
            m.map(each => {
                if(each[2]===1 && n>each[1] && each[1]>gp[end-1]){
                    n = each[1]
                    v = each[0]
                }
            })

            return [v]
        }
        c = 0
        let value = m.map(each =>{
            c+=1
           if (c!==start&& c!==end){
                return getMinDistance(start,end,c,ans)
           }
            return 10**8
        })
        console.log(value)
        let minNode,minValue=10**8
        c = 0
        value.map(each=>{
            c += 1
            if(each<minValue){
                minValue = each
                minNode = c
            }
        })
        console.log(2,getDistance(start,minNode,ans,st))
        console.log(3,getDistance(minNode,end,ans,st))
        let ap= [...getDistance(start,minNode,ans,st),[minNode],...getDistance(minNode,end,ans,st)]
        return ap
    }

    const getMinDistance = (start,des,inter,ans) =>{
        const gp = dijkstra(ans,inter-1)
        return gp[start-1] + gp[des-1]
    }

    try {
        const posts = await graghM.find().sort({ _id: -1 });
        const p1 = posts[0];
        const p2 = Object.entries(p1)[5][1];
        const arr = Object.entries(p2)[2][1];
        const st = Object.entries(p2)[0][1];
        const ans = JSON.stringify(dijkstra(arr, parseInt(id)));
        const stations = req.query
        const start = parseInt(stations['s'])
        const destination = parseInt(stations['d'])
        console.log(start,destination)
        console.log(getDistance(start,destination,arr,st));
        res.json({ arr:arr,data: ans,stations:JSON.stringify(st),dist:getDistance(start,destination,arr,st)} );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCost = async (req, res) => {
    try {
        console.log(req);
        res.json({ d:[] } );
    }
    catch (error) {
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