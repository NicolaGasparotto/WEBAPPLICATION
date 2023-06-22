import WebPageForm from "./WebPageForm";
import { addNewPage, editPage } from "../API" 

function AddWebPage(){

    const handleAddNewPage = async (page) => {
        const { idPage: pageId, ...pageInfo } = page;
        await addNewPage(pageInfo);
    }

    return<>
        <WebPageForm submitUpdates={handleAddNewPage}/>
    </> 
    ;
}

function EditWebPage(){
    
    const handleEditPage = async (page) => {
        console.log(page);
        const { idPage: pageId, ...pageInfo } = page;
        await editPage(pageId, pageInfo);
    }

    return<>
        <WebPageForm submitUpdates={handleEditPage}/>
    </> 
    ;
}

export { AddWebPage, EditWebPage };