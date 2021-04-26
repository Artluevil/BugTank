import React from 'react';
import FirebaseIcon from '../Images/firebase-icon.png'
import BugTankTut1 from '../Images/bug-tracker-tut1.jpg'
import BugTankTut2 from '../Images/bug-tracker-tut2.jpg'
import BugTankTut3 from '../Images/bug-tracker-tut3.jpg'

function LandingPage() {
    return (
        <section>
            <div>
                <h1>Landing Page</h1>
            </div>
            <div>
                <p>BugTank is bug tracker app when you can store bugs</p>
                <p>Website is build with firebase firestore database</p>
                <div>
                    <img src={FirebaseIcon}/>
                </div>
                <p>BugTank have CRUD option which let you to add, delete and update your bugs</p>
                <p>First step is to create project</p>
                <div>
                    <img src={BugTankTut1}/>
                </div>
                <p>Manage bugs</p>
                <div>
                    <img src={BugTankTut2}/>
                </div>
                <div>
                    <img src={BugTankTut3}/>
                </div>
            </div>
        </section>
    )
}

export default LandingPage