import styles from './NewNote.css';
import { Form, useActionData, useNavigation } from '@remix-run/react';


//Form is remix and form is default. in the lines below i sub the default for the more powerful remix Form. keeps the page from being re downloaded each time. and just updates the current one
function NewNote() {
    const data = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method="post" id="note-form">
            {data?.message && <p>{data.message}</p> }
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" required />
            </p>
            <div className="form-actions">
                <button disabled={isSubmitting}> {/*checks to see if button was pressed and if it was it disables it so it cant be spammed */}
                    {isSubmitting ? 'Adding...' : 'Add Note'}
                </button> 
            </div>
        </Form>
    );
}

export default NewNote;

export function links() {
    return [{ rel: 'stylesheet', href: styles }]; // returns array 
}