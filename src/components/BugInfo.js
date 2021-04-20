import React from 'react';
import fire from '../fire'

const BugInfo = (props) => {

    const {bugData, handleChangePage, handleChangeBugEditor, deleteCurrentBug} = props

    function getDefaultValues() {
        const defaultValues = [bugData.dsc, bugData.bugContent]
        return defaultValues
    }

    return (
        <div style={{marginTop: '-40px'}}>
            <div>
                <button className="btn-dark-gray" onClick={handleChangePage}>Back to bugs</button>
            </div>
            <div>
                <div className="bug-reporter-container">
                    <h2 style={{marginBottom: "-10px"}}>Reporter: </h2>
                    <p>{bugData.name}</p>
                </div>
                <p>Bug priority: {bugData.priority}</p>
                <div className="bug-content">
                    <div dangerouslySetInnerHTML={{__html: bugData.bugContent}}></div>
                </div>
                <div className="bug-options">
                    <button onClick={() => handleChangeBugEditor(bugData)} className="btn-cyan">Edit bug</button>
                    <button onClick={() => deleteCurrentBug(bugData.docId)} className="btn-red">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default BugInfo