
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress : 0,
    apiKey : process.env.REACT_APP_NEWS_API
  }

  setProgress = (progress)=>
  {
    this.setState({progress:progress});
  }
  render() {
    return (
      <Router>
      <Navbar/>
      {/* <Alert alert={alert}/> */}
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />

      <div className="container">
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="general" pageSize={18} category='general'/>}/>
          <Route path="/business" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="business" pageSize={18} category='business'/>}/>
          <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="entertainment" pageSize={18} category='entertainment'/>}/>
          <Route path="/health" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="health" pageSize={18} category='health'/>}/>
          <Route path="/science" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="science" pageSize={18} category='science'/>}/>
          <Route path="/sport" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="sport" pageSize={18} category='sport'/>}/>
          <Route path="/technology" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="technology" pageSize={18} category='technology'/>}/>
          <Route path="/about" element={<News setProgress={this.setProgress} apiKey = {this.state.apiKey} key="about" pageSize={18} category='about'/>}/>
        </Routes>
      </div>

    </Router>
    )
  }
}
