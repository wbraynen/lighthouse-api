# lighthouse-api

Landing page: [lighthouse-api.org](http://lighthouse-api.org)

Main source code: [app.js](app.js)

![Screenshot](screenshot.png)

lighthouse-api is a queryable REST API, implemented using Node.js (with Express.js) and mongodb.  It provides a number of endpoints which return data from the National Research Council's 2006 study. The data is returned in JSON format.

You can either query the data directly, build a GUI (e.g. a iOS app or a search engine in the form of a website) that consumes these endpoints, or you can even mirror this service and modify it to fit your needs as you see fit. 

This is the same dataset that is used by [philphd.org](http://philphd.org).


### Sample usage

In a web browser:
[http://104.236.148.49:3000/timetodegree](http://104.236.148.49:3000/timetodegree). If you use chrome with a json formatter extension added, the returned JSON will look much more readable. (Here is a json formatter chrome extension I use.)

Using curl:
```
$ curl http://104.236.148.49:3000/timetodegree
```

### Available endpoints (case insensitive, so all lowercase is fine:)

```
GET /dataNotUsedInRankings
GET /diversity
GET /emergingFields
GET /generalInformation
GET /otherOverallRankingMeasures
GET /rankings
GET /researchActivity
GET /studentActivities
GET /studentSupportAndOutcomes
GET /timeToDegree
```
