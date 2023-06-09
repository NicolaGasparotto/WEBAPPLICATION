import React from "react";

import Page from "./page"; 
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";


import './style.css'

function WebPage(){
    
    const navigate = useNavigate() ;
    const location  = useLocation() ;

    // fake data
    const lContent = [ {'id': 1, 'type': 'header', 'content': 'Title1' }, {'id': 2,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' },
    {'id': 3,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' },
    {'id': 4,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' },
    {'id': 8, 'type': 'header', 'content': 'Title1' },
    {'id': 5,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' },
    {'id': 6,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' },
    {'id': 9, 'type': 'header', 'content': 'Title1' },
    
    {'id': 7,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' } ];

    let page = undefined ;
    if(location.state) {
        page = location.state ;
        page = new Page(page.id, page.title, page.author, page.pubDate, page.creationDate, lContent) ;
    }else {
        navigate('/*') ; // redirect to page not found
    }
    
    // const {page, setPage } = useState('');
    // retrieve page from database
    
    
    return <>
        <Container className="justify-content-center col-md-10 col-lg-6 col-xl-7 vh-100">
            <header>
                <h1 className="title">{page.title}</h1>
                <h3 className="subtitle">Published by <b>{page.author}</b> on {page.publicationDate.format('DD-MM-YYYY')} </h3>
            </header>
            <article>
                {page.contentList.map((contentI) => {
                        if(contentI.type === 'header'){
                            return <h2 key={contentI.id}> {contentI.content}</h2>
                        } else if(contentI.type === 'paragraph'){
                            return <p key={contentI.id}>{contentI.content}</p>
                        } else if(contentI.type === 'image'){
                            return <img key={contentI.id} src={contentI.content} />
                        }
                    })
                }
            </article>
        </Container>
        <footer className="footerWebPage"> 
                <Button className='footerButton' onClick={() => {navigate('/')}}> Go Back To Home Page </Button>
                <Button className='footerEdit' onClick={() => {navigate(`/pages/${page.id}/edit`, {
                    state: { 'nextpage': `/pages/${page.id}`,
                              'id': page.id, 'title': page.title, 'author': page.author, 'pubDate': page.publicationDate.format('DD-MM-YYYY'), 'creationDate': page.creationDate.format('DD-MM-YYYY')
                    } })}}> EDIT Page </Button>
                <Button className='footerDelete' onClick={() => {navigate('/')}}> DELETE PAGE </Button>
        </footer>
    </>;
}


export { WebPage };