import React, { useState } from 'react'
import DashboardSiderbar from './DashboardSiderbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchvideos } from '../Actions/ImageAction';

const DashVideos = () => {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState({});

  // const [data, setData] = useState([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [pass, setPass] = useState([]);
  const [off, setOff] = useState([]);
  const [skip, setSkip] = useState([]);
  const [totalPass,setTotalpass] =useState(0)
  const [totalOff,setTotaloff] =useState(0)
  const { loading, data, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchvideos(url));
    setTotalLinks(data.length);
  };
  if(loading)return<h1>VideosLoading...</h1>
  return (
    <div className='dashboard'>
        <DashboardSiderbar />
        <div className='dashboard_content'>
            <h2>Videos</h2>
            <div className='dashImages_top'>
          <form onSubmit={handleSubmit} className="dash_form">
            <input
              type="text"
              placeholder="Enter URL to crawl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required

            />
            <button type="submit" className="crawl_btn">Crawl</button>
          </form>
        </div>

        <div className='dashImages_mid'>
          <div className='dashImages_stats' style={{ color:'black',borderRadius:'2.5vmin',backgroundColor:"#aaaaff"}}>
            <h3 className='stat_title'>Total Videos Crawled</h3>
            <span className='totalno_styling'>{data.length}</span>
          </div>
          <div className='dashImages_stats' style={{color:'black',borderRadius:'2.5vmin',backgroundColor:"#aaffaa"}}>
          <h3 className='stat_title'>Total Videos Passed</h3>
            <span className='totalno_styling'>{totalPass}</span>
          </div>
          <div className='dashImages_stats' style={{color:'black',borderRadius:'2.5vmin',backgroundColor:"#ffaaaa"}}>
          <h3 className='stat_title'>Total Videos Offed</h3>
            <span className='totalno_styling'>{totalOff}</span>
          </div>
        </div>

        <div className='dashImages_bottom'>
          <table>
          <thead>
    <tr>
      <th>ID</th>
      <th style={{maxwidth:"800px"}}>Url</th>
      <th>Status</th>
   
    </tr>
  </thead>
  <tbody>
 
                {data.map((url) => (
                  <tr key={url}>
                    <td>1</td>
                    <td>
                      <a href={url} target="_blank">{url}</a>
                    </td>
                    <td>{status[url]}</td>
                   </tr>))}

                    
  </tbody>
          </table>
        </div></div>
    </div>
  )
}

export default DashVideos