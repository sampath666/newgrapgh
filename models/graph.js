import mongoose from 'mongoose';

const gragh = mongoose.Schema({
    arr : String
})

var graghM = mongoose.model('gragh', gragh);

export default graghM;