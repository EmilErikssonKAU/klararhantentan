import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav_bar">

      <div className="nav_item nav_logo">klararhantentan.com</div>

      <ul className="nav_item nav_list">
        <li className="nav_list_item">
          <Link className="nav_link" to="/home">Home</Link>
        </li>
        <li className="nav_list_item">
          <Link className="nav_link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav_list_item">
          <Link className="nav_link" to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar