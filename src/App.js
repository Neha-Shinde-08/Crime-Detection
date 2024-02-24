import './App.css';
// import CrawlForm from './crawlForm';
import store from './Store';
import { Provider } from "react-redux";
// import PassImages from './PassImages';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashImages from './Components/DashImages';
import DashVideos from './Components/DashVideos';
import Header from './Components/Header';
import Images from './Components/Images';
import Classify from './Components/Classifyimages';
import Videos from './Components/Videos';

function App() {

  return (
    <Provider store={store}>
    <div className="App">
    <BrowserRouter>
    <Header/>
      <Routes>
       <Route path='/' element={<DashImages/>} />
        <Route path='/dashboard-images' element={<DashImages />} />
        <Route path='/dashboard-videos' element={<DashVideos />} />
        <Route path='/images' element={<Images />} />
        <Route path='/videos' element={<Videos />} />
     </Routes>
     </BrowserRouter> 
    </div>
  </Provider>
    
  );
}

export default App;