import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axios"

const TENTOR_URL = "/tentor"

const Dashboard = () => {
  const [tentor, setTentor] = useState([])

  const navigate = useNavigate();

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
        <div
          className="dashboard_entry"
          onClick={() => {
          navigate(`/dashboard/${tenta.id}`, { state: { tenta } })
        }}
        >
          <span> {tenta.coursename} </span> <span> {new Date(tenta.date).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  )
}

export default Dashboard