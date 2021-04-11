import React from 'react';

const BugInfo = (props) => {

    const {bugData, handleChangePage} = props

    return (
        <div>
            <button onClick={handleChangePage}>Back to bugs</button>
            <p>{bugData.name}</p>
        </div>
    )
}

export default BugInfo