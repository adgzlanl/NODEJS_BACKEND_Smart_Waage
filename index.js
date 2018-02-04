var express = require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var jsonParser=bodyParser.json();
var Tabelle=require('./Models/Tabelle');
var Liste=require('./Models/Liste')
var app = express();
/*************************************************************************** */
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://freeversion:freeversion@ds213688.mlab.com:13688/gewichtsdatenbank');
mongoose.connection.once('openUri', function(){
 console.log('Connection has been made, now make fireworks...');
 done();
}).on('error', function(error){
 console.log('Connection error:', error);
});
/*************************************************************************** */
app.use( bodyParser.json() );     
app.use(bodyParser.urlencoded({ 
extended: true
}));
/*************************************************************************** */
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/',jsonParser, function(request, response) {
	
  response.render('pages/index');
	
	
  
});
/**************************************************************************** */
app.get('/List',jsonParser, function(request, response) {
  
  Liste.find({}, function (err, liste) {

   // console.log(liste);
    console.log(liste.Gereat[1].Thema[1]);
    


});
 



  });
/**************************************************************************** */
app.post('/anmelden',jsonParser, function(request, response) {
  
  var email=request.body.email;
  var kenntwort=request.body.password;

  Tabelle.findOne({Email: email, Kenntwort: kenntwort}, function(err,newTable){

              if(err) {
                console.log(err);
                return
              }
              else
              {
                if(newTable)

                {
                  response.json({success:true,message:true});
                  
                }

                else
                {
                  response.json({ success : false, message : false });
                }
              }            


          });

  });
  /******************************************************************************************************************** */
  app.post('/registieren',jsonParser, function(request, response) {

    var email=request.body.email;
    var kenntwort=request.body.password;
  
          Tabelle.findOne({Email: email, Kenntwort: kenntwort}, function(err,newTable){
  
                if(err) {
                  console.log(err);
                  
                }
                else
                {
                  if(newTable)
  
                  {
                    response.json({success:false,message:false});
                    
                  }
  
                  else
                  {
                    var tabelle=new Tabelle();
                    
                      tabelle.Email=email;
                      tabelle.Kenntwort=kenntwort;
  
                      tabelle.save(function (err,newTable) {
                        
                            if(err)
                            {
                              response.send({ success : false, message : false });
                            }
                            else
                            {
                              response.json({success:true,message:true});
                              
                            }
                      });
                  }
                }            
            });
   });
  /******************************************************************************************************************** */
  app.get('/hinzufeugen', function(request, response) {

  
    var email=request.query.email;
    var kenntwort=request.query.password;
    var gereatID="123456789asd-asd9asd9-asd8876";
    var thema=request.query.topic;
    var nahricht=request.query.message;
  

          Tabelle.findOne({Email: email, Kenntwort: kenntwort}).then(function(record){
           
            record.Gereatsinfo.push({GereatID:gereatID,Thema:thema,Nahricht:nahricht});
            record.save(function (err){

              if(err)
              {
                console.log(err);
                response.send({ success : false, message : err });
              }
              else
              {
                console.log('Datei wurde Erfolgreich hinzugefügt');
                response.send("OK");
              }

            });
        });
  
   });




   /**********************************************************NEW LISTE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
   app.post('/einloggen',jsonParser, function(request, response) {
    
    var email=request.body.email;
    var kenntwort=request.body.password;
  
    Liste.findOne({Email: email, Kenntwort: kenntwort}, function(err,newTable){
  
                if(err) {
                  console.log(err);
                  return
                }
                else
                {
                  if(newTable)
  
                  {
                    response.json({success:true,ID:newTable._id,Email:newTable.Email,Kenntwort:newTable.Kenntwort});
                    
                  }
  
                  else
                  {
                    response.send({ success : false, message : false });
                  }
                }            
  
  
            });
  
    });
    /******************************************************************************************************************** */
    app.post('/anmeldung',jsonParser, function(request, response) {
  
      var email=request.body.email;
      var kenntwort=request.body.password;
    
            Liste.findOne({Email: email, Kenntwort: kenntwort}, function(err,newTable){
    
                  if(err) {
                    console.log(err);
                    
                  }
                  else
                  {
                    if(newTable)
    
                    {
                      response.json({success:false,message:'NotNull'});
                      
                    }
    
                    else
                    {
                      var tabelle=new Liste();
                      
                        tabelle.Email=email;
                        tabelle.Kenntwort=kenntwort;
    
                        tabelle.save(function (err,newTable) {
                          
                              if(err)
                              {
                                response.send({ success : false, message : err });
                              }
                              else
                              {
                                response.json({success:true,ID:newTable._id,Email:newTable.Email,Kenntwort:newTable.Kenntwort});
                                
                              }
                        });
                    }
                  }            
              });
     });
    /******************************************************************************************************************** */
    app.get('/addition', function(request, response) {
      
        
          var email=request.query.email;
          var kenntwort=request.query.password;
          var thema=request.query.topic;
          var nahricht=request.query.message;
        
      
                Liste.findOne({Email: email, Kenntwort: kenntwort}).then(function(record){
                 
                  record.Gereat.push({Thema:thema,Nachricht:nahricht});
                  record.save(function (err){
      
                    if(err)
                    {
                      console.log(err);
                      response.send({ success : false, message : err });
                    }
                    else
                    {
                      console.log('Datei wurde Erfolgreich hinzugefügt');
                      response.send("OK");
                    }
      
                  });
              });
        
         });
   /******************************************************************************************************************** */
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
  /******************************************************************************************************************** */
  function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}