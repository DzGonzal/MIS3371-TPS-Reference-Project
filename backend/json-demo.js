"use strict";

// MIS 3371 | Week 8 Session 2 — JavaScript object vs JSON TEXT.
// Run: node backend/json-demo.js
// Week 9 will use JSON with HTTP; today nothing is sent over a network.

// One JavaScript object representing the SIX fields already in our Week 7 form.
const expense = {
  employeeId: "E1045",
  expenseDate: "2026-10-01",
  expenseCategory: "client-meal",
  expenseAmount: 5600,
  description: "Client dinner after project meeting",
  receiptAttached: true
};

console.log("1. JavaScript object (available inside this program):");
console.log(expense);

// stringify converts the object into JSON text. The optional null, 2 arguments
// make it easier to read by adding indentation; they are not required.
const jsonText = JSON.stringify(expense, null, 2);
console.log("\n2. JSON text (a portable representation of the same fields):");
console.log(jsonText);

// parse converts JSON text BACK into a usable JavaScript value.
const parsedExpense = JSON.parse(jsonText);
console.log("\n3. Parsed back into a JavaScript object:");
console.log(parsedExpense);
console.log("\nThis is a LOCAL conversion only. No HTTP, API, Express, or AWS yet.");
