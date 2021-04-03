import {React, useState} from 'react';
import logo from './BugTank.png'
import { Link } from 'react-router-dom'

const HomePage = (props) => {

    const {changeCurrentProject, handleLogout, userEmail, addMessage, dataMessages, loading, projectClicked, setProjectClicked} = props

    const [message, setMessage] = useState('')
    const [currentProject, setCurrentProject] = useState('')

    const handleChange = value => {
        changeCurrentProject(value)
        console.log('Value of currentProject', value)
    }

    const getLink = (id) => {
        const linkHref = "/ProjectPage/" + id
        return linkHref
    }


    return (
        <div className="home-wrapper">
            <div className="logo">
                <img className="logo" src={logo} />
            </div>
            <button className="btn-logout" style={{marginRight: '-90%'}} onClick={handleLogout}>Logout</button>
            <h1>Welcome to the homepage {userEmail}</h1>
            <p style={{fontSize: '22px'}}>Bug tracker app</p>
            {projectClicked ? 
            <div className="adding-project">
                <input placeholder="Name of your project" value={message} type="text" size="35" onInput={e => setMessage(e.target.value)}/>
                <button onClick={addMessage.bind(this, message)}>Submit</button>
            </div> :
            <div>
                <button className="btn-create-project" onClick={() => {
                    setProjectClicked(true)
                }}>Create new project</button>    
            </div>}
            <h1 className="active-projects">Active Projects: </h1>
            {loading ? <h1>Loading...</h1> : null}
            {dataMessages.map((messages) => (
                <Link to={getLink(messages.id)}>
                    <div className="project-style" onClick={() => {handleChange(messages.nameOfProject)}}>
                        <div className="project-dsc-wrapper">
                            <span className="project-user">
                                <p>Project creator: {messages.userName}</p>
                            </span>
                            <span className="project-name">
                                <p>Name of project: {messages.nameOfProject}</p>
                            </span>
                            <span className="project-date">
                                <p>Date of creation: {messages.dateOfCreation}</p>
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default HomePage