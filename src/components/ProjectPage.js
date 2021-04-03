import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SunEditior from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';

const ProjectPage = (props) => {
    const [data, setData] = useState([])
    const [editorText, setEditorText] = useState()
    const [addBugClicked, setAddBugClicked] = useState(false)

    const {dataMessages, loading} = props

    let { id } = useParams()

    const getCurrentData = () => {
        dataMessages.map(messages => {
            console.log('messages.id:', messages.id)
            console.log('id:', id)
            if (messages.id === id) {
                setData(messages)
            }
        })
        console.log(data)
    }

    function handleEditorChange(content) {
        console.log(content)
        setEditorText(content)
    }

    const handleAddBugClick = () => {
        setAddBugClicked(true)
        console.log(addBugClicked)
    }

    useEffect(() => {
        getCurrentData()
    }, [dataMessages])

    return (
        <div>
            <h1>Collection ID: {id}</h1>
            {loading ? <p>Loading...</p> : 
            <div> 
                <p>name of project: {data.nameOfProject}</p>
             </div>}
            {addBugClicked ? 
            <div className="text-editor">
                <SunEditior onChange={handleEditorChange} width="75%" height="500"/>
            </div> : <button onClick={() => setAddBugClicked(true)}>Add bug</button>}
            <div dangerouslySetInnerHTML={{__html: editorText}}></div>
        </div>
    )
}

export default ProjectPage