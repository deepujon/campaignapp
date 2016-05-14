var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('geo:satyam@ds015909.mlab.com:15909/heroku_dnmj5kmm');
// get an instance of router





// Make our db accessible to our router
router.use(function(req,res,next){
    req.db = db;
    next();
});

/* GET statesCollection page. */
router.get('/',function(req, res) {
    var db = req.db;
    var collection = db.get('country');
	  collection.find({},{},function(e,docs){
    console.log(docs);

    res.json( {
            "countryCollection" :   JSON.stringify(docs)

        });
    });
});
/* GET statesCollection page. */
router.get('/:id',function(req, res) {
    var db = req.db;
    var collection = db.get('country');
    var idparam = req.params.id;
    var query = req.query.q;

    if(idparam != null && idparam !=''){
      console.log('findbyID');
      console.log(idparam);
  	  collection.findById(idparam,function(e,docs){
            console.log(docs);
            res.json(docs);
          });
    }
});

/* GET statesCollection page. */
router.get('/:id/electionTypes',function(req, res) {
    var db = req.db;
    var collection = db.get('country');
    var idparam = req.params.id;
    var query = req.query.q;

    if(idparam != null && idparam !=''){
      console.log('findbyID');
      console.log(idparam);
  	  collection.findById(idparam,['electionTypes','-_id'],function(e,docs){
            console.log(docs);
            res.json(docs);
          });
    }
});
/* GET statesCollection page. */
router.get('/:id/states',function(req, res) {
    var db = req.db;
    var collection = db.get('country');
    var idparam = req.params.id;
    var query = req.query.q;

    if(idparam != null && idparam !=''){
      console.log('findbyID');
      console.log(idparam);
  	  collection.findById(idparam,['states','-_id'],function(e,docs){
            console.log(docs);
            res.json(docs);
          });
    }
});
/* GET statesCollection page. */
router.get('/:id/states/:code',function(req, res) {
    var db = req.db;
    var collection = db.get('country');
    var idparam = req.params.id;
    var codeparam = req.params.code;
    var query = req.query.q;

    if(idparam != null && idparam !=''){
      console.log('findbystatecode');
      console.log(codeparam);
      //db.country.find( { "states.name": "Kerala" },{"states":  { $elemMatch: { name: "Kerala" } } , _id: 0} ).pretty()
  	  collection.find({"states.code":codeparam},{"states":  { $elemMatch: { code: codeparam } } , _id: 0},function(e,docs){
            console.log(docs);
            res.json(docs);
          });
    }
});
module.exports = router;
