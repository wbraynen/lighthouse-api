"use strict";

var express = require('express');
var app = express();

var mongojs = require('mongojs');
var collections = ['dataNotUsedInRankings', 'diversity', 'emergingFields', 'generalInformation', 'otherOverallRankingMeasures', 'rankings', 'researchActivity', 'studentActivities', 'studentSupportAndOutcomes'];
var db = mongojs('nrc', collections);


//
// Router / Controller
//
app.get('/', welcome);
app.get('/nrc/', welcome);

app.get('/nrc/timeToDegree', getTimeToDegree);
app.get('/nrc/timeToDegree/:id', getTimeToDegreeForProgram);

app.get('/nrc/dataNotUsedInRankings', getDataNotUsedInRankings);
app.get('/nrc/diversity', getDiversity);
app.get('/nrc/emergingFields', getEmergingFields);
app.get('/nrc/generalInformation', getGeneralInformation);
app.get('/nrc/otherOverallRankingMeasures', getOtherOverallRankingMeasures);
app.get('/nrc/rankings', getRankings);
app.get('/nrc/researchActivity', getResearchActivity);
app.get('/nrc/studentActivities', getStudentActivities);
app.get('/nrc/studentSupportAndOutcomes', getStudentSupportAndOutcomes);

app.listen(3000);
console.log('Node.js Express server is running on port 3000...');



//
// "Views"
//

function welcome(req, res) {
    var path = '/home/will/lighthouse-api'; // change this
    res.sendFile('index.html', { root: path });
}

function getTimeToDegree(req, res) {
	console.log('Fetching time to degree...');
	db.studentSupportAndOutcomes.find( {}, {_id: 0, "Program ID": 1, "Institution Name": 1, "Program Name": 1, "Median Time to Degree (Full- and Part-Time Graduates)": 1},
		function(err, docs) {
			if (err) {
				res.send(err);
			} else {
				console.log( ' Sending time to degree.' );
				res.json(docs);
			}
		}
	);
}

function getTimeToDegreeForProgram(req, res) {
	var programId = parseInt(req.params.id);
	console.log('Fetching time to degree for Program ID ' + programId);
	db.studentSupportAndOutcomes.findOne( {"Program ID": programId}, {_id: 0, "Program ID": 1, "Institution Name": 1, "Program Name": 1, "Median Time to Degree (Full- and Part-Time Graduates)": 1},
		function(err, docs) {
			if (err) {
				res.send(err);
			} else {
				console.log( ' Sending time to degree for Program ID ' + programId);
				res.json(docs);
			}
		}
	);
}

function send(req, res, collection, collectionName) {
	console.log('Fetching ' + collectionName + '...');
	collection.find( {}, {_id: 0 }, function(err, docs) {
		if (err) {
			res.send(err);
		} else {
			console.log(' Sending ' + collectionName + '.');
			res.json(docs);
		}
	});
}

function getDataNotUsedInRankings(req, res) {
	send(req, res, db.dataNotUsedInRankings, 'dataNotUsedInRankings');
}

function getDiversity(req, res) {
	send(req, res, db.diversity, 'diversity');
}

function getEmergingFields(req, res) {
	send(req, res, db.emergingFields, 'emergingFields');
}

function getGeneralInformation(req, res) {
	send(req, res, db.generalInformation, 'generalInformation');
}

function getOtherOverallRankingMeasures(req, res) {
	send(req, res, db.otherOverallRankingMeasures, 'otherOverallRankingMeasures');
}

function getGeneralInformation(req, res) {
	send(req, res, db.generalInformation, 'generalInformation');
}

function getRankings(req, res) {
	send(req, res, db.rankings, 'rankings');
}

function getResearchActivity(req, res) {
	send(req, res, db.researchActivity, 'researchActivity');
}

function getStudentActivities(req, res) {
	send(req, res, db.studentActivities, 'studentActivities');
}

function getStudentSupportAndOutcomes(req, res) {
	send(req, res, db.studentSupportAndOutcomes, 'studentSupportAndOutcomes');
}

