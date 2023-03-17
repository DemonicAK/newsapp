import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Newscomponent from "./components/Newscomponent";
import { Route, Routes } from "react-router-dom";
export class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <Newscomponent pagesize={5} country="in" category="general"/> */}

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Newscomponent
                key="general"
                pagesize={5}
                country="in"
                category="general"
              />
            }
          />
          {/* <Route exact  path='/general' element={<Newscomponent pagesize={5} country="in" category="general"/>} /> */}
          <Route
            exact
            path="/business"
            element={
              <Newscomponent
                key="business"
                pagesize={5}
                country="in"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <Newscomponent
                key="entertainment"
                pagesize={5}
                country="in"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <Newscomponent
                key="health"
                pagesize={5}
                country="in"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <Newscomponent
                key="science"
                pagesize={5}
                country="in"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <Newscomponent
                key="sports"
                pagesize={5}
                country="in"
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <Newscomponent
                key="technology"
                pagesize={5}
                country="in"
                category="technology"
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
