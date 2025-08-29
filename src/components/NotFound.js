import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <h2>
        Lo sentimos, pero esta direccion URL no existe.<br/> 
        <Link to="/registro">Registrarme</Link> | <Link to="/">Ingresar</Link>  
        
    </h2>
  )
}

export default NotFound