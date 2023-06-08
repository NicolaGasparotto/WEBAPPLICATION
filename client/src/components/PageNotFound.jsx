import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound(){

    return <Container className='justify-content-center col-6'>
        <Alert variant="danger">
            <Alert.Heading>Page Not Found</Alert.Heading>
            <p> The page you are looking for does not exist or has been deleted.</p>
            <p><Link to='/'>Please go back to the home page</Link></p>
        </Alert>
    </Container>
    ;
}

export { PageNotFound };