import React, { useState } from "react";
import DashboardSiderbar from "./DashboardSiderbar";
import axios from "axios";
import "../CSS/dashimages.css";
import { fetchData, fetcharticles } from "../Actions/ImageAction";
import { useDispatch, useSelector } from "react-redux";

const DashArticles = () => {
  const [url, setUrl] = useState("Python (programming language)");
  const [status, setStatus] = useState({});

  const [totalLinks, setTotalLinks] = useState(0);
  const [pass, setPass] = useState([]);
  const [off, setOff] = useState([]);
  const [skip, setSkip] = useState([]);
  const [totalPass, setTotalpass] = useState(0);
  const [totalOff, setTotaloff] = useState(0);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await axios.post("/crawlarticle", { url });
        setData(response.data.classified_articles);
        setTotalLinks(data.length);
      } catch (error) {}
    };
    fetchData();
    console.log(data);
  };

  const handlePass = (url) => {
    setPass([...pass, url]);
    setStatus((prevStatus) => ({
      ...prevStatus,
      [url]: "Pass",
    }));
  };

  const handleOff = (url) => {
    setOff([...off, url]);
    setStatus((prevStatus) => ({
      ...prevStatus,
      [url]: "Off",
    }));
  };

  const handleSkip = (url) => {
    setSkip([...skip, url]);
    setStatus((prevStatus) => ({
      ...prevStatus,
      [url]: "Skip",
    }));
  };

  const passCount = () => {
    setTotalpass(totalPass + 1);
  };
  const offCount = () => {
    setTotaloff(totalOff + 1);
  };
  // if (!data) return <h1>Loading...</h1>;
  return (
    <div className="dashboard">
      <DashboardSiderbar />
      <div className="dashboard_content">
        <h2>Articles</h2>
        <div className="dashImages_top">
          <form onSubmit={handleSubmit} className="dash_form">
            <input
              type="text"
              placeholder="Enter URL to crawl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button type="submit" className="crawl_btn">
              Crawl
            </button>
          </form>
        </div>

        <div className="dashImages_mid">
          <div
            className="dashImages_stats"
            style={{
              color: "black",
              borderRadius: "2.5vmin",
              backgroundColor: "#aaaaff",
            }}
          >
            <h3 className="stat_title">Total Articles Crawled</h3>
            <span className="totalno_styling">{data && data.length}</span>
          </div>
          <div
            className="dashImages_stats"
            style={{
              color: "black",
              borderRadius: "2.5vmin",
              backgroundColor: "#aaffaa",
            }}
          >
            <h3 className="stat_title">Total Articles Passed</h3>
            <span className="totalno_styling">{totalPass}</span>
          </div>
          <div
            className="dashImages_stats"
            style={{
              color: "black",
              borderRadius: "2.5vmin",
              backgroundColor: "#ffaaaa",
            }}
          >
            <h3 className="stat_title">Total Articles Offed</h3>
            <span className="totalno_styling">{totalOff}</span>
          </div>
        </div>

        <div className="dashImages_bottom">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Url</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.slice(6).map((url, index) => (
                  <tr key={url}>
                    <td>{index}</td>
                    <td>
                      <pre
                        style={{
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      >
                        {url}
                      </pre>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashArticles;
