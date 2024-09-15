import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetDetailView from "./GetFullDetails";
import GetListView from "./GetAllThePosts";
import PageNotFound from './PageNotFound'
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<GetListView />} />
          <Route path="/post/:id" element={<GetDetailView />} />
          <Route exact path="*" element={<PageNotFound title="Page Not Found"/>} />
        </Routes>
    
    </Router>
  );
};

export default App;
