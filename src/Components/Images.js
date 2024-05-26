import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classifyData } from "../Actions/ImageAction";
import "../CSS/images.css";
import axios from "axios";
import DashboardSiderbar from "./DashboardSiderbar";

const Images = () => {
  // const [url, setUrl] = useState("");
  const [classifiedData, setClassifiedData] = useState({
    appropriate: [],
    inappropriate: [],
  });
  const { loading, data, error } = useSelector((state) => state);
  const [pass, setPass] = useState([]);
  const [off, setOff] = useState([]);
  const [skip, setSkip] = useState([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalPass, setTotalpass] = useState(0);
  const [totalOff, setTotaloff] = useState(0);
  const dispatch = useDispatch();
  const [isClassifing, setIsClassifing] = useState(true);
  const handleClassify = async () => {
    setIsClassifing(true);
    const response = await axios.post("/classify", { data });
    setClassifiedData(response.data);
    setIsClassifing(false);
  };
  const handlePass = (url) => {
    const newPass = [...pass, url];
    setPass(newPass);
  };

  const handleOff = (url) => {
    const newOff = [...off, url];
    setOff(newOff);
  };

  const handleSkip = (url) => {
    const newSkip = [...skip, url];
    setSkip(newSkip);
  };

  const passCount = () => {
    setTotalpass(totalPass + 1);
  };
  const offCount = () => {
    setTotaloff(totalOff + 1);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <DashboardSiderbar />
      <div
        className="images"
        style={{
          width: "100%",
        }}
      >
        <ul className="list_formatting">
          <button type="button" className="crawl_btn" onClick={handleClassify}>
            Classify
          </button>

          {data.map((url) => (
            <li key={url} className="list_styling">
              <img src={url} alt={url} className="image_resize" />
              {/* <div className="audit_buttons">
                  <button onClick={() => {handlePass(url); passCount();}}>Pass</button>
                  <button onClick={() => {handleOff(url); offCount();}}>Off</button>
                  <button onClick={() => handleSkip(url)}>Skip</button>
                </div> */}
            </li>
          ))}
        </ul>

        {isClassifing ? (
          <h1>Classifyig data</h1>
        ) : (
          <div className="classified_images">
            <h2>Appropriate Images</h2>
            <div className="good_images">
              {classifiedData.appropriate.map((url) => (
                <li key={url} className="list_styling image_styling">
                  <img src={url} alt={url} className="image_resize" />
                  <div className="audit_buttons">
                    <button
                      onClick={() => {
                        handlePass(url);
                        passCount();
                      }}
                      className="auditbtn1"
                    >
                      Pass
                    </button>
                    <button
                      onClick={() => {
                        handleOff(url);
                        offCount();
                      }}
                      className="auditbtn2"
                    >
                      Off
                    </button>
                    <button
                      onClick={() => handleSkip(url)}
                      className="auditbtn3"
                    >
                      Skip
                    </button>
                  </div>
                </li>
              ))}
            </div>

            <h2>Inappropriate Images</h2>
            <div className="bad_images">
              {classifiedData.inappropriate.map((url) => (
                <li key={url} className="list_styling image_styling">
                  <div key={url} className="image">
                    <img src={url} alt={url} />
                    <div className="audit_buttons">
                      <button
                        onClick={() => {
                          handlePass(url);
                          passCount();
                        }}
                        className="auditbtn1"
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => {
                          handleOff(url);
                          offCount();
                        }}
                        className="auditbtn2"
                      >
                        Off
                      </button>
                      <button
                        onClick={() => handleSkip(url)}
                        className="auditbtn3"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;
