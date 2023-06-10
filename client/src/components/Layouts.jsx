import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Navbar, Button} from 'react-bootstrap';
import { Blog } from './webpages';

import { useContext } from 'react';
import { UserContext } from './UserContext';

function DefaultLayout(){

    return <>
            <header>
                <NavigationBar />
            </header>
            <main>
            <Container fluid>
                <Row>
                <Col style={{marginTop: '6rem'}} >
                    <Outlet />
                </Col>
                </Row>
            </Container>
            </main>
    </>
    ;
}

function MainLayout(){
    
    // main layout will always display frontOffice view 
    // inside front office if the user is logged there is the possiblity to switch to backOffice view with a button
    // inside backOffice view there is the possibility to switch back to frontOffice view with a button
    const navigate = useNavigate();

    return <>
        <FrontOffice />
    </>
    ;
}

function FrontOffice(){
    
    // frontOffice view is the default view for loggedUser and not loggedUser
    // frontOffice view will only dispaly elements of the blog with a 'valid' pubblication date
    // draft pages and future scheduled pages will not be displayed

    const navigate = useNavigate();
    const user = useContext(UserContext) ;
  
    return <>
        <Blog />
        <footer className='footerWebPage'>
            {user.id ? <Button className='backOfficeButton' onClick={() => {navigate('/backOffice')}}> BackOfficeView </Button> : <></>}
        </footer>
    </>
    ;
}

function BackOffice(){
    
    // inside backOffice view the possibility to edit the blog elements differs
    // from user who are logged as admin and user who are logged as normal user
    // the admin can edit all the elements of the blog
    // the normal user can edit only the elements he created
    const navigate = useNavigate();

    return <>
        <Blog />
        <footer className='footerWebPage'>
            <Button className='newPageButton' onClick={() => {navigate('/newPage')}}> Create New Page </Button>
            <Button className='backOfficeButton' onClick={() => {navigate('/')}}> FrontOfficeView </Button>            
        </footer>
    </>
    ;
}

function NavigationBar(){
    
    const user = useContext(UserContext) ;

    return <>
        <Navbar bg="light" fixed="top" className='personalizedNavbar'>
            <Container fluid>
            <Navbar.Brand>
                {user.admin ? <Button className='editBlogNameButton'> <i className="bi bi-pencil-square"/> </Button> : <></>}
                <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                    BlogName {/* sara un valore dinamico modificabile */}
                </Link>
            </Navbar.Brand>  
                <Link to='/login' className='d-flex align-items-center text-decoration-none'>
                    <span style={{ color: 'black', marginRight: '1rem' }}>Testo</span>                    
                    <i className="bi bi-person-circle icon-size"/>
                </Link>
            </Container>
        </Navbar>
    </>
    ;
}

export { DefaultLayout, MainLayout, BackOffice};