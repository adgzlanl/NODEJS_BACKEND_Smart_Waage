var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TokenID = Schema.ObjectId;

var TokenSchema = new Schema({
    
        ID                      : TokenID,
       tokenUser                : String
       
   
   });

   var List = mongoose.model('TokenList', TokenSchema);
   module.exports = List;
   