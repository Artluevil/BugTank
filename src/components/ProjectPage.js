import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProjectBugs from './ProjectBugs'
import Overview from './Overview';

const ProjectPage = (props) => {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState('Overview')

    const {dataMessages, loading, getCurrentDate} = props

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

    function getActivePage() {
        if (activePage === 'Overview') {
            return < Overview/>
        } else if (activePage === "Bugs") {
            return <ProjectBugs getCurrentDate={getCurrentDate} data={data}/>
        }
    }


    useEffect(() => {
        getCurrentData()
    }, [dataMessages])

    return (
        <div>
            <div className="navigation">
                <ul>
                    <li onClick={() => setActivePage('Overview')}>Overview</li>
                    <li onClick={() => setActivePage('Bugs')}>Bugs</li>
                    <li>Settings</li>
                </ul>
            </div>
            {getActivePage()}
        </div>
    )
}

export default ProjectPage