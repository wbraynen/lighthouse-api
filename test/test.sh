 #!/bin/sh

# restore db
tar xvf data/mongoDump.tar
mongorestore data/dump

# run mocha tests
npm test
