import axios from "axios";
import { useState, useEffect } from "react";

// custom API fetching hook
const useApi = (dataSource) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataSource}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error("API Error:", error);
        setData([]);
      }
    };

    fetchData();
  }, [dataSource]);

  return { data };
};

export default useApi;