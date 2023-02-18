import { redirect } from '@remix-run/node';

import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
    return (
        <main>
            <NewNote />
        </main>
    );
}

//backend code 
export async function action({request}) { 
    const formData = await request.formData(); // backend pulls data submitted by form 
    const noteData = Object.fromEntries(formData); // converts formdata object into plain javascript object (these 2 lines basically pull in user input)
    //add validation
    const existingNotes = await getStoredNotes(); //gets ahold of existing noters in the json file
    noteData.id = new Date().toISOString(); // .id so unique identifier for each note 
    const updatedNotes = existingNotes.concat(noteData); // creates updated notes object using existingNotes and concatinating note data with new note
    await storeNotes(updatedNotes); // returns a promise so add await in case we want to redirect - the line below
    return redirect('/notes'); //redirects to /notes page

}

export function links() {
    return [...newNoteLinks()]; //merges in all links of any components we might be using ... is a spread operator  merges array into the returned array // pattern called surfacing links ( in remix documentation) allows for one consistent api for making your style files available 
}
