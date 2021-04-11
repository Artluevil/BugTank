import React from 'react';
import SunEditior from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';

//<div dangerouslySetInnerHTML={{__html: editorText}}></div>

const handleTextEditor = (content) => {
    console.log(content)
}

const AddBug = () => {
    return (
        <div>
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
        </div>
    )
}

export default AddBug