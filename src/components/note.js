import React, { useState } from 'react';
import './note.css';

function Note() {
    const initialState = [{
        id: 1,
        title: 'javascript',
        note: 'start with basics'
    }]

    const [note, setNote] = useState('');
    const [title, setTitle] = useState('')
    const [noteContainer, setNoteContainer] = useState(initialState)
    const [search, setSearch] = useState('');
    


    const handleSubmit = (e) => {
        e.preventDefault();
        setNote('')
        setTitle('')
        if (note.length > 0) return setNoteContainer([...noteContainer, { id: Date.now(), note, title }])
    }

    const handleCancel = () => {
        setNote('');
        setTitle('');
    }

    const handleDelete = (id) => {
        let data = noteContainer.filter((el) => {
            return id !== el.id;
        })
        setNoteContainer(data)
    }

    const filterList = noteContainer.filter((el) => {
        if (search === '') return el;
        return el.title.includes(search);
    })



    return (
        <div className='container'>
            <div className='main-section'>

                <h1>Notes Making Applications</h1>
                <div className='form-container'>
                    <h4>Add Notes</h4>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} className='title-field' required />
                        <textarea placeholder='enter text here...' value={note} onChange={(e) => setNote(e.target.value)} ></textarea>
                        <button className='save-btn'>Save</button>
                        <button onClick={handleCancel} className='cancel-btn'>Cancel</button>
                    </form>
                </div>

                <div className='notes-container'>
                    <h2>Saved Notes</h2>
                    <div className='search-box'>
                        <input type='text' placeholder='search here' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className='note-boxs'>
                        {filterList.length !== 0 ? filterList.map((el) => {
                            return (
                                <div key={el.id} className='notesbox'>
                                    <h3>{el.title}</h3>
                                    <p>{el.note}</p>
                                    <button onClick={() => handleDelete(el.id)}>Delete</button>
                                </div>
                            )
                        }) : <p>No Data Found</p>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;