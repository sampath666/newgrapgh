
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import graphRouter from "./routes/graph.js";


const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use("/graph" , graphRouter);

const dbUrl = 'mongodb+srv://tsampath4076:6HHm7QzhCtVWhpXL@newcluster.uj2ky6m.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT|| 5001;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);