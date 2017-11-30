An example of how to use D3 v4 in a development environment.

To get started:
```
npm run start:first
```

This will install the necessary NPM modules, compile `index.js` with webpack, and start
`webpack-dev-server` to automatically serve up `index.html` (which is set up to already
include the output produced by webpack.) Then just navigate to `localhost:8080` to see
the output, or begin modifying files.

Any updates while the dev server is running will then automatically update the page if
you have it open in a browser window.
