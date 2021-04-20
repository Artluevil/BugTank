import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProjectBugs from './ProjectBugs'
import Overview from './Overview';
import BugTankLogo from './BugTank.png'

const ProjectPage = (props) => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState('Bugs')
    const [dataBugs, setDataBugs] = useState([])

    const {dataMessages, loading, getCurrentDate} = props

    let { id } = useParams()

    const getCurrentData = () => {
        dataMessages.map(messages => {
            if (messages.id === id) {
                setData(messages)
            }
        })
    }

    function getActivePage() {
        if (activePage === 'Overview') {
            return < Overview dataTest={data} id={id} dataBugs={dataBugs}/>
        } else if (activePage === "Bugs") {
            return <ProjectBugs getCurrentDate={getCurrentDate} data={data} getDataBugs={getDataBugs}/>
        }
    }

    function getDataBugs(dataBugs) {
        setDataBugs(dataBugs)
    }


    useEffect(() => {
        getCurrentData()
    }, [dataMessages])

    return (
        <div>
            <div>
                <img className="nav-logo" src={BugTankLogo}/>
            </div>
            <div className="navigation">
                <ul>
                    <li style={activePage == 'Overview' ? {background: 'gray'} : null} onClick={() => setActivePage('Overview')}>Overview</li>
                    <li style={activePage == 'Bugs' ? {background: 'gray'} : null} onClick={() => setActivePage('Bugs')}>Bugs</li>
                    <li>Settings</li>
                </ul>
            </div>
            {getActivePage()}
        </div>
    )
}

export default ProjectPage