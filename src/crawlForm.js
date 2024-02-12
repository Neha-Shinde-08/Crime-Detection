// import React, { useState } from "react";
// import axios from "axios";
// import './CSS/crawlform.css'

// const CrawlForm = () => {
//   const [url, setUrl] = useState("");
//   const [data, setData] = useState([]);
//   const [totalLinks, setTotalLinks] = useState(0);
//   const [pass, setPass] = useState([]);
//   const [off, setOff] = useState([]);
//   const [skip, setSkip] = useState([]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post("/crawl", { url });
//     setData(response.data);
//     setTotalLinks(response.data.length);
//   };

//   const handlePass = (url) => {
//     const newPass = [...pass, url];
//     setPass(newPass);
//     totalPass++;
//   };

//   const handleOff = (url) => {
//     const newOff = [...off, url];
//     setOff(newOff);
//     totalOff++
//   };

//   const handleSkip = (url) => {
//     const newSkip = [...skip, url];
//     setSkip(newSkip);
//   };

//   return (
//     <div className="crawlForm">
//       <div className="form_top">
//         <h1>Crawl any website here!</h1>
//       </div>
//       <form onSubmit={handleSubmit} className="form_mid">
//         <input
//           type="text"
//           placeholder="Enter URL to crawl"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           required
          
//         />
//         <button type="submit" className="crawll_btn">Crawl</button>
//       </form>
//       <div className="form_bottom" >
//         <div className="image_section">
//         <p>Total links crawled: {totalLinks}</p>
//           <h2>Images to audit</h2>
//           <ul className="list_formatting">
//             {data.map((url) => (
//               <li key={url} className="list_styling">
//                 <img src={url} alt={url} />
//                 <div className="audit_buttons">
//                   <button onClick={() => handlePass(url)}>Pass</button>
//                   <button onClick={() => handleOff(url)}>Off</button>
//                   <button onClick={() => handleSkip(url)}>Skip</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="passed_section">
//           <h2>Passed Images</h2>
//           <ul className="list_formatting">
//             {pass.map((url) => (
//               <li key={url} className="list_styling">
//                 <img src={url} alt={url} />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="offed_section">
//           <h2>Offed Images</h2>
//           <ul className="list_formatting">
//             {off.map((url) => (
//               <li key={url} className="list_styling">
//                 <img src={url} alt={url} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CrawlForm;


import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/crawlform.css'

const CrawlForm = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [passImages, setPassImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/crawl", { url });
    setData(response.data.images);
  };

  const handleAudit = async (image, action) => {
    await axios.post("/audit", { image, action });
  };

  useEffect(() => {
    const getPassImages = async () => {
      const response = await axios.get("/pass");
      setPassImages(response.data.images);
    };
    getPassImages();
  }, []);

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
      </form>
      <div className="form_bottom">
        <div className="images">
          {data.map((item) => (
            <div key={item} className="image">
              <img src={item} alt={item} />
              <div className="buttons">
                <button onClick={() => handleAudit(item, 'pass')}>Pass</button>
                <button onClick={() => handleAudit(item, 'off')}>Off</button>
                <button onClick={() => handleAudit(item, 'skip')}>Skip</button>
                </div></div>
             
            ))}
         
        </div>
        <div className="passed_section">
          <h2>Passed Images</h2>
          <ul className="list_formatting">
            {passImages.map((url) => (
              <li key={url} className="list_styling">
                <img src={url} alt={url} />
              </li>
            ))}
          </ul>
        </div>
        /* <div className="offed_section">
          <h2>Offed Images</h2>
          <ul className="list_formatting">
            {off.map((url) => (
              <li key={url} className="list_styling">
                <img src={url} alt={url} />
              </li>
            ))}
          </ul>
        </div> */
      </div>
    </div>
  );
};

export default CrawlForm;
             












// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchData } from "./Actions/ImageAction";
// import './CSS/crawlform.css'

// const CrawlForm = () => {
//   const [url, setUrl] = useState("");
//   const dispatch = useDispatch();
//   const { loading, data, error } = useSelector((state) => state);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(fetchData(url));
//   };

//   return (
//     <div className="crawlForm">
//       <div className="form_top">
//         <h1>Crawl any website here!</h1>
//       </div>
//       <form onSubmit={handleSubmit} className="form_mid">
//         <input
//           type="text"
//           placeholder="Enter URL to crawl"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           required
//         />
//         <button type="submit" className="crawl_btn" disabled={loading}>
//           {loading ? "Crawling..." : "Crawl"}
//         </button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       <div className="form_bottom">
//         {data && (
//           <div>
//             <p>Total number of links crawled: {data.length}</p>
//             <ul className="list_formatting">
//               {data.map((item, index) => (
//                 <li key={index} className="list_styling">
//                   <img src={item} alt={item} />
//                   {/* <a href={item} target="_blank">{item}</a> */}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CrawlForm;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { crawlData } from "./actions/crawlAction";
// import './css/crawlform.css'

// const CrawlForm = () => {
//   const [url, setUrl] = useState("");
//   const dispatch = useDispatch();
//   const { loading, data, error } = useSelector((state) => state);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(crawlData(url));
//   };

//   return (
//     <div className="crawlForm">
//       <div className="form_top">
//         <h1>Crawl any website here!</h1>
//       </div>
//       <form onSubmit={handleSubmit} className="form_mid">
//         <input
//           type="text"
//           placeholder="Enter URL to crawl"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           required
//         />
//         <button type="submit" className="crawl_btn" disabled={loading}>
//           {loading ? "Crawling..." : "Crawl"}
//         </button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       <div className="form_bottom">
//         {data && (
//           <div>
//             <p>Total number of images crawled: {data.length}</p>
//             <ul className="list_formatting">
//               {data.map((item, index) => (
//                 <li key={index} className="list_styling">
//                   <img src={`data:image/jpeg;base64,${item.data}`} alt={item.url} />
//                   <p>{item.label}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CrawlForm;
