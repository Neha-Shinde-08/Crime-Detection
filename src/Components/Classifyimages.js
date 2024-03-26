import React, { useState, useEffect } from "react";
import axios from "axios";
// import './CSS/crawlform.css'

const CrawlForm = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [classifiedData, setClassifiedData] = useState({ appropriate: [], inappropriate: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/crawl", { url });
    setData(response.data.images);
  };
  
  const handleClassify = async () => {
    const response = await axios.post("/classify", { data });
    setClassifiedData(response.data);
  };
  if(classifiedData)return<h1>Classifying...</h1>
  return (
    <div className="crawlForm">
      <div className="form_top">
        <h1>Crawl any website here!</h1>
      </div>
      <form onSubmit={handleSubmit} className="form_mid">
        <input
          type="text"
          placeholder="Enter URL to crawl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="crawl_btn">Crawl</button>
        <button type="button" className="classify_btn" onClick={handleClassify}>Classify</button>
      </form>
      <div className="form_bottom">
        <div className="images">
          {data.map((item) => (
            <div key={item} className="image">
              <img src={item} alt={item} />
            </div>
          ))}
        </div>
        <div className="classified_images">
          <h2>Appropriate Images</h2>
          {classifiedData.appropriate.map((item) => (
            <div key={item} className="image">
              <img src={item} alt={item} />
            </div>
          ))}
          <h2 >Inappropriate Images</h2>
          {classifiedData.inappropriate.map((item) => (
            <div key={item} className="image">
              <img src={item} alt={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrawlForm;
