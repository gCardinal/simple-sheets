database
===

Library to create a connection to a database. Under the hood,
Dexie.js is used to create a connection to IndexedDB, but for
the sake of keeping implementation details hidden from the app
this library offers utility methods and types as a facade.

The library exposes a type for a repository, which offers
asynchronous methods to interact with the database - should the
database move to a different API or a remote server, the switch
should be completely transparent to the app.

The app currently uses the `useLiveQuery()` hook, which would
need to be switched to something like `@tanstack/query`'s
`useQuery()` hook if the database was moved to a remote server.
But for now? Eh.
