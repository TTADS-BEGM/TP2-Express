var mongoose =require('mongoose');

var petSchema= new mongoose.Schema({
  name: {type: String, unique: true, required: true}
},{timestamps:true});

mongoose.model('pet', petSchema);
