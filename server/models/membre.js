const mongoose= require('mongoose')
const membereShemas =new mongoose.Schema({
    email:String,
    password:String
})
const MembreModel = mongoose.model("membres",membereShemas)
module.exports=MembreModel