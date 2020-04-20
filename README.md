# links.zenika.com

Create Zenika-branded links that redirect to anywhere!

## Development setup

### Run attached services

Run `docker-compose up` to start the database and GraphQL API. These are required to run when working on either the server or the ui.

### Working on the UI

The UI is an admin interface to manage links.

In `web/`, copy `.env.example` to `.env` then run `npm ci` the `npm start`.

### Working on the server

The server handles redirections. It is independant from the UI.

In `server/`, copy `.env.example` to `.env` then run `npm ci` the `npm run dev`.

### Working on the database or the GraphQL API

In `hasura/`, run `npm run console` to open the Hasura console. Make modifications from there then commits the migrations files created by the console. If the console generates lots of files, use `npx hasura migrate squash` to squash them.
