import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Notes successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="cardItem container border-2 border-primary mb-5 bg-body my-3">
                <div className="h2add text-center shadow mb-5 bg-body overflow-none">
                    <h2 className="h2add text-white py-2 overflow-none">Add a Note</h2>
                </div>
                <form className='my-3 p-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control shadow" id="title" name="title" value={note.title} placeholder="Enter your note title here" onChange={onChange} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control shadow" id="description" name="description" value={note.description} rows="3" placeholder="Enter your note description here" onChange={onChange} minLength={3} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="tag" className="form-control shadow" id="tag" value={note.tag} name="tag" placeholder="Enter the Tag here" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </div>
    )
}

export default AddNote