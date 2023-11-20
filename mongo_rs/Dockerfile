FROM mongo:4

# we take over the default & start mongo in replica set mode in a background task
ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
# we prepare the replica set with a single node and prepare the root user config
INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
INIT_USER_CMD="db.getUser('$MONGO_INITDB_ROOT_USERNAME') || db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] })"; \
# we wait for the replica set to be ready and then submit the commands just above
until (mongo admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD && $INIT_USER_CMD"); do sleep 1; done; \
# we are done but we keep the container by waiting on signals from the mongo task
echo "REPLICA SET ONLINE"; wait $MONGOD_PID;

# A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.
# Using docker build, users can create an automated build that executes several command-line instructions in succession.

# This Dockerfile is used to create a Docker image, which is a lightweight, standalone,
# executable package that includes everything needed to run a piece of software, including the code, a runtime, libraries,
# environment variables, and config files.

# In the context of the provided Dockerfile, it is used to set up a MongoDB server with a specific configuration.
# It starts from a base image (mongo:4), sets up the MongoDB server to run in replica set mode, initializes the replica set,
# creates a root user, and then waits for the MongoDB server to be ready before it finishes setting up