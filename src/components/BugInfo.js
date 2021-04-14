import React from 'react';

const BugInfo = (props) => {

    const {bugData, handleChangePage} = props

    return (
        <div style={{marginTop: '-40px'}}>
            <button className="btn-dark-gray" onClick={handleChangePage}>Back to bugs</button>
            <div>
                <h2 style={{marginBottom: "-10px"}}>Reporter: </h2>
                <p>{bugData.name}</p>
                <div className="bug-content">
                    <div dangerouslySetInnerHTML={{__html: bugData.bugContent}}></div>
                </div>
            </div>
        </div>
    )
}

export default BugInfo