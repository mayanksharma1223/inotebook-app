import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from "react-router-dom";
import underline from "../img/underline.png"
export default function Notes(props) {
  const context = useContext(noteContext);
  let history=useHistory();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history.push("/login")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"" ,etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle: currentNote.title,edescription: currentNote.description, etag:currentNote.tag})
  }


  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription,note.etag)
    refClose.current.click()
    props.showAlert("Updated successfully","success")
}
const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control shadow" id="etitle" value={note.etitle} name="etitle" placeholder="Enter your note title here" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea className="form-control shadow" id="edescription" value={note.edescription} name="edescription" rows="3" placeholder="Enter your note description here" onChange={onChange} minLength={3} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="etag" className="form-control shadow" value={note.etag} id="etag" name="etag" placeholder="Enter the Tag here" onChange={onChange} />
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<3} onClick={handleClick} type="button" className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>


      <div className=" container row my-3">
        <div className="text-center">
        <h1 className='m-0'>Your Notes</h1>
        <img className='color-dark w-50 mb-3' src={underline} alt="" />
        </div>
        <div className="container mx-2">
        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>

  )
}
