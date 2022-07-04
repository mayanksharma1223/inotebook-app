import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext);

    const { deleteNote } = context;
    const { note, updateNote } = props;

    const deleted=() => {
        let confirmdelete= window.confirm("Do you really want to delete?")
        if(confirmdelete){
            deleteNote(note._id);
          props.showAlert("Deleted successfully", "success")
        }
        else{}
         }
    return (
        <div className='col-md-3 '>


            <div className="cardnote card my-3 p-2 my-3 bg-body " >
                <div className="card-body text-break">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title me-auto ">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2 " data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" onClick={deleted} ></i>
                        <i data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit" className="fa-solid fa-pen-to-square mx-3" onClick={() => { updateNote(note) }}></i>

                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem