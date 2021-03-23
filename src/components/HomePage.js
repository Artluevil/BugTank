import {React, useState} from 'react';

const HomePage = (props) => {

    const {handleLogout, userEmail, addMessage, dataMessages, loading,} = props

    const [message, setMessage] = useState('')


    return (
        <div>
            <button style={{marginRight: '-90%'}} onClick={handleLogout}>Logout</button>
            <h1>Welcome to the homepage {userEmail}</h1>
            <p>Bug tracker app</p>
            <div className="adding-project">
                <input value={message} type="text" onInput={e => setMessage(e.target.value)}/>
                <button onClick={addMessage.bind(this, message)}>Enter name of your project</button>
            </div>
            {loading ? <h1>Loading...</h1> : null}
            {dataMessages.map((messages) => (
                <div>
                    <p>{messages.userName}</p>
                    <p>{messages.nameOfProject}</p>
                    <p>Date of creation: {messages.dateOfCreation}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePage