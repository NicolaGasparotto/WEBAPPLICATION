'use strict';

import dayjs from 'dayjs';

// List of content: 
// is a list of elments content where Content is an 'object' with the following structure:
// { type: header/parharph/image, content: string (text or name of the image ) }

function Page(id, title, author, creationDate, publicationDate, contentList) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.creationDate = dayjs(creationDate);
    this.publicationDate = dayjs(publicationDate);
    this.contentList = contentList;

}

export default Page;