import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    CLASSIFY_DATA_REQUEST,
CLASSIFY_DATA_SUCCESS,
CLASSIFY_DATA_FAILURE,
  } from "../Actions/ImageAction";
  
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
 export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return { ...state, loading: true };
      case FETCH_DATA_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_DATA_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  


  // export const classifyreducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case CLASSIFY_DATA_REQUEST:
  //       return { ...state, loading: true };
  //     case CLASSIFY_DATA_SUCCESS:
  //       return { ...state, loading: false, data: action.payload };
  //     case CLASSIFY_DATA_FAILURE:
  //       return { ...state, loading: false, error: action.payload };
  //     default:
  //       return state;
  //   }
  // };
  
  
  
  
  


