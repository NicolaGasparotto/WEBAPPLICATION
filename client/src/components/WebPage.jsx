import { useState } from "react";
import Page from "./page"; 
import { Container } from "react-bootstrap";
import './style.css'

function WebPage(){
    
    // const {page, setPage } = useState('');
    // retrieve page from database
    const lContent = [ {'id': 1, 'type': 'header', 'content': 'Title1' }, {'id': 2,'type': 'paragraph', 'content': 'This is some text in paragraph1. not tooo short because is not possible to see the centrature' } ];
    const page = new Page(0, 'Title that is not too short by means of visualization', 'Author', '2021-01-01', '2021-01-01', lContent);

    return <>
        <Container className="justify-content-center col-md-10 col-lg-6 col-xl-7">
            <header>
                <h1 className="title">{page.title}</h1>
                <h3 className="subtitle">Published by <b>{page.author}</b> on {page.publicationDate.format('DD-MM-YYYY')} </h3>
            </header>
            
            <article>
                {lContent.map((contentI) => {
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
    </>;
}


export default WebPage;