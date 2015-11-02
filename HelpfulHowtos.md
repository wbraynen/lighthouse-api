### Installing node and npm on Ubuntu

(a way, not the way)
```
$ sudo apt-get update
$ sudo apt-get install build-essential libssl-dev
# if necessary, given a prior install: rm -rf /root/.nvm
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
$ source ~/.profile
$ nvm --version
```
Yay, we get a version number, confirming that we have successfully installed nvm.

```
$ nvm ls-remote
```
Write down the latest version number, which is NOT on the last line of the output.  Mine is 0.12.7
```
$ nvm install 0.12.7
$ nvm use 0.12.7
$ npm -v
```

### Installing node and npm on MacOS

```
<to do>
```


### Installing express and creating a node app

Create a project directory, cd into the directory, and run this:
```
$ npm install express
```

Create a package.json file (see [package.json](package.json) for an example) in the project directory and run install:
```
$ npm install  # inside the project directory
```

Create an app.js file (see [app.js](app.js) for an example) inside the project directory and run it with node:
```
$ node app  # on your dev laptop; in production, at the very least, [Upstart](https://github.com/wbraynen/lighthouse-api/blob/master/lighthouse-api.conf) might be better
```


### Using mongo (from `$ mongo`)

Launch mongo:
```
$ mongod --config /usr/local/etc/mongod.conf   # This will run it once, not on login

Use mongo shell:
```
$ mongo   # This will launch the mongo shell
> cls
> show dbs
> use nrc   # [creates and] switches to database `nrc`
```

### Launching sublime from a macos terminal
```
$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
$ echo $PATH   # to see if /usr/local/bin is in your path; if not, add it to your path in ~/.bash_profile (or ~/.profile)
$ sublime .   # yay!
```

### Mongo and CSV

In examples below, nrc is the database name, diversity is a colleciton in that database.

Importing from csv:
```
$ mongoimport --db nrc --collection diversity --type=csv --headerline --file nrc.diversity.csv
```

Exporting to csv:
```
$ mongoexport --db nrc --collection diversity --type=csv --out diversity.csv --fields 'Broad Field','Field','Institution Name','Program Name','Number of Core Faculty','Number of New Faculty','Number of Associated Faculty,''Number of Students Enrolled (2005-2006)','Number of Students Currently Enrolled Who Are in the Candidacy Stage (2005-2006)'
```

Production dump (bson):
```
$ mongodump --db nrc
$ tar cvf dump.tar dump   # create tarball
$ tar xvf dump.tar   # extract from tarball (i.e. untar)
```
