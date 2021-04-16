import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import fire from '../fire'
import AddBug from './AddBug'
import Bugs from './Bugs'
import { nanoid } from 'nanoid'

const ProjectBugs = (props) => {

    const [editorText, setEditorText] = useState()
    const [addBugClicked, setAddBugClicked] = useState(false)
    const [bugClicked, setBugClicked] = useState(false)
    const [dataBugs, setDataBugs] = useState([])
    const [loadingBugs, setLoadingBugs] = useState(false)
    const [bugEditing, setBugEditing] = useState(false)
    const [docId, setDocId] = useState('')

    const {data, loading, getCurrentDate} = props

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
        const docId = nanoid(8)
        //aray of data contains:
        //data[0] - description of bug, data[1] - priority of bug, data[2] - content inside of bug
    
        ref.doc(docId).set({
          id: id,
          docId: docId,
          name: localStorage.getItem('currentUserEmail'),
          dsc: data[0],
          date: getCurrentDate(),
          priority: data[1],
          bugContent: data[2],
        }).catch(error => {
          console.log(error)
        })
      }

      useEffect(() => {
          getBugs()
      }, [])

      function handleChangeBugEditor(data) {
        setAddBugClicked(true)
        setBugEditing(true)
        setDocId(data)
        
      }

      function editCurrentBug(data) {
        console.log(data)
        console.log(docId)
        ref.doc(docId).update({dsc: data[0], priority: data[1], bugContent: data[2]})
      }

      function deleteCurrentBug(docId) {
        ref.doc(docId).delete()
        setBugClicked(false)
      }

    return (
        <div>
            <h1>Project Bugs</h1>
            {loading ? <p>Loading...</p> : 
            <div> 
                <h2>name of project: {data.nameOfProject}</h2>
             </div>}
            {addBugClicked ? <AddBug editCurrentBug={editCurrentBug} bugEditing={bugEditing} setBugEditing={setBugEditing} setAddBugClicked={setAddBugClicked} addBug={addBug}/> : <Bugs deleteCurrentBug={deleteCurrentBug} handleChangeBugEditor={handleChangeBugEditor} id={id} bugClicked={bugClicked} setBugClicked={setBugClicked} setAddBugClicked={setAddBugClicked} loadingBugs={loadingBugs} dataBugs={dataBugs} />}
        </div>
    )
}

export default ProjectBugs