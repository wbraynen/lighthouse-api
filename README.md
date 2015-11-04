# lighthouse-api

![Screenshot](screenshot.png)

|||
|---|---|
| Landing page: | [lighthouse-api.org](http://lighthouse-api.org) |
| Main source code: | [app.js](app.js) |

<code>lighthouse-api</code> is a queryable REST API, implemented using Node.js and MongoDB.  It provides a number of endpoints which return all the data from the [National Research Council's 2006 study](http://www.nap.edu/rdp/) (revised in 2011) of over 5000 PhD programs in the United States. The data is returned in JSON format.

You can either query the data directly, build a GUI (e.g. a iOS app or a search engine in the form of a website) that consumes these endpoints, or you can even mirror this service and modify it to fit your needs as you see fit. The search engine [philphd.org](http://philphd.org), for example, uses a part of this dataset.

Technical note for the technically curious: In addition to Node.js, I used Express.js; but not express-generator.


### Sample usage

##### In a web browser:

[http://104.236.148.49:3000/nrc/diversity](http://104.236.148.49:3000/nrc/diversity). (If you use chrome with a json formatter extension added, the returned JSON will look much more readable.)

##### Using curl:
```
$ curl http://104.236.148.49:3000/nrc/diversity
```

### Available endpoints (case insensitive, so all lowercase is fine:)

```
GET /nrc/dataNotUsedInRankings
GET /nrc/diversity
GET /nrc/emergingFields
GET /nrc/generalInformation
GET /nrc/otherOverallRankingMeasures
GET /nrc/rankings
GET /nrc/researchActivity
GET /nrc/studentActivities
GET /nrc/studentSupportAndOutcomes
GET /nrc/timeToDegree  # this is a subset of `GET /nrc/studentSupportAndOutcomes`
```

# If you clone this repo and run this api server yourself

If you want to clone this repo and run this api server yourself, then you might find [HelpfulHowtos.md](HelpfulHowtos.md) useful.  You can then also run mocha acceptance tests like so:
```
$ npm test
```
In fact, this is what TravisCI does when I `git push`.  If you run the acceptance tests yourself, then it might look like so:

![image](https://cloud.githubusercontent.com/assets/4765449/10952130/6d2d0fa2-82fe-11e5-947c-97723b6c38a2.png)
