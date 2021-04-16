import React, { useState } from 'react';
import BugInfo from './BugInfo'

const Bugs = (props) => {

    const [bugClicked, setBugClicked] = useState(false)
    const [bugData, setBugData] = useState([])

    const {setAddBugClicked, loadingBugs, dataBugs, id, handleChangeBugEditor} = props

    function getColor(priority) {
        if (priority === "Low") {
            return {backgroundColor: "Green"}
        } else if (priority === "Medium") {
            return {backgroundColor: "Orange"}
        } else if (priority === "High") {
            return {backgroundColor: "Red"}
        } else {
            return {backgroundColor: "gray"}
        }
    }

    function checkBugsRepository(bug) {
        if(bug.id === id) {
            return (
                <div>
                    <span onClick={() => {handleChangePage(); handleGiveData(bug)}} className="bugs-container">
                        <p className="bugs-name">{bug.name}</p>
                        <p className="bugs-dsc">{bug.dsc}</p>
                        <p className="bugs-date">{bug.date}</p>
                        <p style={getColor(bug.priority)} className="bugs-priority">{bug.priority}</p>
                    </span>
                </div>
            )
        }
    }

    function bugLoader() {
        return (
            <div>
                {bugClicked ? <BugInfo handleChangeBugEditor={handleChangeBugEditor} handleChangePage={handleChangePage} bugData={bugData}/> : 
                
                dataBugs.map((bug) => (
                    checkBugsRepository(bug)
                    ))
                    }
            </div>
        )
    }

    function handleChangePage() {
        setBugClicked(!bugClicked)
    }

    function handleGiveData(data) {
        setBugData(data)
    }
    return (
        <div>
            <div style={bugClicked ? {visibility: "hidden"} : {visibility: "visible"}}>
                <div className="tags">
                    <p className="tags-name">Reporter</p>
                    <p className="tags-description">Description</p>
                    <p className="tags-date">Date</p>
                    <p className="tags-priority">Priority</p>
                </div>
                <button className="btn-dark-gray" onClick={() => setAddBugClicked(true)}>Add</button>
            </div>
            {loadingBugs ? <p>Loading...</p> :
            <div >
                {bugLoader()}
            </div>}
        </div>
    )
}

export default Bugs