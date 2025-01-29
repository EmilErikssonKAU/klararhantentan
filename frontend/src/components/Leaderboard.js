import { useEffect, useState } from "react"
import axios from "../api/axios"

const USERS_URL = "/users"

const Leaderboard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    console.log("Attempting data fetch");
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
    fetchUsers();
  });

  return (
    <div className="wrapper-leaderboard">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
<p>Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!</p>
<p>Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!</p>
<p>Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?</p>
      Leaderboard
      {users.map( (data) => (
        <div> {data.username} </div>
      ))}
      end of leaderboard
    </div>
    
  )
}

export default Leaderboard