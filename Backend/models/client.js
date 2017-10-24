var mongoose =require('mongoose');

var clientSchema= new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pet' }]
},{timestamps:true});

mongoose.model('client', clientSchema);
