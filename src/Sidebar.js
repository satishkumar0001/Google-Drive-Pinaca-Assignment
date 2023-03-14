import { useState } from 'react';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import DevicesIcon from '@material-ui/icons/Devices';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import "./css/sidebar.css"
import { db,storage } from './firebase';
import firebase from 'firebase';
import { Modal } from '@material-ui/core';




const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [uploading,setUploading] = useState(false);
    const [file,setFile] = useState(null);

    const handleClose =()=>{
        setOpen(false);
    }
    const handleOpen=()=>{
        setOpen(true);
    }
    const handleChange=(e)=>{
        if(e.target.files[0])
        {
            setFile(e.target.files[0])
        }
    }
    const handleUpload=(event)=>{
        event.preventDefault();
        setUploading(true);
    
        storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
            console.log(snapshot)
            storage.ref("files").child(file.name).getDownloadURL().then(url=>{
                db.collection("myfiles").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    filename:file.name,
                    fileURL:url,
                    size:snapshot._delegate.bytesTransferred
                })
    
                setUploading(false);
                setFile(null);
                setOpen(false)
            })
        })
                
    }
  return (
    <>

    <Modal open ={open} onClose={handleClose}>
        <div className='modal_pop'>
        <form>
            <div className='modalHeading'>
                <h3>Select file you want to upload</h3>
            </div>

            <div className='modalBody'>
                {
                    uploading ? (<p className='uploading'>Uploading</p>):(
                
                <>
                <input type="file" onChange={handleChange}/>
                <input type="submit" className='post__submit' onClick={handleUpload}/>
                </>
                )
                    }
            </div>
        </form>
        </div>
    </Modal>

    <div className='sidebar'>
      <div className='sidebar_btn'>

      <button onClick={handleOpen}>
         <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" alt="lpgo"/>
         <span>New</span>
      </button>
      </div>

      <div className="sidebar_options">
                <div class="sidebar_option sidebar_option-Active">
                    <MobileScreenShareIcon/>
                    <span><b>My Drive</b></span>
                </div>

                <div class="sidebar_option">
                    <DevicesIcon/>
                    <span>Computers</span>
                </div>

                <div class="sidebar_option">
                    <PeopleAltOutlinedIcon/>
                    <span>Shared with me</span>
                </div>

                <div class="sidebar_option">
                    <QueryBuilderOutlinedIcon/>
                    <span>Recent</span>
                </div>

                <div class="sidebar_option">
                    <StarBorderOutlinedIcon/>
                    <span>Starred</span>
                </div>

                <div class="sidebar_option">
                    <DeleteOutlineOutlinedIcon/>
                    <span>Trash</span>
                </div>

            </div>

            <hr/>

            <div className="sidebar_options">
                <div class="sidebar_option">
                    <CloudQueueIcon/>
                    <span>Storage</span>
                </div>

                <div className="progress_bar">
                    <progress size="tiny" value="50"  max="100"/>
                    <span>6.45 GB  of 15 GB used</span>
                </div>

                </div>
                </div>
                </>
  )
}

export default Sidebar
