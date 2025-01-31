import { useEffect, useState } from "react"
import axios from "../api/axios"

const TENTOR_URL = "/tentor"

const Dashboard = () => {
  const [tentor, setTentor] = useState([])

  const fetchTentor = async () => {
    try {
      const response = await axios.get(TENTOR_URL);
      const data = response.data
      setTentor(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("Attempting data fetch");
    fetchTentor();
  });

  const sortedTentor = tentor.sort(
    (a, b) => parseFloat(b.date) - parseFloat(a.date)
  );
  
  console.log("sorted");

  return (
    <div className="wrapper_dashboard">
      {sortedTentor.map( (tenta) => (
        <div>  <span> {tenta.coursename} </span> <span> {tenta.date} </span> </div>
      ))}
    </div>
  )
}

export default Dashboard