import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ProjectBugs from './ProjectBugs'

const ProjectPage = (props) => {
    const [data, setData] = useState([])

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


    useEffect(() => {
        getCurrentData()
    }, [dataMessages])

    return (
        <div>
            <div className="navigation">
                <ul>
                    <li>Overview</li>
                    <li>Bugs</li>
                    <li>Settings</li>
                </ul>
            </div>
            <ProjectBugs data={data}/>
        </div>
    )
}

export default ProjectPage