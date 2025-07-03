# AIUno
A repo built by AI showing how to test a website

# End-to-End UI Testing with Playwright for Unosquare.com

## 1. Project Setup

### Prerequisites
- **Node.js** (v18 or later): [Download here](https://nodejs.org/)

### Install Dependencies
```sh
npm install
npx playwright install
```

### Project Structure
```
AIUno/
  ├── playwright.config.ts
  ├── package.json
  ├── tests/
  │   ├── home.spec.ts
  │   └── utils.ts
  └── .github/
      └── workflows/
          └── playwright.yml
```

## 2. Running Tests Locally

- **Run all tests (headless):**
  ```sh
  npm test
  ```
- **Run tests with browser UI:**
  ```sh
  npm run test:headed
  ```
- **View HTML report:**
  ```sh
  npm run test:report
  ```

## 3. How the GitHub Actions Workflow Works

- **Triggers:**
  - On every push to `main`
  - On all pull requests
  - Twice daily (at 00:00 and 12:00 UTC)
- **Steps:**
  1. **Checkout code** from your repository.
  2. **Set up Node.js** environment.
  3. **Install dependencies** using `npm ci`.
  4. **Install Playwright browsers** (Chromium, Firefox, WebKit).
  5. **Run the Playwright tests** in headless mode.
  6. **Upload the HTML report** as an artifact for review.

## 4. Importing to TestRail

- Use the provided `TestRailSample.csv` file to import test cases into TestRail.
- Each row represents a test case with a title, steps, and expected result.

## 5. Customizing and Expanding

- Add more tests by creating new `.spec.ts` files in the `tests/` folder.
- Use Playwright's [official docs](https://playwright.dev/docs/intro) for advanced scenarios.

---

**You are ready to test https://www.unosquare.com with Playwright!**
