import React from "react";
import ExpensesTrackerContainer from "../expensesTrackerContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ExpensesTrackerContainer />
    </div>
  );
}

export default App;
