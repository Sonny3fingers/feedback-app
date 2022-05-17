import React, { Fragment } from "react";

import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import About from "./pages/About";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <Header />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Fragment>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </Fragment>
            }
          ></Route>

          <Route path="/about" element={<About />} />
        </Routes>
        <AboutIconLink />
      </div>
    </FeedbackProvider>
  );
}

export default App;
