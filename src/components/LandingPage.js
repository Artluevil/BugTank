import React from 'react';
import FirebaseIcon from '../Images/firebase-icon.png'
import BugTankTut1 from '../Images/bug-tracker-tut1.jpg'
import BugTankTut2 from '../Images/bug-tracker-tut2.jpg'
import BugTankTut3 from '../Images/bug-tracker-tut3.jpg'
import BugTankTut4 from '../Images/bug-tracker-tut4.jpg'

function LandingPage() {
    const font24px = {
        fontSize: '24px'
    }

    const font36px = {
        fontSize: '36px'
    }

    return (
        <section>
            <div>
                <h1 style={{fontSize: '52px'}}>Landing Page</h1>
            </div>
            <div>
                <p style={font24px}>BugTank is bug tracker app where you can store bugs</p>
                <p style={font24px}>Website is build with firebase firestore database</p>
                <div>
                    <img className="firebase-icon-img" src={FirebaseIcon}/>
                </div>
                <p style={{marginBottom: '150px', fontSize: '24px'}}>BugTank have CRUD option which let you to add, delete and update your bugs</p>
                <p style={font36px}>First step is to create project</p>
                <div style={{marginBottom: '150px'}}>
                    <img className="tut1-img"  src={BugTankTut1}/>
                </div>
                <p style={font36px}>Manage bugs</p>
                <div>
                    <img className="tut2-img" src={BugTankTut2}/>
                </div>
                <div style={{marginBottom: '150px'}}>
                    <img className="tut3-img" src={BugTankTut3}/>
                </div>
                <p style={font36px}>Data visualization for bugs</p>
                <div style={{marginBottom: '150px'}}>
                    <img className="tut4-img" src={BugTankTut4}/>
                </div>
                <div className="link-sign-up-wrapper">
                    <a className="link-sign-up" href='/BugTankInit'>Sign up and test BugTank!</a>
                </div>
            </div>
        </section>
    )
}

export default LandingPage