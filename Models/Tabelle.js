var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaID = Schema.ObjectId;


var Gereatsinfo =new Schema({

GereatID		            : { type: String                    },
Thema       				: { type: String                    },
Nahricht        			: { type: String                    },
Datum				        : { type: Date, default: Date.now() }


});


var Tabelle = new Schema({
    
        ID                   :  SchemaID,
		Email				 :  { type: String , required: true, unique: true },
        Kenntwort            :  { type: String , required: true               },
		Token				 :  { type: String                                },
        Gereatsinfo          :  [Gereatsinfo]
   
   },{toJSON:{getters:true}});


   

   var xxx = mongoose.model('Tabelleliste', Tabelle);
   module.exports = xxx;
   

