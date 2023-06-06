import { useState } from "react";
import Page from "./page"; 

function WebPage(){
    
    // const {page, setPage } = useState('');
    // retrieve page from database
    const lContent = [ {'id': 1, 'type': 'header', 'content': 'Title1' }, {'id': 2,'type': 'paragraph', 'content': 'This is some text in paragraph1. ' } ];
    const page = new Page(0, 'Title', 'Author', '2021-01-01', '2021-01-01', lContent);

    return <>
        <h1>{page.title}</h1>
        <h6>Published {page.publicationDate.format('DD-MM-YYYY')}, by <b>{page.author}</b></h6>
        { /* qua ci deve essere una logica che legge in ordine il campo contentList e in base al tipo lo converte in tipo html e lo visualizza */ }
        {lContent.map((contentI) => {
                if(contentI.type === 'header'){
                    return <h3 key={contentI.id}> {contentI.content}</h3>
                } else if(contentI.type === 'paragraph'){
                    return <p key={contentI.id}>{contentI.content}</p>
                } else if(contentI.type === 'image'){
                    return <img key={contentI.id} src={contentI.content} />
                }
            })
        }
    </>;
}

export default WebPage;