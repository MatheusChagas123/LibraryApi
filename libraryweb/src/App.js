import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";
import LoansPage from "./pages/LoansPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/loans" element={<LoansPage />} />
      </Routes>
    </Router>
  );
};

export default App;
