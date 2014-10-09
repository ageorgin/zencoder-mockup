/**
 * Created by ageorgin on 09/07/14.
 */

// Package inclusion
var express = require('express');
var Job = require('../model/job');
var ZencoderResponse = require('../component/zencoder/response');
var ZencoderOutput = require('../component/zencoder/output');
var request = require('request');
var ZencoderNotify = require('../component/zencoder/notify');

// init vars
var router = express.Router();

// route declaration
router.get('/test', function(req, res){
    var testResponse = new ZencoderResponse();
    for(var i=0; i < 3; i++) {
        testResponse.addOutput(new ZencoderOutput(i, null, "url/" + i));
    }
    res.json(testResponse);
}).post('/jobs', function(req, res){        // create job
    var newjob = new Job(req.body);
    newjob.save(function(err, result){
        if(err) {
            res.json({message: 'error ' + err});
        } else {
            var newJobResponse = new ZencoderResponse();
            newJobResponse.data.id = result._id;
            result.output.forEach(function(outputObj, index){
                newJobResponse.addOutput(new ZencoderOutput(index, null, outputObj.url));
            });
            res.status(201);
            res.json(newJobResponse.data);
        }
    });
}).get('/jobs', function(req, res){
    Job.find(function(err, result){
        res.json(result);
    });
}).get('/jobs/:job_id', function(req, res){
    Job.findOne({_id: req.params.job_id}, function(err, result){
        if(null == result) {
            res.status(404).send('Not found');
        } else {
            res.json(result);
        }
    });
}).post('/notify', function(req, res){
    Job.findOne({_id: req.body.jobId}, function(err, result){
        if(null == result) {
            res.status(404).send('Not found');
        } else {
            if(null == req.body.filename) {
                res.send('notify all job');
            } else {
                var jobStatus = '';
                var outputStatus = '';

                switch(req.body.jobStatus) {
                    case 'PROCESS':
                        jobStatus = 'processing';
                        break;

                    case 'FINISH':
                        jobStatus = 'finished';
                        break;

                    case 'CANCEL':
                        jobStatus = 'cancelled';
                        break;

                    default:
                        jobStatus = 'failed';
                        break;
                }

                switch(req.body.outputStatus) {
                    case 'PROCESS':
                        outputStatus = 'processing';
                        break;

                    case 'FINISH':
                        outputStatus = 'finished';
                        break;

                    case 'CANCEL':
                        outputStatus = 'cancelled';
                        break;

                    default:
                        outputStatus = 'failed';
                        break;
                }

                for(var i=0; i < result.output.length; i++) {
                    if( result.output[i].filename == req.body.filename ) {
                        var postData = new ZencoderNotify(result._id, jobStatus, result.submitted_at, result.output[i]._id, result.output[i].url, outputStatus);

                        request.post({
                            headers: {'content-type' : 'application/x-www-form-urlencoded'},
                            url:     result.output[i].notifications[0].url,
                            body:    JSON.stringify(postData)
                        }, function(error, response, body){
                            if( 200 == response.statusCode ) {
                                result.status = req.body.jobStatus;
                                result.output[i].status = req.body.outputStatus;
                                result.save(function(err, result){
                                    if(err) {
                                        res.json({message: 'error ' + err});
                                    } else {
                                        res.json(result);
                                        //res.json('ok');
                                    }
                                });
                            } else {
                                res.status(404).send('ko');
                            }

                        });

                        //res.json(postData);
                        break;
                    }
                }
            }
        }
    });
});
// export API route
module.exports = router;
