import React, { useState } from 'react';
import SunEditior from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';





const AddBug = () => {

    const [descriptionOfBug, setDescriptionOfBug] = useState('')
    const [editorText, setEditiorText] = useState()

    const handleTextEditor = (content) => {
        setEditiorText(content)
    }

    return (
        <div>
            <div>
                <p>Description of your bug</p>
                <input value={descriptionOfBug} onInput={e => setDescriptionOfBug(e.target.value)}></input>
            </div>
            <div className="text-editor">
                <SunEditior onChange={handleTextEditor} height="400px" width="70%" style={{marginLeft: "25%"}} />
            </div>
            <form>
                <p>Please select your bug priority:</p>
                <input type="radio" value="male" name="priority"/>
                <label for="male">Low</label>
                <input type="radio"value="female" name="priority"/>
                <label for="female">Medium</label>
                <input type="radio"value="other" name="priority"/>
                <label for="other">High</label>
            </form>
            <button>Submit</button>
            <div dangerouslySetInnerHTML={{__html: editorText}}></div>
            <p>{descriptionOfBug}</p>
        </div>
    )
}

export default AddBug