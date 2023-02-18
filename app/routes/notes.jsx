import NewNote, {links as newNoteLinks } from '~/components/NewNote';


export default function NotesPage() {
    return (
        <main>
            <NewNote />
        </main>
    );
}

export function links() {
    return [...newNoteLinks()]; //merges in all links of any components we might be using ... is a spread operator  merges array into the returned array // pattern called surfacing links ( in remix documentation) allows for one consistent api for making your style files available 
}