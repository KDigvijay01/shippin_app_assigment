# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






# Shipping Box Calculator

A simple React application that allows users to calculate and store shipping costs for boxes sent from India to specific countries. The application includes a form to add boxes and a table view to list all saved entries. All data is stored locally using `localStorage` (no backend required).

---

## Features

### Add Box Form
- Receiver name input  
- Weight (in kilograms)  
- Box color picker (stored as `rgb(r, g, b)`)  
- Destination country dropdown  
- Form validation:
  - Required fields  
  - Negative weight not allowed (auto-corrected to 0)  
  - Submit button remains disabled until the form is valid  

### Box List
- Displays all saved boxes in a table  
- Shows color as a color swatch  
- Calculates shipping cost based on selected country multiplier  
- Data persists using `localStorage`  

### Shipping Cost Formula
cost = weight × multiplier
Country multipliers:
- Sweden: 7.35 INR  
- China: 11.53 INR  
- Brazil: 15.63 INR  
- Australia: 50.09 INR  

---

## Tech Stack
- React (Vite)
- React Router
- Local state + localStorage
- Plain CSS (responsive layout)

---

## Project Structure
src/
components/
Navbar.jsx
pages/
BoxForm.jsx
BoxList.jsx
services/
localStore.js
data/
multipliers.js
styles.css
App.jsx
main.jsx
---

# Build Steps (How to Set Up and Run the Project)

Follow these steps to build and run the project locally:

### 1. Clone the repository
Clone this project to your system using:

git clone app url/code from my github repo

### 2. Navigate into the project directory
cd <your-project-folder>

### 3. Install project dependencies
Install required Node modules using:

npm install
This installs React, Vite, React Router, and other dependencies needed for the application.

### 4. Start the development server
Run the project locally with:

npm run dev

Vite will start a local server and provide a URL similar to:

http://localhost:5173/

Open this URL in your browser to view the application.

## How Data Is Stored

All box entries are saved to `localStorage` and automatically loaded when the application starts.  
No backend or API communication is required.

---
## License
This project is open-source and free to use.



