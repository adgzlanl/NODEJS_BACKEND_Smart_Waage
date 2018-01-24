var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaID = Schema.ObjectId;



var Tabelle = new Schema({
    
        ID                   :  SchemaID,
		Email				 :  { type: String , required: true, unique: true },
        Kenntwort            :  { type: String , required: true, unique: true },
		Token				 :  { type: String },
        Gereatsinfo          :  {

                                data                    :{

                                GereatID		            : { type: String  },
                                Thema       				: { type: String  },
                                Nahricht        			: { type: String  },
                                Datum				        : { type: Date.now}
														}      
                                }
   
   });

   

   var xxx = mongoose.model('Tabelleliste', Tabelle);
   module.exports = xxx;
   