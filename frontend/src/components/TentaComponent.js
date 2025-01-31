import { useLocation } from "react-router-dom"

const TentaComponent = () => {
  const location = useLocation();
  const tenta = location.state?.tenta;

  return (
    <div className="wrapper_tentacomponent">
        TentaComponent  {tenta.coursename}
    </div>
  )
}

export default TentaComponent