import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";
import LoansPage from "./pages/LoansPage";
import ReportPage from "./pages/ReportPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
