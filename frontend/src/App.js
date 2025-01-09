import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import Private from "./components/Private";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes*/}
        <Route index element={<Public />} />

        {/* Protected routes*/}
        <Route element={<Private />}>
          <Route path="home" element={<Home />} />

          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path=":tentaID" />
          </Route>

          <Route path="profile">
            <Route index element={<Profile />} />
          </Route>

          <Route path="leaderboard">
            <Route index element={<Leaderboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
