import axios from 'axios';
import { useState } from 'react';
import { baseURL } from '../baseURL';

const useFetch = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async ({ reqType, api, body }) => {
    setLoading(true);
    setError(null);
    
    try {
      let store = localStorage.getItem("user");
      let token = "";
      if(store) token = (JSON.parse(store)).token;
      const response = await axios.request({
        method: reqType,
        data: body,
        url: `${baseURL}${api}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCode(response.data.code || "");
      setMessage(response.data.message || "");
      setData(response.data.data || null);
      setContent(response.data.content || null);
      
      return {
        code: response.data.code,
        message: response.data.message,
        data: response.data.data,
        content: response.data.content
      };
    } catch (err) {
      setError(err);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, code, message, data, loading, error };
};

export default useFetch;