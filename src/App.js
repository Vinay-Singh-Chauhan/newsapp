import "./App.css";
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={progress:10}
  setProgress=(v)=>{
    this.setState({
      progress:v
    })
    // this.state.progress=v;
  }
  pageSize=10;
  apiKey=process.env.REACT_APP_NEWS_API ;
  render() {
    return (
      <div>
        <BrowserRouter>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              path="/general"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />}
            />
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />}
            />
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}
            />
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
