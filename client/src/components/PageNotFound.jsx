import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound(){
    return <Alert variant="danger">
        <Alert.Heading>Page Not Found</Alert.Heading>
        <p> The page you are looking for does not exist.</p>
        <p><Link to='/'>Please go back to the home page</Link></p>
    </Alert>
    ;
}

export { PageNotFound };