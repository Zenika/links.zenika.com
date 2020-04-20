# links.zenika.com

Create Zenika-branded links that redirect to anywhere!

## Development setup

### Attached services

Run `docker-compose up` to start the database and GraphQL API. These are required to run when working on either the server or the ui.

### Working on the UI

The UI is an admin interface to manage links.

In `web/`, copy `.env.example` to `.env` then run `npm ci` the `npm start`.

### Working on the server

The server handles redirections. It is independant from the UI.

In `server/`, copy `.env.example` to `.env` then run `npm ci` the `npm run dev`.
