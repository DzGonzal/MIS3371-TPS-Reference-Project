# Week 8 — Local Backend Testing Checklist

Run from the repository root:

```bash
node backend/test-backend.js
```

The test file compares **expected** result fields with **actual** backend fields, reports each PASS/FAIL, and exits with a nonzero status if any test fails. It does not use third-party libraries. The illustrative ID and timestamp intentionally vary and are not hard-coded expectations.

## Required reasoning and coverage

| Category | Cases to check | Expected |
|---|---|---|
| Normal valid input | Complete $50 expense | Accept; standard path; not persisted |
| Amount validity | $0, negative, blank, $0.001 | Reject |
| Minimum amount | $0.01 | Accept |
| Amount conversion | `"29.50"` input string | Accept; normalize to number |
| Receipt boundary | $75 with no receipt | Accept; receipt optional |
| Receipt boundary | $75.01 with no receipt | Reject |
| Receipt condition | $75.01 with receipt | Accept |
| Approval boundary | $5,000 with receipt | Accept; standard path |
| Approval boundary | $5,000.01 with receipt | Accept; director path |
| Required fields | Missing/blank employee ID, category, description | Reject |
| Allowed category | Unknown category code | Reject |
| Date | Missing/malformed/impossible/future date | Reject |
| Boolean flag | `"false"` string or missing indicator | Reject; requires true/false |
| Trust boundary | Fake caller-supplied `status`, ID, approvalPath | Ignore; derive application result |
| Invalid caller | `null` instead of transaction object | Reject without crashing |

## Manual consistency check

- [ ] `src/index.html`, `src/styles.css`, and `src/app.js` from Weeks 4–7 remain unchanged.
- [ ] Backend field names agree with original data dictionary and HTML `name` values.
- [ ] A rejected transaction never receives an accepted approval path.
- [ ] Accepted results explicitly say `persisted: false`.
- [ ] No HTTP server, API route, `fetch()`, AWS service, or DynamoDB connection has been added in Week 8.
- [ ] `node backend/json-demo.js` shows object → JSON text → parsed object, locally.

## Common teaching questions

**Why validate twice?** Browser-side checks help the user; a trusted backend must reject bad data even when the browser is bypassed.

**Why does $5,000.01 pass validation?** It is a valid amount with different routing, not an input error.

**Why are no transactions actually saved?** There is no database or persistence layer until Week 11.
