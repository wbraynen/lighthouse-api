"use strict"

var express = require('express')
var app = express()

var mongojs = require('mongojs')
var collections = ['dataNotUsedInRankings', 'diversity', 'emergingFields', 'generalInformation', 'otherOverallRankingMeasures', 'rankings', 'researchActivity', 'studentActivities', 'studentSupportAndOutcomes']
var db = mongojs('nrc', collections)

var redis = require('redis')
var redisClient = redis.createClient()
redisClient.on('connect', function() {
    console.log('connected')
})
precacheCommonRoutes()

function precache( route, collection ) {
	collection.find( {}, {_id: 0 }, function(err, docs) {
		if (err) {
			console.log( 'Couldn\'t find on disk ' + route )
			console.log( '  and so, failed to precache it.' )
		} else {
			redisClient.set( route, JSON.stringify(docs) )
			console.log( 'Precached ' + route )
		}
	})
}

function precacheCommonRoutes() {
	precache( '/nrc/dataNotUsedInRankings', db.dataNotUsedInRankings )
	precache( '/nrc/diversity', db.diversity )
	precache( '/nrc/emergingFields', db.diversity )
	precache( '/nrc/generalInformation', db.diversity )
	precache( '/nrc/otherOverallRankingMeasures', db.diversity )
	precache( '/nrc/rankings', db.diversity )
	precache( '/nrc/researchActivity', db.diversity )
	precache( '/nrc/studentActivities', db.diversity )
	precache( '/nrc/studentSupportAndOutcomes', db.diversity )
}

app.listen(3000)
console.log('Node.js Express server is running on port 3000...')


app.get('/', welcome)
app.get('/nrc/', welcome)

app.get('/nrc/timeToDegree', getTimeToDegree)
app.get('/nrc/timeToDegree/:id', getTimeToDegreeForProgram)

app.get('/nrc/dataNotUsedInRankings', getDataNotUsedInRankings)
app.get('/nrc/diversity', getDiversity)
app.get('/nrc/emergingFields', getEmergingFields)
app.get('/nrc/generalInformation', getGeneralInformation)
app.get('/nrc/otherOverallRankingMeasures', getOtherOverallRankingMeasures)
app.get('/nrc/rankings', getRankings)
app.get('/nrc/researchActivity', getResearchActivity)
app.get('/nrc/studentActivities', getStudentActivities)
app.get('/nrc/studentSupportAndOutcomes', getStudentSupportAndOutcomes)


function welcome(req, res) {
    var path = '/home/will/lighthouse-api' // change this
    res.sendFile('index.html', { root: path })
}

function getTimeToDegree(req, res) {
	db.studentSupportAndOutcomes.find( {}, {_id: 0, "Program ID": 1, "Institution Name": 1, "Program Name": 1, "Median Time to Degree (Full- and Part-Time Graduates)": 1},
		function(err, docs) {
			if (err) {
				res.send(err)
			} else {
				res.json(docs)
			}
		}
	)
}

function getTimeToDegreeForProgram(req, res) {
	var programId = parseInt(req.params.id)
	db.studentSupportAndOutcomes.findOne( {"Program ID": programId}, {_id: 0, "Program ID": 1, "Institution Name": 1, "Program Name": 1, "Median Time to Degree (Full- and Part-Time Graduates)": 1},
		function(err, docs) {
			if (err) {
				res.send(err)
			} else {
				res.json(docs)
			}
		}
	)
}

function send(req, res, route, collection) {
	if (route == undefined) {
		throw Error("route is undefined")
	}
	if (collection == undefined) {
		throw Error("collection is undefined")
	}

	redisClient.get( route, function(err, reply) {
		if (!err && reply != null) {
			res.json( reply )
		} else {
			console.log('Not in redis :(')
			collection.find( {}, {_id: 0 }, function(err, docs) {
				if (err) {
					res.send(err)
				} else {
					res.json(docs)
				}
			})
		}
	})
}

function getDataNotUsedInRankings(req, res) {
	send(req, res, '/nrc/dataNotUsedInRankings', db.dataNotUsedInRankings)
}

function getDiversity(req, res) {
	send(req, res, '/nrc/diversity', db.diversity)
}

function getEmergingFields(req, res) {
	send(req, res, '/nrc/emergingFields', db.emergingFields)
}

function getGeneralInformation(req, res) {
	send(req, res, '/nrc/generalInformation', db.generalInformation)
}

function getOtherOverallRankingMeasures(req, res) {
	send(req, res, '/nrc/otherOverallRankingMeasures', db.otherOverallRankingMeasures)
}

function getGeneralInformation(req, res) {
	send(req, res, '/nrc/generalInformation', db.generalInformation)
}

function getRankings(req, res) {
	send(req, res, '/nrc/rankings', db.rankings)
}

function getResearchActivity(req, res) {
	send(req, res, '/nrc/researchActivity', db.researchActivity)
}

function getStudentActivities(req, res) {
	send(req, res, '/nrc/studentActivities', db.studentActivities)
}

function getStudentSupportAndOutcomes(req, res) {
	send(req, res, '/nrc/studentSupportAndOutcomes', db.studentSupportAndOutcomes)
}

module.exports.server = app
