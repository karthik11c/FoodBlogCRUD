const router = require('express').Router();
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
var async = require('async');
var fastfoodModel = require('../models/fastfood');
var rn = require('random-number');
const cors = require('cors');

var options = {
  min:  1
, max:  1000
, integer: true
}
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
 
router.use(bodyParser.urlencoded({
  extended: false
}));

router.use(bodyParser.json());

// Add Recipe
router.post("/addRecipe",cors(corsOptions),async (req,res)=>{

  id = rn(options);
  req.body["id"] = id; 
  var model = new fastfoodModel(req.body);
  try{
                  model.save(function(err) {
                    if (err) {
                      if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate username
                        return res.json({ message : "Recipe already exist", "response_code" : 405 });
                      }
                  console.error(err);
                      // Some other error
                      return res.json({ message : "someThing went wrong in Backend", "response_code" : 422 });
                    }

                    return res.json({message :"Recipe added...","response_code":200});
                  });
                  
            }catch(e){
            console.log("error : "+e);      
            return res.json({ message : "someThing went wrong in Backend", "response_code" : 405 });
          }   
});


// get List of all Food Recipes
router.get("/recipeById/:id",cors(corsOptions),async (req,res)=>{
  console.log('request id :'+JSON.stringify(req.params));
  const  { id } =  req.params;
  // console.log("id:"+id);
  if(id != null)
    {
        try{  
             await fastfoodModel.find({ id : id}, (err, result)=>{
              if(err) throw err;
              console.log("response: "+JSON.stringify(result));
              return res.json(result);
            });
        }catch(e){
          console.error("error : "+e);      
          return res.json({ message : "someThing went wrong in Backend", "response_code" : 405 });
        }   
    }else{
      return res.json(await createMessage("please Enter All Fields...",440));
    }
});

//all docs
router.get("/",cors(corsOptions),async (req,res)=>{
        try{  
             await fastfoodModel.find({}, (err, result)=>{
              if(err) throw err;
              console.log("response: "+JSON.stringify(result));
              return res.json(result);
            });
        }catch(e){
          console.error("error : "+e);      
          return res.json({ message : "someThing went wrong in Backend", "response_code" : 405 });
        }   
  });

//search apiwith sort

// sort({ field : criteria}).exec(function(err, model){ 
router.get("/searchWithSort",cors(corsOptions),async (req,res)=>{
    try{  
      const {recipeName,countryOrigin} = req.query;
      let searchObject = {};     
      conditionObject = {};
      if(recipeName != null){
        const userRegex = new RegExp(recipeName, 'i');
        searchObject['recipeName'] = userRegex; 
        conditionObject['recipeName'] = 'asc';
      }
      if(countryOrigin != null){
        searchObject['countryOrigin'] = countryOrigin; 
        conditionObject['countryOrigin'] = 'asc';
      }
      await fastfoodModel.find(searchObject).sort(conditionObject).exec((err, result)=>{
        if(err) throw err;
        console.log("response: "+JSON.stringify(result));
        return res.json(result);
      });
    }catch(e){
      console.error("error : "+e);      
      return res.json({ message : "someThing went wrong in Backend", "response_code" : 405 });
    }   
});


// update employee
router.post('/updateRecipe', cors(corsOptions),(req, res) => {
  // console.log('request id :'+JSON.stringify(req.body));
  const {id} = req.body;
  var arr = {};
    for (const [key, value] of Object.entries(req.body)) {
       if(key != "id" && key !=null && value != null){
         arr[key] = value;
       }
    } 

  if(id != null)
    {
        try{  
            //checking userid valid or not - check later
            fastfoodModel.findOne({id: id},async(err, result)=>{
              if(err) throw err;
              if(result){
                // console.log("result:"+JSON.stringify(result._doc));

                for (const [sourcekey, sourcevalue] of Object.entries(arr)) {
                  for (const [destkey, destvalue] of Object.entries(result._doc)) {
                    if(sourcekey == destkey){
                      result[destkey] = sourcevalue;
                    }
                  }   
                }            
                result.save();
                return res.json(result);
              }
              else{
                return res.json({ message : "record not found", "response_code" : 404 });
              }
            });
        }catch(e){
          console.log("error : "+e);      
          return res.json({ message : "someThing went wrong in Backend", "response_code" : 405 });
        }   
    }else{
      return res.json({ message : "plz enter all fields", "response_code" : 440 });
    }
});

// Delete a employee
router.post('/deleteRecipe', cors(corsOptions),(req, res) => {
  const {id} = req.body;
 
  if(id != null)
    {
        try{  
            //checking userid valid or not - check later
            fastfoodModel.deleteOne({id: id},async(err, result)=>{
              if(err) throw err;
              if(result){
                return res.json(result);
              }
              else{
                return res.json({ message : "record not found", "response_code" : 404 });
              }
            });
        }catch(e){
          console.log("error : "+e);      
          return res.json({ message : "someThing went wrong in Backend", "response_code" : 405 });
        }   
    }else{
      return res.json({ message : "plz enter all fields", "response_code" : 440 });
    }
});

function createMessage(message , response_code){
  return { message : message , response_code : response_code}; 
 }
module.exports = router;
 