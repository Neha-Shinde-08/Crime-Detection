import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardSiderbar from "./DashboardSiderbar";
import { dataResult, dataText } from "./data";

const Articles = () => {
  const [classifiedData, setClassifiedData] = useState({
    appropriate: [],
    inappropriate: [],
  });
  // const { loading, data, error } = useSelector((state) => state);
  const [pass, setPass] = useState([]);
  const [off, setOff] = useState([]);
  const [skip, setSkip] = useState([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalPass, setTotalpass] = useState(0);
  const [totalOff, setTotaloff] = useState(0);
  const dispatch = useDispatch();
  const [isClassified, setIsClassified] = useState(false);
  const handleClassify = async () => {
    setIsClassified(true);
    // const response = await axios.post("/classifyarticle", {
    //   data: "Python (programming language)",
    // });
    // console.log(response.data);
    // setClassifiedData(dataText);
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
        className="articles"
        style={{
          width: "100%",
        }}
      >
        <ul className="list_formatting">
          <button type="button" className="crawl_btn" onClick={handleClassify}>
            Classify
          </button>

          {dataText &&
            dataText.map((data, index) => (
              <li key={index} className="list_styling">
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {data}
                </pre>
                {/* <div className="audit_buttons">
                  <button onClick={() => {handlePass(url); passCount();}}>Pass</button>
                  <button onClick={() => {handleOff(url); offCount();}}>Off</button>
                  <button onClick={() => handleSkip(url)}>Skip</button>
                </div> */}
              </li>
            ))}
        </ul>

        <div className="classified_images">
          <h2>Appropriate Articles</h2>
          <div className="good_images">
            {dataText.map((item, index) => {
              if (dataResult[index].appropriate === 100) {
                return (
                  <li key={index} className="list_styling image_styling">
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      {dataText[index]}
                    </pre>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </div>

          <h2>Inappropriate Articles</h2>
          <div className="bad_images">
            {dataText.map((item, index) => {
              if (dataResult[index].inappropriate === 100) {
                return (
                  <li key={index} className="list_styling image_styling">
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                      }}
                    >
                      {dataText[index]}
                    </pre>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
