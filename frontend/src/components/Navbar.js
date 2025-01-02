import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="/home"> Home </Link>
        <Link to="/dashboard"> Dashboard </Link>
        <Link to="/profile"> Profile </Link>
    </div>
  )
}

export default Navbar