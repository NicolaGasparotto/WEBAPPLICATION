import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from './UserContext';

import './style.css';

function Blog(){

    const webPages = [
        {'id': 1, 'author': 'Author1', 'title': 'Title1 ', 'publicationDate': '2021-01-01'},
        {'id': 2, 'author': 'Author2', 'title': 'Title2 ', 'publicationDate': '2021-01-02'},
        {'id': 3, 'author': 'Author3', 'title': 'Title3 ', 'publicationDate': '2021-01-03'},
        {'id': 4, 'author': 'Author4', 'title': 'Title4 ', 'publicationDate': '2021-01-04'},
        {'id': 5, 'author': 'Author5', 'title': 'Title5', 'publicationDate': '2021-01-05'},
    ];

    return <>
        <Container className='justify-content-center col-10 col-xxl-6 col-xl-7'>
            <span> Order By:</span>
            <Container className='tHeader'>
                <span > Title </span>
                <span> Author </span>
                <span> PublicationDate </span>
            </Container>
        <Table hover>
            <tbody>
                {webPages.map((webPage) => {
                        return <BlogRow key={webPage.id} webPage={webPage} />
                    }
                )}
            </tbody>
        </Table>
        </Container>
    </>
    ;
}

function BlogRow(props){

    const user = useContext(UserContext);

    const webPage = props.webPage;

    const navigate = useNavigate();

    return <>
        <tr className='mt-5'>
            <td className='row gx-4 gx-lg-5 justify-content-center mt-3'>
            <div className='col-md-10 col-lg-8' >
                <div>
                    <div><span className='trTitle'> {webPage.title} </span></div>
                <span className='trInfo'> Published by {webPage.author}, on <b>{webPage.publicationDate}</b></span>
                </div>
                <div className='buttonDiv'>
                    <Button className='viewButton' 
                            onClick={() => { 
                                            navigate(`/pages/${webPage.id}`, 
                                                { state: {'id': webPage.id, 'title': webPage.title, 'author': webPage.author, 'pubDate': webPage.publicationDate, 'creationDate': webPage.creationDate } }
                                            )
                                            }
                                    }> Read </Button>
                    { (user.id) ? <>
                        <Button className='editButton' onClick={()=>navigate(`/pages/${webPage.id}/edit`)}> EDIT </Button>
                        <Button className='deleteButton'> DELETE ARTICLE </Button>
                    </> : <></>}
                </div>
            </div>
            </td>
        </tr>
    </>
    ;
}

export { Blog };