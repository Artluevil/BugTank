import React, { useState } from 'react';
import SunEditior from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';





const AddBug = (props) => {

    const [descriptionOfBug, setDescriptionOfBug] = useState('')
    const [editorText, setEditorText] = useState('')
    const [priority, setPriority] = useState()

    const {addBug, setAddBugClicked} = props

    const handleTextEditor = (content) => {
        setEditorText(content)
    }

    const priorityCheck = (e) => {
        setPriority(e.target.value)
    }

    function submitBug() {
        const data = [descriptionOfBug, priority, editorText]
        addBug(data)
    }
 

    return (
        <div>
            <button className="btn-dark-gray" onClick={() => setAddBugClicked(false)}>back to bugs</button>
            <div className="container-bug-dsc">
                <p className="input-bug-dsc">Short description of your bug:</p>
                <input value={descriptionOfBug} onInput={e => setDescriptionOfBug(e.target.value)}></input>
                <p>Describe your bug:</p>
            </div>
            <div className="text-editor">
                <SunEditior onChange={handleTextEditor} width="70%" height="400px"/>
            </div>
            <form className="bug-priority-container">
                <p style={{marginBottom: "10px"}}>Please select your bug priority:</p>
                <input type="radio" value="Low" name="priority" onChange={(e) => priorityCheck(e)}/>
                <label for="male">Low</label>
                <input type="radio"value="Medium" name="priority" onChange={(e) => priorityCheck(e)}/>
                <label for="female">Medium</label>
                <input type="radio"value="High" name="priority" onChange={(e) => priorityCheck(e)}/>
                <label for="other">High</label>
            </form>
            <button className="btn-dark-gray" onClick={submitBug}>Submit</button>
        </div>
    )
}

export default AddBug