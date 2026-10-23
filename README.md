# MIS 3371 — TPS I Reference Project
## Expense Reimbursement System

> **Instructor Reference Case Study — Do Not Copy**
>
> This repository demonstrates the expected **organization, depth, documentation quality, and semester progression** for the MIS 3371 capstone project. Students should use it as a reference for structure and quality. Your team's documentation, diagrams, business rules, data fields, and implementation must reflect **your own approved scenario**.

---

## Purpose of This Repository

The capstone project is not a collection of unrelated weekly assignments. It is one transaction-processing system that becomes more complete throughout the semester.

This reference project uses an **Expense Reimbursement System** to show how the pieces connect:

**Business problem → requirements → business rules → workflow → states → data → architecture → interface → behavior → local backend → local API → cloud → persistence**

The repository will grow as the course progresses. Students are not expected to implement material that has not yet been covered in class.

### Current release: through Week 9

This version includes:

- Project foundation and scope
- Stakeholders and requirements
- User stories and acceptance criteria
- Business rules
- Traceability
- Workflow design
- State model
- Data dictionary
- Three-tier target architecture
- Responsibility matrix
- Semantic HTML transaction interface
- Accessible form controls
- Native browser constraints and basic testing
- External CSS stylesheet
- Reusable CSS classes
- Form and content styling
- Flexbox layout
- Responsive behavior
- Focus and hover feedback
- Week 6–7 browser behavior and conditional validation
- Week 8 independent local Node.js backend with all six employee-entered fields
- Week 8 named tests for valid/invalid/boundary scenarios and local JSON demonstration
- Week 9 complete local frontend → Express HTTP API → existing backend integration
- Browser `fetch()`, backend response messages, and direct JSON/curl demonstrations

**Not implemented yet:** AWS deployment, database persistence, authentication, official transaction storage or complete approval workflow.

---

## Case Study Summary

Employees need a consistent way to submit business expenses for reimbursement. A manual or fragmented process can create incomplete submissions, unclear approval status, inconsistent policy enforcement, and weak auditability.

The proposed system allows an employee to submit an expense reimbursement request and provides a controlled path for review, approval, and completion.

### Main transaction

**Expense Reimbursement Request**

A request begins when an employee enters an eligible business expense and ends when the request is completed or rejected.

### Core business behavior

- Expense amount must be greater than zero.
- Receipt evidence is required when the amount is greater than $75.
- Expenses greater than $5,000 require director approval.
- The system must maintain a unique transaction ID.
- The official transaction status must be controlled by the application.
- Important actions must be auditable.

---

## Repository Structure

```text
MIS3371-TPS-Reference-Project/
│
├── README.md
├── docs/
│   ├── REFERENCE-GUIDE.md
│   ├── 01-project-foundation/
│   ├── 02-requirements/
│   ├── 03-system-design/
│   ├── 04-interface/
│   ├── 05-styling/
│   ├── 06-javascript/
│   ├── 07-validation-business-rules/
│   ├── 08-local-backend/
│   └── 09-local-api/
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server/
│   └── server.js
├── demo-requests/
├── package.json
└── backend/
    ├── README.md
    ├── backend.js
    ├── test-backend.js
    └── json-demo.js
```

---

## How to Use This Reference

When a class requirement asks your team to create a document or implementation artifact:

1. Read the assignment requirement first.
2. Open the corresponding reference file in this repository.
3. Study its **organization, level of detail, and connections to earlier documents**.
4. Build the equivalent artifact for your own approved transaction.
5. Do not replace your scenario with the Expense Reimbursement scenario.

A useful quality check is:

> **Can another person understand your system from your documentation without needing your team to explain missing pieces verbally?**

---

## Milestone Alignment

| Course Stage | Reference Evidence | Status |
|---|---|---|
| M1 — Project Foundation | Proposal, business problem, transaction scope, team charter | Complete |
| Requirements | Stakeholders, requirements, user stories, acceptance criteria, rules | Complete |
| Week 3 Design | Workflow, states, data dictionary, architecture, responsibility matrix | Complete |
| Week 4 Interface | Semantic HTML + accessible form | Complete |
| Week 5 | CSS + responsive user interface | Complete |
| Week 6 | JavaScript fundamentals, DOM, events, and first business-rule behavior | Complete |
| Week 7 | Conditional validation + additional business-rule behavior | Complete |
| Week 8 | Independent local backend validation + tests; Milestone 2 remains client-side | Complete |
| Week 9 | Local client–server API using HTTP, JSON, Express, and `fetch()` | Complete |
| Week 10 | AWS Lambda + API Gateway (reuse local application logic) | Upcoming |
| Week 11 | DynamoDB: save and retrieve one transaction | Upcoming |
| Week 12 | End-to-end integration, debugging, testing, Milestone 4 | Upcoming |
| Week 13 | Buffer, documentation and presentation preparation | Upcoming |
| Weeks 14–15 | Final project presentations (4 sessions) | Reserved |


---

## Final Second-Half Roadmap

Students build one transaction-processing application incrementally, without introducing several major technologies at once:

- **Week 8:** local Node.js backend/application logic; receive an object, validate independently, apply business rules, return a structured result, and test. **No server, frontend connection, HTTP/API, AWS, or database.** Milestone 2 remains a separate 60-point client-side deliverable; weekly checkpoint is four points.
- **Week 9:** complete a **local client–server** system with HTTP/JSON, Express, an API endpoint, and browser `fetch()` using the existing frontend and backend logic.
- **Week 10:** move/reuse backend logic in **AWS Lambda + API Gateway**.
- **Week 11:** use **DynamoDB** to save and retrieve one official transaction.
- **Week 12:** end-to-end integration, testing, error handling, and Milestone 4 (no major new technology).
- **Week 13:** buffer, corrections, documentation, and presentation preparation.
- **Weeks 14–15:** four final presentation sessions only.

The required final scope is one meaningful browser → API → application → database transaction flow plus retrieval. Advanced status changes, authentication implementation, S3 hosting, and complex audit infrastructure are outside the required implementation scope.

---

## Reference Quality Standard

A strong capstone artifact should be:

- **Scenario-specific** — it clearly belongs to your approved transaction.
- **Consistent** — field names, rules, statuses, and responsibilities agree across documents.
- **Traceable** — implementation decisions connect back to requirements and business rules.
- **Complete enough to understand** — important assumptions are written down.
- **Simple enough to maintain** — avoid unnecessary complexity.
- **Professional** — organized, readable, and appropriate for a business systems project.

---

## Key Distinctions

### Workflow vs. state

- **Workflow** describes actions, decisions, actors, and paths.
- **State** describes what is currently true about the transaction.

Example:
- Workflow action: **Manager reviews request**
- Transaction state: **Under Review**

### Validation vs. business rule

- **Validation:** Is the value usable?
- **Business rule:** What should happen because of the value?

Example:
- `amount = -10` → invalid
- `amount = 5600` → valid, but director approval is required

### Transaction ID vs. status

- **Transaction ID:** Which transaction is this?
- **Status:** What is true about it now?

Example:
- `transactionId = EXP-2026-00418`
- `status = Under Review`

The ID remains stable while status changes.

---

## Week 7 Implementation Status

The current `src/index.html`, `src/styles.css`, and `src/app.js` now demonstrate:

- Semantic page structure
- A complete employee transaction form
- All data-dictionary fields represented on the page
- Visible labels and appropriate controls
- Native constraints such as `required`, `min`, and `step`
- External CSS
- Reusable classes
- Box-model spacing
- Styled form controls
- Flexbox layout
- Responsive behavior
- Visible focus and hover feedback
- External JavaScript connected with `defer`
- DOM selection and form-value reading
- Numeric conversion with `Number(...)`
- A reusable approval-rule function
- `input`, `change`, and `submit` event listeners
- Visible approval, receipt, and submit-result messages
- Conditional receipt rule based on amount + checkbox state
- Submit-time browser validation with an early `return`
- Boundary testing for `$75` and `$5,000` rules

The current implementation intentionally does **not** contain:

- Trusted server/application enforcement of business rules
- API integration
- Persistence
- Authentication

The project should now **look substantially complete and demonstrate its first browser-side behavior**, while still remaining intentionally incomplete as a full transaction-processing application.


## Week 7 Validation Status

The current `src/app.js` demonstrates a complete browser-side validation flow for two related business rules:

1. JavaScript reads the expense amount and receipt checkbox.
2. Reusable functions evaluate the `$75` receipt rule and `$5,000` approval rule.
3. `input` and `change` events keep visible feedback current.
4. The `submit` handler checks the conditional receipt requirement.
5. If the rule fails, the browser-side flow stops with an actionable message.
6. If checks pass, the page explains which approval path would apply.

This remains client-side behavior. The authoritative application/server tier must enforce the same critical rules later.


---

## Week 8 Local Backend Status

The *original Week 7* `src/index.html`, `src/styles.css`, and `src/app.js` are retained unchanged. Week 8 adds `backend/` and `docs/08-local-backend/`, without connecting the two layers. The new backend checks all six employee-entered fields from the original data dictionary: ID, date, category, amount, description, and receipt flag. It independently enforces the receipt and director approval thresholds.

To test locally from the repository root:

```bash
node backend/test-backend.js
node backend/json-demo.js
```

Node.js runs these local scripts outside the browser; **it does not automatically start a server**. Accepted examples intentionally return `persisted: false`. The demo status, ID, and timestamp are illustrations of application responsibility—not official stored records. For details, see [Week 8 notes](docs/08-local-backend/week8-local-backend-notes.md), [data contract](docs/08-local-backend/week8-data-contract.md), and [test checklist](docs/08-local-backend/week8-testing-checklist.md). Teams adapt the logic to their own approved transaction; the reference expense thresholds are not universal requirements.


---

## Week 9 Connected Local System

The original `src/index.html`, `src/styles.css`, and `src/app.js` remain the only frontend files. The Week 9 change connects the same form to `POST /api/expenses` through `fetch()`. There is **no** `week9.html`, `week9-api.js`, or second submit handler. The existing Week 8 `backend/backend.js` retains all authoritative validations. `server/server.js` handles HTTP only.

From the project root, run:

```bash
npm install
npm start
```

Visit http://localhost:3000/ . The API is `POST http://localhost:3000/api/expenses`.
Run `npm run test:backend` for direct business-logic tests. For the JSON-file demonstrations, use the commands in [Week 9 checkpoint guide](docs/09-local-api/week9-checkpoint.md). Accepted requests return `persisted: false`: no database or AWS yet.
