import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const USERS_URL = "/users";

const Home = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lasttname, setLastname] = useState("");
  const [profilepicture, setProfilepicture] = useState({});

  const fetchUser = async () => {
    try {
      console.log("in fetch user");
      console.log(auth.username);
      const response = await axios.get(USERS_URL, {
        params: { username: auth.username },
      });
      const data = response.data;
      setUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Attempting data fetch");
    fetchUser();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrapper_home">
      <form onSubmit={handleSubmit}>
        <div className="profile-picture-box"></div>

        <div className="input-box">
          <input
            placeholder={user.firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </div>

        <div className="input-box">
          <input
            placeholder={user.lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Home;
