 #!/bin/sh

cd data
tar xvf mongoDump.tar
mongorestore dump
