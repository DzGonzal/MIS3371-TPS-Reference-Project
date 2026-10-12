# Week 8 — Local Backend / Application Logic

## How this builds on Weeks 1–7

We are still building the **same Expense Reimbursement System**. The repository's established proposal, requirements, business rules, workflow, states, data dictionary, HTML, CSS, and browser JavaScript remain in place. Week 8 adds one independent application layer under `backend/`.

The user controls browser-side code. HTML and JavaScript validation improve the experience but can be changed or bypassed. The backend must validate incoming transaction data itself.

**The Week 8 flow is:** sample JavaScript transaction object → `processExpense()` → independent validation → approval routing → structured result. The test file invokes the function directly through Node.js. The existing browser is *not connected to it*.

## Node.js vs a server

Node.js executes JavaScript outside the browser. Running `node backend/test-backend.js` does **not** start a web server. We use Node.js solely to call a backend function with sample transaction objects and inspect results. HTTP, Express, API endpoints, and `fetch()` belong to Week 9; AWS belongs to Week 10.

`module.exports` in `backend.js` makes `processExpense` available to other local Node files. `require("./backend")` in `test-backend.js` imports it. This is a direct local function call, not a network request.

## Business rules preserved from the existing repository

| Earlier evidence | Week 8 implementation |
|---|---|
| Data dictionary: six user-entered fields | Backend checks `employeeId`, `expenseDate`, `expenseCategory`, `expenseAmount`, `description`, `receiptAttached` independently |
| Amount must be greater than zero; HTML `min="0.01" step="0.01"` | Amount must be finite, at least one cent, and have no fractional cent |
| Expense date is an actual date, not in the future | Validate `YYYY-MM-DD` and real calendar day; then compare with the local current date |
| Expense Category dropdown | Validate one of the current HTML option values |
| Receipt required when amount **> $75** | $75.00 does not require a receipt; $75.01 does |
| Director approval required when amount **> $5,000** | $5,000 follows standard routing; $5,000.01 requires director routing |
| System values controlled by application | Ignore incoming status, approval path, ID, and timestamp; derive local demonstration values |

### Validation is not routing

Reject amount 0, an impossible date, missing description, or a missing required receipt. Do **not** reject a valid $5,600 expense merely because it requires director review. First validate; only then choose the approval path.

### Receipt flag is a Boolean

The browser `.checked` property supplies the actual Boolean `true` or `false`. It is different from a nonempty string. In JavaScript, `Boolean("false")` is `true`, so the backend strictly requires a Boolean instead of relying on truthiness.

## The data contract

The six input fields, category codes, and result shape are described in [week8-data-contract.md](week8-data-contract.md), alongside existing Week 7 HTML and the original data dictionary.

## Accepted does not mean persisted

The Week 8 function may illustrate `transactionId`, `status: "Submitted"`, and `submittedAt` for the application-layer responsibility. Its `persisted: false` flag and "Not saved" message are deliberate. It is an in-memory demo result; there is **no official saved record** and no approved/reviewed state transition. The demo ID is not permanent. Real persistence and stable IDs will be designed with the database stage in Week 11.

## Running and reading the code

```bash
node backend/test-backend.js
node backend/json-demo.js
```

- `backend.js`: trust boundary, validation, routing, local result.
- `test-backend.js`: named cases, expected versus actual, PASS/FAIL summary, process exit code on failure.
- `json-demo.js`: convert an object into JSON text and back, without sending a request.

See [week8-testing-checklist.md](week8-testing-checklist.md) for test coverage. Students adapt the *concepts* to their own approved scenario rather than copying expense thresholds indiscriminately.

## Next steps (agreed roadmap)

- **Week 9:** complete a LOCAL client–server TPS using Express, HTTP, JSON, and `fetch()`. Reuse this backend logic.
- **Week 10:** move/reuse the backend logic in AWS Lambda + API Gateway.
- **Week 11:** save and retrieve one transaction in DynamoDB.
- **Week 12:** integrate, debug, test, and complete Milestone 4—no major new technologies.
- **Week 13:** buffer, corrections, documentation, and presentation practice.
- **Weeks 14–15:** four final presentation sessions.
