import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import fire from '../fire'
import AddBug from './AddBug'
import Bugs from './Bugs'

const ProjectBugs = (props) => {

    const [editorText, setEditorText] = useState()
    const [addBugClicked, setAddBugClicked] = useState(false)
    const [dataBugs, setDataBugs] = useState([])
    const [loadingBugs, setLoadingBugs] = useState(false)

    const {data, loading} = props

    let { id } = useParams()

    function handleEditorChange(content) {
        console.log(content)
        setEditorText(content)
    }

    const handleAddBugClick = () => {
        setAddBugClicked(true)
        console.log(addBugClicked)
    }

    const ref = fire.firestore().collection(fire.auth().currentUser.email + '-user-bugs')

    function getBugs() {
        setLoadingBugs(true)
        ref.onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setDataBugs(items)
          setLoadingBugs(false)
        })
      }

      useEffect(() => {
          getBugs()
      }, [])


    return (
        <div>
            <h1>Project Bugs</h1>
            <h2>Collection ID: {id}</h2>
            {loading ? <p>Loading...</p> : 
            <div> 
                <p>name of project: {data.nameOfProject}</p>
             </div>}
            {addBugClicked ? <AddBug /> : <Bugs setAddBugClicked={setAddBugClicked} loadingBugs={loadingBugs} dataBugs={dataBugs} />}
        </div>
    )
}

export default ProjectBugs