import React from "react";

import Page from "./page"; 
import { Button, Row, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext } from "react";

import './style.css'
import { PageNotFound } from "./PageNotFound";

function WebPage(){
    
    const navigate = useNavigate() ;
    const location  = useLocation() ;

    const user = useContext(UserContext) ;

    // fake data
    const lContent = [ {'id': 1, 'type': 'header', 'content': 'Title1' }, {'id': 2,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' },
    {'id': 3, 'type': 'image', 'content': 'giraffe_01.png'},
    {'id': 4, 'type': 'image', 'content': 'giraffe_02.png'},
    {'id': 5, 'type': 'image', 'content': 'giraffe_03.png'},
    {'id': 6, 'type': 'image', 'content': 'giraffe_04.png'},
    {'id': 7,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' } ];

    let page = undefined ;
    if(location.state) {
        page = location.state ;
        page = new Page(page.id, page.title, page.author, page.pubDate, page.creationDate, lContent) ;
    }else {
        return <>
            <PageNotFound/>
        </>
        ;
    }
    
    // const {page, setPage } = useState('');
    // retrieve page from database
    
    
    return <>
        <div style={{marginBottom: '8rem'}}>
            <Row className="justify-content-center row gx-4 gx-lg-5 mb-5">
            <header className="col-md-10 col-lg-8 col-xl-6">
                <h1 className="title">{page.title}</h1>
                <h3 className="subtitle">Published by <b>{page.author}</b> on {page.publicationDate.format('DD-MM-YYYY')} </h3>
            </header>
            </Row>
            <Row className="justify-content-center row gx-4 gx-lg-5">
            <article className="col-md-10 col-lg-8 col-xl-6">
                {page.contentList.map((contentI) => {
                        if(contentI.type === 'header'){
                            return <h2 className="heading2" key={contentI.id}> {contentI.content}</h2>
                        } else if(contentI.type === 'paragraph'){
                            return <p key={contentI.id}>{contentI.content}</p>
                        } else if(contentI.type === 'image'){
                            return <div key={contentI.id} className="row gx-3 mb-5 mt-5">
                                        <Image
                                            src={"http://localhost:3000/static/images/" + contentI.content}
                                            alt="Image"
                                            fluid
                                        />
                                    </div>
                        }
                    })
                }
            </article>
            </Row>
        </div>
        <footer className="footerWebPage"> 
                <Button className='footerButton' onClick={() => {navigate('/')}}> Go Back To Home Page </Button>
                {(user.backOfficeView && (user.name === page.author || user.admin)) ? <>
                <Button className='footerEdit' onClick={() => {navigate(`/pages/${page.id}/edit`, {
                    state: { 'nextpage': `/pages/${page.id}`,
                              'id': page.id, 'title': page.title, 'author': page.author, 'pubDate': page.publicationDate.format('DD-MM-YYYY'), 'creationDate': page.creationDate.format('DD-MM-YYYY')
                    } })}}> EDIT Page </Button>
                <Button className='footerDelete' onClick={() => {navigate('/')}}> DELETE PAGE </Button>
                </> : <></>}
        </footer>
    </>;
}


export { WebPage };