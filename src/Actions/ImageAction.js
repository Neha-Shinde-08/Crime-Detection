import axios from "axios";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const CLASSIFY_DATA_REQUEST = "CLASSIFY_DATA_REQUEST";
export const CLASSIFY_DATA_SUCCESS = "CLASSIFY_DATA_SUCCESS";
export const CLASSIFY_DATA_FAILURE = "CLASSIFY_DATA_FAILURE";

export const fetchData = (url) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const response = await axios.post("/crawl", { url });
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data.images });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};

export const fetchvideos = (url) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const response = await axios.post("/crawlvideos", { url });
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data.videos });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};

export const fetcharticles = (url) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const response = await axios.post("/crawlarticle", { url });
      console.log(response.data);
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data.articles });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
    }
  };
};

// export const classifyData=(data)=>{
//   return async (dispatch) => {
//     dispatch({ type: CLASSIFY_DATA_REQUEST });
//     try {
//       const response = await axios.post("/classify", { data });
//       dispatch({ type: CLASSIFY_DATA_SUCCESS, payload: response.data});
//     } catch (error) {
//       dispatch({ type: CLASSIFY_DATA_FAILURE, payload: error.message });
//     }
//   };
// }
// const fetchData = async () => {
//   try {
//     const response = await axios.get('/api/images');
//     setData(response.data);
//     setTotalLinks(response.data.length);
//   } catch (error) {
//     console.log(error);
//   }
// };
