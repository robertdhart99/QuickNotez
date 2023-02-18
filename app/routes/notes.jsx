import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

//this is prepared and pre rendered on the server and the finished html code is sent to the client along with javascript code so that it is still interactive for the end user
export default function NotesPage() {
    const notes = useLoaderData(); // gives access to data returned by loader ( is a hook)

    return (
        <main>
            <NewNote /> 
            <NoteList notes={notes} />
        </main>
    );
}

//loads the data whenever the funtion NotesPage is loaded ( get request reaches that route)
//returns a promise so added async to turn loader into async function
export async function loader() {
    const notes = await getStoredNotes();
    return notes; // data returned is serialized 
} 


//backend code 
export async function action({request}) { 
    const formData = await request.formData(); // backend pulls data submitted by form 
    const noteData = Object.fromEntries(formData); // converts formdata object into plain javascript object (these 2 lines basically pull in user input)

    // validation for the title to be at least 5 long
    if (noteData.title.trim().length < 5) {
        return { message: 'Invalid title - must be at least 5 characters long.' };
    }

    const existingNotes = await getStoredNotes(); //gets ahold of existing noters in the json file
    noteData.id = new Date().toISOString(); // .id so unique identifier for each note 
    const updatedNotes = existingNotes.concat(noteData); // creates updated notes object using existingNotes and concatinating note data with new note
    await storeNotes(updatedNotes); // returns a promise so add await in case we want to redirect - the line below
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000)); //used to test the button disabled by making it wait 2 sec before updating.
    return redirect('/notes'); //redirects to /notes page 

}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()]; //merges in all links of any components we might be using ... is a spread operator  merges array into the returned array // pattern called surfacing links ( in remix documentation) allows for one consistent api for making your style files available 
}//loads all the css files that are needed for all the components that we use in this route component
