# CS Banking Problem - JS Variant

## Description

This project simulates a simplified banking system, allowing account holders to manage different types of accounts:
- **Checking Account:** Utilized for conducting transfers, facilitating withdrawals, and linking a physical card to an account owner.
- **Savings Account:** Aimed at accumulating savings to earn interest over periods, also allowing for withdrawals.

Currently, the system accommodates only "RON" and "EURO" as its operational currencies.

## Setup Instructions
- Have [Node.js](https://nodejs.org/en) installed with the recommended version (at time of writing: 20.11.1).
- Begin by cloning the repository using `git clone`
- Navigate to the project's directory in a terminal.
- Execute the following command to install necessary dependencies:
```bash
npm install 
```
- To compile and execute the application, use:
```bash
npm run dev
```
- The application's main file is located at `/src/app.ts`.
- Date manipulation within the application is handled using [Day.js](https://day.js.org/docs/en/manipulate/manipulate).

## Business Preconditions

- You cannot perform the transfer functionality between the following types of accounts:
  - Savings Accounts => Checking Accounts
  - Savings Accounts => Savings Accounts
- A transaction final amount must be in the same currency as the target account (consider currency conversion).
- The result of a transaction or withdrawal must not lead to negative account balance
- The result of a withdrawal must be visible as a transaction

## Problem Statement
- Make sure the `Business Preconditions` are met
- Implement the `withdraw` functionality in the `TransactionManagerService`
- Implement the `CapitalizationFrequency.QUARTERLY` in the `SavingsManagerService`
- Identify and rectify various edge cases in the app (e.g.: transfer functionality)
- Write clear and maintainable code while adhering to coding standards and best practices.

## Notes
- Please refrain from forking this repository.
- Instead, initiate a new repository for your solution and make it public there (verify that an outside person has access to it).
- Once completed, inform your point of contact by sending an email.

## Testing
If you intend to run tests, the application has initialized a mock test in `/src/app.spec.ts` which uses [Jest](https://jestjs.io/docs/getting-started).
To run all the tests in the application use:
```bash
npm test
```
