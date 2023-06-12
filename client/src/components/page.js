'use strict';

import dayjs from 'dayjs';

// List of content: 
// is a list of elments content where Content is an 'object' with the following structure:
// { type: header/parharph/image, content: string (text or name of the image ) }

function Page(idPage, title, author, creationDate, publicationDate, contentList) {
    this.idPage = idPage;
    this.title = title;
    this.author = author;
    this.creationDate = dayjs(creationDate);
    this.publicationDate = publicationDate ? dayjs(publicationDate) : null;
    this.contentList = contentList;

}

export default Page;