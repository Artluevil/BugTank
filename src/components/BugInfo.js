import React from 'react';

const BugInfo = (props) => {

    const {bugData, handleChangePage, handleChangeBugEditor} = props

    return (
        <div style={{marginTop: '-40px'}}>
            <p>Bug priority: {bugData.priority}</p>
            <div>
                <button className="btn-dark-gray" onClick={handleChangePage}>Back to bugs</button>
            </div>
            <div>
                <button onClick={() => handleChangeBugEditor(bugData.docId)} style={{marginTop: '20px', backgroundColor: 'cyan', color: 'black'}} className="btn-dark-gray">Edit bug</button>
            </div>
            <div>
                <h2 style={{marginBottom: "-10px"}}>Reporter: </h2>
                <p>{bugData.name}</p>
                <p>{bugData.id}</p>
                <p>{bugData.docId}</p>
                <div className="bug-content">
                    <div dangerouslySetInnerHTML={{__html: bugData.bugContent}}></div>
                </div>
            </div>
        </div>
    )
}

export default BugInfo