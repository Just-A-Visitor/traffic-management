const express = require('express');
const app = express();
const queryRoutes = express.Router();
// Require Business model in our routes module
// let Business = require('../models/Query');
var MongoClient = require('mongodb').MongoClient;


var url = "mongodb://localhost:27017/";
var aadhar='';
queryRoutes.route('/work3').post(function (req, res) {
aadhar=0;
    // var a = ({ "name": "1kushagra", "age": 20 });
        aadhar=parseInt(req.body.aadharNo, 10);
        console.log('recieving');
        console.log(aadhar);

});

queryRoutes.route('/work4').get(function (req, res) {
    console.log('sending');
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("traffic");
        //Exclude the _id field from the result:
        dbo.collection("personDetails").find({ "aadharNo": aadhar }, {
            projection: {
                _id: 0,
            }
        }).toArray(function (err, result) {
            if (err) throw err;
             console.log(result);
             result=JSON.stringify(result);
             console.log(result);
            //  res.send(401,result);
            res.json(result);
             db.close();         
            // console.log('result is');
            // console.log(r);
        });
})
});




queryRoutes.route('/work5').get(function (req, res) {
    console.log('sending max voilation');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("traffic");
        dbo.collection("personDetails").find({},{
            projection: {
                _id: 0,
                violationCount:1,
                name:1
            }
        }).sort({violationCount: -1 }).limit(3).toArray(function(err, result) {
            if (err) throw err;
            console.log('thia');

            console.log(result);
            result=JSON.stringify(result);
            //  console.log(result);
            res.json(result);
             db.close();
        });
        });          
            // console.log('result is');
            // console.log(r);
        });


        queryRoutes.route('/work6').get(function (req, res) {
            console.log('sending max voilation');
           
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("traffic");
                dbo.collection("violation").aggregate([ 
                {'$group': {'_id': '$area', pinCode: { $first: "$pinCode"} ,   'Violations': {'$sum': 1}  }},
                {'$sort': {'Violations': -1}}
                ]).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                result=JSON.stringify(result);
            //  console.log(result);
              res.json(result);
                db.close();
                });
            });     
                    // console.log('result is');
                    // console.log(r);
                });        



        queryRoutes.route('/work7').get(function (req, res) {
            console.log('sending max voilation');
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("traffic");
                dbo.collection('violation','insurance').aggregate([
                  { $lookup:
                    {
                      from: 'insurance',
                      localField: 'vehicleNo',
                      foreignField: 'vehicleNo',
                      as: 'vehi'}
                  },
                
                  {'$group': { _id: "$_id",
                                've': {'$push': "$vehi.InsuranceProvider"} }
                  },
                
                  {'$group': { _id: "$ve",   'ViolatorCount': {"$sum": 1}   }
                  },
                  
                  {'$sort': {'ViolatorCount': -1}} ,
                  
                  { $unwind : "$_id" },
                  
                  {
                      $project: {
                          ViolatorCount: 1,
                          _id: { $ifNull: [ "$_id", "Uninsured" ] }
                      }
                  }
                ]).toArray(function(err, result) {
                  if (err) throw err;
                  console.log(result);
                  result=JSON.stringify(result);
            //  console.log(result);
            res.json(result);
             db.close();
                });
              }); 
                    // console.log('result is');
                    // console.log(r);
                });

                queryRoutes.route('/work8').get(function (req, res) {
                    console.log('sending max voilation');
                    var duration = {
                        "12am - 5am": 0,
                        "5am - 11am": 0,
                        "11am - 5pm": 0 ,
                        "5pm - 9pm": 0 ,
                        "9pm - 12am": 0 
                      };
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("traffic");
                        dbo.collection("violation").aggregate([ 
                          {'$group': {'_id': '$violationNo', time: { $first: "$time"} }
                          }]).toArray(function(err, result) {
                                if (err) throw err;
                                for (var key in result){
                                  obj1 = result[key];
                                  tim = obj1.time;
                                  newtim = tim.split(':') ;
                                  newtim = newtim[0];
                                  newtim = parseInt(newtim,10)
                                  if(newtim >= 0 && newtim < 5){
                                    duration['12am - 5am'] = duration['12am - 5am'] +  1; 
                                  }
                                  else if (newtim >= 5 && newtim < 11){
                                    duration['5am - 11am'] = duration['5am - 11am'] +  1; 
                                  }
                                  else if (newtim >= 11 && newtim < 17){
                                    duration['11am - 5pm'] = duration['11am - 5pm'] +  1; 
                                  }
                                  else if (newtim >= 17 && newtim < 21){
                                    duration['5pm - 9pm'] = duration['5pm - 9pm'] +  1; 
                                  }
                                  else {
                                    duration['9pm - 12am'] = duration['9pm - 12am'] +  1; 
                                  }
                                  //console.log(newtim);
                                }
                                duration=JSON.stringify(duration);
                                //  console.log(result);
                                res.json(duration);
                                 db.close();
                        });
                      }); 

                         // console.log('result is');
                            // console.log(r);
                        });        
        







                        queryRoutes.route('/work9').get(function (req, res) {
                            console.log('sending max voilation');
                           
                            MongoClient.connect(url, function(err, db) {
                                if (err) throw err;
                                var dbo = db.db("traffic");
                                dbo.collection("crossing").aggregate([ 
                                    {'$group': {'_id': '$crossingId',
                                    pinCode: { $first: "$pincode"} ,
                                    crossingLocation: { $first: "$crossingLocation"} ,
                                    tracking : {$first : "$tracking"} ,
                                    blockId : { $first: "$blockId"},
                                    date : {$first : "$date"}              
                                    }},
                                            
                                    // { $unwind : "$tracking" }
                                    // {'$sort': {'Violations': -1}}
                                ]).toArray(function(err, result) {
                                  if (err) throw err;
                                  
                                  curr_time = Date.parse("2019-04-19T10:21:00.000Z");
                                  // epoch = Date.parse("2019-04-19T10:21:00.000Z")
                                  res1 = [];
                                  for (var key in result) {
                                    // if (p.hasOwnProperty(key)) {
                                    //     console.log(key + " -> " + p[key]);
                                    // }
                                      obj1 = result[key];
                                      obj2 = result[key].tracking;
                                      // console.log(obj2)
                                      
                                      d = obj1.date;
                                      sum1 = 0;
                                      cou1 = 0;
                                      for (var ti in obj2){
                                        x = obj2[ti];
                                        // console.log(x);
                                        t = x.timestamp;
                                        ts = d+"T"+t+ ":00.000Z";
                                        stamp_time = Date.parse(ts);
                                                    if ( curr_time -  stamp_time < 6*60*1000 ){
                                                  //   res1 = res1 + obj1;
                                                    // console.log(ts);
                                                    sum1 = sum1 +  x.vehicleCount;
                                                    cou1 = cou1 + 1;
                                                  }   
                                    }
                                      delete obj1.tracking;
                                      avg1 = sum1 / cou1;
                                      avg1 = Math.ceil(avg1);
                                      obj1.density = avg1;
                                      // console.log(sum1);
                                      // console.log(cou1);

                                    //   console.log(obj1);
                                      // console.log(avg1);
                                      
                                      
                                         
                                  }

                                  result.sort((a, b) => (a.density < b.density) ? 1 : -1)
                                //   result.sort((a, b) => (a.density < b.density) ? 1 : -1) ;
                                //   result.slice(0, 5);
                                r1=result.slice(0, 5);
                                console.log("Done");

                                  console.log(r1);
                                  r1=JSON.stringify(r1);
                                //  console.log(result);
                                res.json(r1);
                                  db.close();
                                });
                              });     
                                    // console.log('result is');
                                    // console.log(r);
                                });        
                

module.exports = queryRoutes;
