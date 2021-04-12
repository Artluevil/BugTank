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
    

    const ref = fire.firestore().collection(localStorage.getItem('currentUserEmail') + '-user-bugs')

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
      
       function addBug(data) {
        let currentDay = new Date()
        let dd = String(currentDay.getDate()).padStart(2, '0')
        let mm = String(currentDay.getMonth() + 1).padStart(2, '0')
        let year = currentDay.getFullYear()
    
        ref
          .add({
            name: localStorage.getItem('currentUserEmail'),
            dsc: data[0],
            date: dd + '/' + mm + '/' + year,
            priority: data[1],
          }).catch(error => {
            console.log(error)
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
            {addBugClicked ? <AddBug addBug={addBug}/> : <Bugs id={id} setAddBugClicked={setAddBugClicked} loadingBugs={loadingBugs} dataBugs={dataBugs} />}
        </div>
    )
}

export default ProjectBugs