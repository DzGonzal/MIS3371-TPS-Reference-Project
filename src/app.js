// MIS 3371 — WEEK 9 REFERENCE JAVASCRIPT
// Continues the existing Week 7 browser behavior and connects it to the local
// Express API using fetch(). The backend remains the authority for all rules.

const MIN_EXPENSE_AMOUNT = 0.01;
const RECEIPT_THRESHOLD = 75;
const DIRECTOR_APPROVAL_THRESHOLD = 5000;

// These are the actual option values in src/index.html, not the visible labels.
// Browser validation helps the user; backend.js independently enforces the same contract.
const ALLOWED_CATEGORIES = [
  'client-meal', 'travel', 'lodging', 'office-supplies', 'other'
];

const form = document.querySelector('#expenseForm');
const dateInput = document.querySelector('#expenseDate');
const employeeIdInput = document.querySelector('#employeeId');
const categoryInput = document.querySelector('#expenseCategory');
const descriptionInput = document.querySelector('#description');
const submitButton = form.querySelector('button[type="submit"]');
const amountInput = document.querySelector('#expenseAmount');
const receiptCheckbox = document.querySelector('#receiptAttached');
const approvalMessage = document.querySelector('#approvalMessage');
const receiptMessage = document.querySelector('#receiptMessage');
const formMessage = document.querySelector('#formMessage');


// ---------------------------------------------------------
// BUSINESS / VALIDATION FUNCTIONS
// ---------------------------------------------------------

function isAmountInAcceptedRange(amount) {
  // Currency requires whole cents; allow tiny floating-point representation differences.
  const unroundedCents = amount * 100;
  const cents = Math.round(unroundedCents);
  return Number.isFinite(amount) && amount >= MIN_EXPENSE_AMOUNT &&
    Number.isSafeInteger(cents) && Math.abs(unroundedCents - cents) <= 1e-7;
}

function requiresReceipt(amount) {
  return amount > RECEIPT_THRESHOLD;
}

function requiresDirectorApproval(amount) {
  return amount > DIRECTOR_APPROVAL_THRESHOLD;
}


// ---------------------------------------------------------
// MESSAGE HELPERS
// ---------------------------------------------------------

function clearFormMessage() {
  formMessage.textContent = '';
  formMessage.className = 'form-message';
}

function clearReceiptMessage() {
  receiptMessage.textContent = '';
  receiptMessage.className = 'validation-message';
}


// ---------------------------------------------------------
// LIVE AMOUNT / APPROVAL FEEDBACK
// ---------------------------------------------------------

function updateApprovalMessage() {

  // If the field is empty, do not show a decision yet.
  if (amountInput.value === '') {
    approvalMessage.textContent = '';
    approvalMessage.className = 'decision-message';
    return;
  }

  const amount = Number(amountInput.value);

  // VALIDATE FIRST.
  // Do not apply approval-routing rules to an invalid amount.
  if (!isAmountInAcceptedRange(amount)) {
    approvalMessage.textContent =
      'Enter an amount of at least $0.01, in whole cents.';
    approvalMessage.className = 'decision-message error-message';
    return;
  }

  // Only valid amounts should reach the business-rule decision.
  if (requiresDirectorApproval(amount)) {
    approvalMessage.textContent = 'Director approval will be required.';
  } else {
    approvalMessage.textContent = 'Standard approval path.';
  }

  approvalMessage.className = 'decision-message';
}


// ---------------------------------------------------------
// RECEIPT FEEDBACK
// ---------------------------------------------------------

function updateReceiptMessage() {

  if (amountInput.value === '') {
    clearReceiptMessage();
    return;
  }

  const amount = Number(amountInput.value);

  // If the amount itself is invalid, stop here.
  // Receipt rules should not run on invalid transaction data.
  if (!isAmountInAcceptedRange(amount)) {
    clearReceiptMessage();
    return;
  }

  if (requiresReceipt(amount) && !receiptCheckbox.checked) {
    receiptMessage.textContent =
      'Receipt is required for expenses greater than $75.';
    receiptMessage.className =
      'validation-message error-message';

  } else if (requiresReceipt(amount) && receiptCheckbox.checked) {
    receiptMessage.textContent =
      'Receipt requirement satisfied.';
    receiptMessage.className =
      'validation-message success-message';

  } else if (receiptCheckbox.checked) {
    receiptMessage.textContent =
      'Receipt attached. It is optional for this amount.';
    receiptMessage.className =
      'validation-message success-message';

  } else {
    receiptMessage.textContent =
      'Receipt is not required for this amount.';
    receiptMessage.className =
      'validation-message info-message';
  }
}


// ---------------------------------------------------------
// EVENT HANDLERS
// ---------------------------------------------------------

function updateAmountRelatedMessages() {
  updateApprovalMessage();
  updateReceiptMessage();
  clearFormMessage();
}

function handleReceiptChange() {
  updateReceiptMessage();
  clearFormMessage();
}

// Use a LOCAL calendar date (not UTC) for the browser's date maximum.
// The backend independently checks the date as well.
function todayLocalString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Prevent choosing a future date in the date picker.
dateInput.max = todayLocalString();

async function handleSubmit(event) {
  // Stop regular browser form navigation: JavaScript sends JSON with fetch().
  event.preventDefault();

  // Refresh the date maximum if this page has been left open overnight.
  dateInput.max = todayLocalString();
  if (dateInput.value && dateInput.value > dateInput.max) {
    formMessage.textContent = 'Cannot continue: expense date cannot be in the future.';
    formMessage.className = 'form-message error-message';
    dateInput.focus();
    return;
  }

  // Check native HTML constraints first (required, date, min, step, etc.).
  if (!form.reportValidity()) return;

  // Native required considers whitespace-only text nonempty, so trim text.
  const employeeId = employeeIdInput.value.trim();
  if (!employeeId) {
    formMessage.textContent = 'Cannot continue: enter an employee ID.';
    formMessage.className = 'form-message error-message';
    employeeIdInput.focus();
    return;
  }

  const expenseCategory = categoryInput.value;
  if (!ALLOWED_CATEGORIES.includes(expenseCategory)) {
    formMessage.textContent = 'Cannot continue: select a valid expense category.';
    formMessage.className = 'form-message error-message';
    categoryInput.focus();
    return;
  }

  const description = descriptionInput.value.trim();
  if (!description) {
    formMessage.textContent = 'Cannot continue: enter a business description.';
    formMessage.className = 'form-message error-message';
    descriptionInput.focus();
    return;
  }

  const amount = Number(amountInput.value);
  if (!isAmountInAcceptedRange(amount)) {
    formMessage.textContent = 'Cannot continue: enter an amount of at least $0.01, in whole cents.';
    formMessage.className = 'form-message error-message';
    amountInput.focus();
    return;
  }

  // Keep the Week 7 conditional receipt rule.
  if (requiresReceipt(amount) && !receiptCheckbox.checked) {
    formMessage.textContent = 'Cannot continue: attach receipt evidence for an expense greater than $75.';
    formMessage.className = 'form-message error-message';
    receiptCheckbox.focus();
    return;
  }

  // The six field names and category values match src/index.html and backend/backend.js.
  // .checked already supplies a true/false Boolean.
  const expense = {
    employeeId,
    expenseDate: dateInput.value,
    expenseCategory,
    expenseAmount: amount,
    description,
    receiptAttached: receiptCheckbox.checked
  };

  // Reduce accidental repeated clicks while the HTTP request is in flight.
  submitButton.disabled = true;
  clearFormMessage();
  formMessage.textContent = 'Sending expense to the local API...';

  try {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    });

    // fetch() gives us a Response object. .json() parses its JSON body.
    const result = await response.json();

    if (!response.ok) {
      formMessage.textContent = `Local API rejected: ${result.message || 'Invalid expense.'}`;
      formMessage.className = 'form-message error-message';
      return;
    }

    // HTTP 200 means the backend accepted the local processing request only.
    // It does NOT mean this transaction is persisted in a database.
    formMessage.textContent = `Local API accepted (not saved): ${result.message}`;
    formMessage.className = 'form-message success-message';
  } catch (error) {
    console.error('Expense API request failed:', error);
    formMessage.textContent = 'Could not reach the local API or read its response. Is npm start running?';
    formMessage.className = 'form-message error-message';
  } finally {
    submitButton.disabled = false;
  }
}

// ---------------------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------------------

amountInput.addEventListener(
  'input',
  updateAmountRelatedMessages
);

receiptCheckbox.addEventListener(
  'change',
  handleReceiptChange
);

form.addEventListener(
  'submit',
  handleSubmit
);
