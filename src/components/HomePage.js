import {React, useState} from 'react';

const HomePage = (props) => {

    const {handleLogout, userEmail, addMessage, dataMessages, loading} = props

    const [message, setMessage] = useState('')


    return (
        <div>
            <h1>Welcome to the homepage {userEmail}</h1>
            <p>Bug tracker app</p>
            <input value={message} type="text" onInput={e => setMessage(e.target.value)}/>
            <button onClick={addMessage.bind(this, message)}>Make message</button>
            <button onClick={handleLogout}>Logout</button>
            {loading ? <h1>Loading...</h1> : null}
            {dataMessages.map((messages) => (
                <div>
                    <p>{messages.name}</p>
                    <p>{messages.dsc}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePage