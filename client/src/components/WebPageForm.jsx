import dayjs from 'dayjs';

import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';


function WebPageForm(props){
  /*
   * Creating a state for each parameter of the webpage.
   * There are two possible cases: 
   * - if we are creating a new webpage, the form is initialized with the default values.
   * - if we are editing a webpage, the form is pre-filled with the previous values.
   */
  const navigate = useNavigate();
  const location = useLocation();
  
  const webPage = props.webPage;

  const [title, setTitle] = useState(webPage ? webPage.title : ' ');
  const [author, setAuthor] = useState(webPage ? webPage.author : false);
  const [publicationDate, setPublicationDate] = useState((webPage && webPage.publicationDate) ? webPage.publicationDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
  const [contentsList, setContentsList] = useState((webPage && webPage.contentsList !== undefined) ? webPage.contentsList : 0);

  const handleSubmit = (event) => {
    /*
    event.preventDefault();

    const webpage = {"title": title.trim(), "author": author, "contentsList": contentsList}
    if(publicationDate)  // adding publicationDate only if it is defined
      webpage.publicationDate = (dayjs(publicationDate).format('YYYY-MM-DD')).toString();
    
    if(webPage) {
      webpage.id = webPage.id;
      props.editFilm(webpage);
    }
    else
      props.addFilm(webpage);
    */    
  }


  return (
    <Form className="block-example border border-primary rounded mb-0 form-padding" onSubmit={handleSubmit}>
      
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" required={true} value={title} onChange={event => setTitle(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Author" name="author" checked={author} onChange={(event) => setAuthor(event.target.checked)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>publicationDate</Form.Label>
        { /* publicationDate is an optional parameter. It have to be properly rendered only if available. */ }
        <Form.Control type="date" value={publicationDate} onChange={event => {event.target.value ? setPublicationDate(dayjs(event.target.value).format('YYYY-MM-DD')) : setPublicationDate("")}}/>
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">{webPage ? 'Save' : 'Add'}</Button>
      &nbsp;
      <Button className="mb-3" variant="danger" onClick={() => { 
        const page = location.state
        if(page)
          navigate(location.state.nextpage, { state: {'id': page.id, 'title': page.title, 'author': page.author, 'pubDate': page.publicationDate, 'creationDate': page.creationDate } });
        else
          navigate('/');
       }}>Cancel</Button>
    </Form>
  )

}

export default WebPageForm;
