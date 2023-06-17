import Page from "./page"; 
import { Button, Row, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";

import './style.css'
import dayjs from "dayjs";

import { PageNotFound } from "./PageNotFound";
import { deletePage, getContents} from "../API";

function WebPage(){
    
    const navigate = useNavigate() ;
    const location  = useLocation() ;

    const user = useContext(UserContext) ;

    const [ lContent, setLContent ] = useState([]) ; 

    let page = undefined ;
    if(location.state) {
        page = location.state ;
        page = new Page(page.idPage, page.title, page.author, page.creationDate, page.publicationDate,  lContent) ;
    }else {
        /* in this way is not possible to insert the url manually and display the pages */
        return <>
            <PageNotFound/>
        </>
        ;
    }

    useEffect(() => {
        getContents(location.state.idPage).then((list) => {
            setLContent(list) ;
        });
    }, []);
    
    const handleDelete = async (id) => {
        //setWaiting(true);
        await deletePage(id);
        // setWaiting(false);
        navigate('/');
    }

    const pubDate = () => {
        if(page.publicationDate === null)
            return <span style={{color: "red", fontWeight: "500"}}>DRAFT</span>;
        else if(dayjs(page.publicationDate).isBefore(dayjs()))
            return <b>{page.publicationDate.format('DD-MM-YYYY')}</b>;
        else
            return <span style={{color: "cornflowerblue", fontWeight: "500"}}> {page.publicationDate.format('DD-MM-YYYY')} (not yet published)</span>;
    }

    return <>
        <div style={{marginBottom: '8rem'}}>
            <Row className="justify-content-center row gx-4 gx-lg-5 mb-5">
            <header className="col-11 col-sm-10 col-md-8 col-xl-6 col-lg-6">
                <h1 className="title">{page.title}</h1>
                <h3 className="subtitle">Published by <b>{page.author}</b> on {pubDate()} </h3>
                <h4 className="subtitle2">Created on {page.creationDate.format('DD-MM-YYYY')} </h4>
            </header>
            </Row>
            <Row className="justify-content-center row gx-4 gx-lg-5">
            <article className="col-11 col-sm-10 col-md-8 col-xl-6 col-lg-6">
                {page.contentList.map((contentI) => {
                        if(contentI.type === 'header'){
                            return <h2 className="heading2" key={contentI.idContent}> {contentI.content}</h2>
                        } else if(contentI.type === 'paragraph'){
                            return <p key={contentI.idContent}>{contentI.content}</p>
                        } else if(contentI.type === 'image'){
                            return <div key={contentI.idContent} className="row gx-3 mb-5 mt-5">
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
                <Button className='footerButton' onClick={() => {navigate('/')}}> Back to Home Page </Button>
                
                {(user.backOfficeView && (user.name === page.author || user.admin)) ? <>
                <Button className='footerEdit' onClick={() => {navigate(`/pages/${page.idPage}/edit`, {
                    state: { 'nextpage': `/pages/${page.idPage}`,
                              'idPage': page.idPage, 'title': page.title, 'author': page.author, 'publicationDate': page.publicationDate.format('DD-MM-YYYY'), 'creationDate': page.creationDate.format('DD-MM-YYYY')
                    } })}}> EDIT Page </Button>
                <Button className='footerDelete' onClick={() => {handleDelete(page.idPage)}}> DELETE PAGE </Button>
                </> : <></>}
        </footer>
    </>;
}


export { WebPage };