# Week 8 — Expense Transaction Data Contract

This document maps the **existing** Week 7 HTML (`src/index.html`) and Week 3 data dictionary (`docs/03-system-design/data-dictionary.md`) to the new backend. It is not a new form specification. The frontend remains unchanged this week.

## Employee-entered input

`processExpense(expense)` expects one JavaScript object. **All six fields are required**, and the receipt flag is required as a Boolean even when no receipt itself is required by policy.

| Field | Expected input | Rule / example |
|---|---|---|
| `employeeId` | Nonblank string | `"E1045"` |
| `expenseDate` | Real calendar date string (`YYYY-MM-DD`) | Today or earlier; impossible/future dates rejected |
| `expenseCategory` | One HTML option value | `"client-meal"`, `"travel"`, `"lodging"`, `"office-supplies"`, `"other"` |
| `expenseAmount` | Number or numeric string | Whole cents, at least $0.01; `75`, `"75.01"` |
| `description` | Nonblank string | Business purpose of expense |
| `receiptAttached` | Boolean | `true` or `false`; **not** the text `"false"` |

The browser shows a label such as **Client Meal**, but its HTML option value is `client-meal`. The backend validates the value because that is what a frontend would eventually send. It does not currently verify or upload a receipt file: the checkbox represents receipt evidence for this teaching version.

### Sample direct local call

```js
const expense = {
  employeeId: "E1045",
  expenseDate: "2026-10-01",
  expenseCategory: "client-meal",
  expenseAmount: 5600,
  description: "Client dinner after a project meeting",
  receiptAttached: true
};
const result = processExpense(expense);
```

This sample date is illustrative. Test files use the current date dynamically where needed.

## Fields the caller does **not** control

The existing data dictionary calls out derived, reference, system, and audit fields. Never trust user-supplied `receiptRequired`, `directorApprovalRequired`, `approvalPath`, `transactionId`, `status`, or `submittedAt`. The Week 8 backend computes local demonstration values instead. Employee name, department, and manager lookup are **not implemented** in Week 8.

## Structured result

Rejected: `{ success: false, message: "...", persisted: false }`.

Accepted result includes `success: true`, clear message, provisional `status`, demo `transactionId` and `submittedAt`, `receiptRequired`, `directorApprovalRequired`, `approvalPath`, `persisted: false`, and a normalized six-field `expense` object.

The demo result must **not** be interpreted as an official stored transaction. The backend does not connect to a database and it does not implement status transitions or authorization. These remain future architectural responsibilities.

## Why no frontend change now?

Week 8 intentionally isolates the backend trust boundary. In Week 9, `src/app.js` can assemble these same fields into a request and use `fetch()` to call a local server that delegates to `processExpense()`.
