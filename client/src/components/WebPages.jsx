import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './style.css';

function Blog(){

    const webPages = [
        {'id': 1, 'author': 'Author1', 'title': 'Title1', 'publicationDate': '2021-01-01'},
        {'id': 2, 'author': 'Author2', 'title': 'Title2', 'publicationDate': '2021-01-02'},
        {'id': 3, 'author': 'Author3', 'title': 'Title3', 'publicationDate': '2021-01-03'},
        {'id': 4, 'author': 'Author4', 'title': 'Title4', 'publicationDate': '2021-01-04'},
        {'id': 5, 'author': 'Author5', 'title': 'Title5', 'publicationDate': '2021-01-05'},
    ];

    return <>
        <Container className='justify-content-center col-10'>
        <span> Order By:</span>
        <span> Title </span>
        <span> Author </span>
        <span> Publication Date </span>
        
        <Table hover align='center'>
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

    const webPage = props.webPage;

    //const navigate = useNavigate();

    return <>
        <tr>
            <td className='trRow'>
            <span> {webPage.author} </span>
            <span> {webPage.title} </span>
            <span> {webPage.publicationDate} </span>
            <Button className='viewButton' onClick={() => { /*navigate(`/page/${webPage.id}`)*/ }}>Read</Button>
            </td>
        </tr>
    </>
    ;
}

export { Blog };