# Week 8 — Local Backend (Node.js Only)

This directory extends the **existing Week 7 Expense Reimbursement reference project**. It does not replace `src/` and does not connect to the frontend yet.

## Run (from the repository root)

```bash
node --version
node backend/test-backend.js
node backend/json-demo.js
```

No `npm install`, Express, web server, AWS account, browser, or database is required.

## Files

- `backend.js` — receives one expense object, checks all six employee-input fields, independently enforces receipt policy, and returns an accepted/rejected result and approval route.
- `test-backend.js` — repeats and automatically compares expected vs actual outcomes for valid, invalid, boundary, and misuse cases.
- `json-demo.js` — previews object-to-JSON text conversion in preparation for Week 9.

## Why two validation locations?

The Week 7 browser checks improve user experience. A user controls the browser and may bypass those checks. The backend must protect the transaction even when a request arrives without using our form.

The backend also checks `expenseCategory` and `description`, because these fields are required by the **existing** `src/index.html` and `docs/03-system-design/data-dictionary.md`. The category values are the HTML `<option value="...">` codes; see the Week 8 data contract.

## Important limitation

An accepted response contains a **demo** `transactionId`, `status: "Submitted"`, and `submittedAt`, but `persisted: false` explicitly means **nothing was saved**. Demo IDs do not guarantee permanent uniqueness. Do not describe a passing local test as an official saved transaction. Official persistence begins in Week 11.

## Upcoming weeks

- Week 9: reuse `processExpense` behind a local API (Express/HTTP/JSON/`fetch()`).
- Week 10: move that logic into AWS Lambda + API Gateway.
- Week 11: DynamoDB persistence for a create and retrieve path.

For detailed documentation, open `docs/08-local-backend/`.
