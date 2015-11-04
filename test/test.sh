 #!/bin/sh

# restore db
cd data
tar xvf mongoDump.tar
mongorestore dump

# run mocha tests
npm test
