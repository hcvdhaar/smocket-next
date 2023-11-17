# First steps for having a fullstack dev setup

**Stack**

- Next JS for frontend and backend (for reaching out to the DB)
- MongoDB
- Docker for running MongoDB instance and easy deployment.

**STEPS**

- install prisma (client).
- running a Mongo instance in Docker which is configured to be used with Prisma (It needs to have a replica set of a database, since Prisma works with transactions).
- Configure Prisma to connect with Mongo in the Docker container.
- Create first Prisma Schema and run `npx prisma generate` to create types.
- Prisma to initialize connection with DB and create first collection. Running `npx prisma db push`
- Use the Mongo in Next with Server Actions
