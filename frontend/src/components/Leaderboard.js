import { useEffect, useState } from "react"
import axios from "../api/axios"

const USERS_URL = "/users"

const Leaderboard = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_URL);
      const data = response.data
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  const sortUsers = (users) => {

  }

  useEffect(() => {
    console.log("Attempting data fetch");
    fetchUsers();
  });

  const sortedUsers = users.sort(
    (a, b) => parseFloat(b.accountBalance) - parseFloat(a.accountBalance)
  );
  
  console.log("sorted");

  return (
    <div className="wrapper_leaderboard">
      {sortedUsers.map( (user) => (
        <div>  <span> {user.username} </span> <span> {user.accountBalance} </span> </div>
      ))}
    </div>
  )
}

export default Leaderboard