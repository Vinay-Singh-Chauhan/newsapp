import "./App.css";
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import React, { useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

 const App =()=> {
  const [progress, setProgress] = useState(0)
  // state={progress:10}
  // setProgress=(v)=>{
  //   setState({
  //     progress:v
  //   })
    // state.progress=v;
  // }
  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API;

    return (
      <div>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        onLoaderFinished={() =>setProgress(0)}
      />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News setProgress={setProgress} apiKey={apiKey} key="home" pageSize={pageSize} country="in" category="general" />}
            />
            <Route
              path="/general"
              element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />}
            />
            <Route
              path="/science"
              element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />}
            />
            <Route
              path="/business"
              element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}
            />
            <Route
              path="/health"
              element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );

}
export default App