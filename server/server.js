"use strict";

// WEEK 9 — The SERVER is our HTTP communication layer ONLY.
// We did not copy or rewrite any expense rules here. The single
// processExpense() function in backend/backend.js owns ALL validation and
// approval decisions; this server receives and returns HTTP messages.

// path is built into Node.js: it helps locate the existing src/ folder.
const path = require("node:path");
// Express is the npm package that provides our local HTTP server and API.
const express = require("express");
// Go up from server/ to the project root, then load backend/backend.js.
// The curly braces select the exported processExpense function.
const { processExpense } = require("../backend/backend");

// Create one Express application. It is not listening for requests yet.
const app = express();

// app.use registers middleware: code Express runs for incoming requests.
// express.json() parses an application/json request body, making the
// resulting JavaScript value available as req.body. It does NOT decide
// whether any expense fields are valid; backend.js does that.
// 20kb limits the size of JSON text sent, not the expense dollar amount.
app.use(express.json({ limit: "20kb" }));

//expres.static() serves static files (HTML, CSS, JS, images) from a folder.
// Make our EXISTING frontend files accessible through the same local server.
// __dirname is the folder containing this file (server/). ".." moves up
// one level to the project root; "src" is the browser-side file folder.
// Visiting / automatically loads the ONE src/index.html in the browser.

app.use(express.static(path.join(__dirname, "..", "src")));

// One API endpoint: an HTTP POST to http://localhost:3000/api/expenses.
// API endpoints are usually prefixed with /api to distinguish them from static files.
// static files are usually requested with GET, 
// while API endpoints can use POST, GET, PUT, DELETE, etc.
// API endpoint means a specific URL path that the server listens to for requests, 
// and it defines how the server should respond to those requests. 
// In this case, the endpoint is designed to handle expense data sent from the 
// frontend application.
//app.post defines a route for handling POST requests to the /api/expenses endpoint.
// The frontend sends a JSON object in the request body, which express.json()
// has already parsed into req.body. The backend returns a result object
// with success true/false and an optional message string.
// 
app.post("/api/expenses", (req, res) => {
  // express.json() already parsed the transmitted JSON into req.body.
  console.log("[SERVER] POST /api/expenses received.");
  const expense = req.body;

  // The server delegates EVERY expense check and business rule to backend.js.
  const result = processExpense(expense);
  console.log(`[SERVER] Backend accepted: ${result.success}; persisted: ${result.persisted}`);

  // Turn the backend decision into an HTTP response:
  // 200 = the backend accepted this local request; 400 = invalid input.
  // .json() serializes the result object as JSON to return to the browser.
  return res.status(result.success ? 200 : 400).json(result);
});

// The following code checks if this file is the main module being run.
// If it is, it starts the server on the specified port 
// (defaulting to 3000 if not set in the environment).
//  It also logs useful information about the server and its endpoints 
// to the console. Finally, it exports the app for use in other files, 
// such as tests.
// if you want to deine a different port,
//  you can set the PORT environment variable before running the server.
// For example, in a Unix-like terminal, you can run:
// PORT=4000 npm start

//app.listen() starts the server and listens for incoming requests on the specified port.

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Week 9 frontend: http://localhost:${port}/`);
    console.log(`Expense API: POST http://localhost:${port}/api/expenses`);
    console.log("The app runs locally. No database or AWS is used yet.");
  });
}

module.exports = app;
