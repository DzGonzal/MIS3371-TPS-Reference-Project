# Reference Guide

Use this page to find the example artifact that corresponds to the course work.

| What you are trying to understand | Open this file |
|---|---|
| What a complete project proposal looks like | `01-project-foundation/project-proposal.md` |
| How to define the business problem and project boundary | `01-project-foundation/business-problem-and-scope.md` |
| How a team charter can be organized | `01-project-foundation/team-charter.md` |
| How to write testable requirements | `02-requirements/stakeholders-and-requirements.md` |
| How user stories connect to acceptance criteria | `02-requirements/user-stories-and-acceptance-criteria.md` |
| How validation differs from business rules | `02-requirements/business-rules.md` |
| How requirements connect to rules/tests | `02-requirements/traceability-matrix.md` |
| How to model workflow | `03-system-design/workflow.md` |
| How workflow differs from transaction state | `03-system-design/state-model.md` |
| How detailed the data dictionary should be | `03-system-design/data-dictionary.md` |
| How the three tiers divide responsibilities | `03-system-design/architecture.md` |
| Which tier should own a responsibility | `03-system-design/responsibility-matrix.md` |
| What Week 4 HTML should and should not do | `04-interface/week4-interface-notes.md` |
| How to test the Week 4 form | `04-interface/week4-testing-checklist.md` |
| How Week 5 CSS is organized and why | `05-styling/week5-css-responsive-notes.md` |
| How to test responsive CSS | `05-styling/week5-testing-checklist.md` |
| Current working interface | `../src/index.html` |
| Current external stylesheet | `../src/styles.css` |
| How Week 7 validation/business rules work | `07-validation-business-rules/week7-validation-business-rules-notes.md` |
| Week 7 validation test cases | `07-validation-business-rules/week7-testing-checklist.md` |
| Current JavaScript implementation | `../src/app.js` |
| Why Week 8 adds a trusted backend | `08-local-backend/week8-local-backend-notes.md` |
| Which Week 7 input fields the backend receives | `08-local-backend/week8-data-contract.md` |
| How Week 8 expected/actual tests are organized | `08-local-backend/week8-testing-checklist.md` |
| Week 8 team checkpoint (4 points) | `08-local-backend/week8-team-checkpoint.md` |
| Working local backend | `../backend/backend.js` |
| Repeatable backend tests | `../backend/test-backend.js` |
| Object/JSON demonstration | `../backend/json-demo.js` |

## Recommended Reading Order

1. Project proposal
2. Business problem and scope
3. Stakeholders and requirements
4. User stories and acceptance criteria
5. Business rules
6. Traceability matrix
7. Workflow
8. State model
9. Data dictionary
10. Architecture
11. Responsibility matrix
12. Week 4 interface notes
13. Week 4 testing checklist
14. Week 5 CSS and responsive notes
15. Week 5 testing checklist
16. Week 6 JavaScript behavior notes
17. Week 6 testing checklist
18. `src/index.html`
19. `src/styles.css`
20. `src/app.js`

Later artifacts should be justified by earlier design decisions.


## Week 6 JavaScript References

| Question | File |
|---|---|
| How is JavaScript connected and scoped in Week 6? | `06-javascript/week6-javascript-behavior-notes.md` |
| How should the Week 6 behavior be tested? | `06-javascript/week6-testing-checklist.md` |
| Current browser behavior | `../src/app.js` |


## Week 7 reading order

1. `07-validation-business-rules/week7-validation-business-rules-notes.md`
2. `src/app.js`
3. `07-validation-business-rules/week7-testing-checklist.md`


## Week 8 reading order

1. `08-local-backend/week8-local-backend-notes.md` — purpose and trust boundary
2. `08-local-backend/week8-data-contract.md` — keep all six employee-entered fields consistent with Week 7
3. `../backend/backend.js` — independent validation, conditional rules, structured result
4. `../backend/test-backend.js` — run and compare expected/actual cases
5. `08-local-backend/week8-testing-checklist.md` — test coverage and definition of done
6. `../backend/json-demo.js` — optional JSON preview for Week 9
7. `08-local-backend/week8-team-checkpoint.md` — four-point, scenario-specific team activity

**Week 8 intentionally does not modify or connect `src/`.** Week 9 adds a local HTTP API and `fetch()`; AWS begins in Week 10; DynamoDB in Week 11.
