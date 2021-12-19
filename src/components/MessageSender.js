import PersonIcon from '@mui/icons-material/Person';
import React, {useRef, useState} from 'react' ;
import "../css/MessageSender.css" ;
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';



function MessageSender() {
    // const [{ user }, dispatch] = useGlobalContext();\
    const user = {'displayName':'Chieu' , 'photoURL' :'https://i.imgur.com/0eg0aG0.jpg'}
    const [input, setInput] = useState("")
    const [isActive, setActive] = useState(false);
    const [imageUrl, setImageUrl] = useState("")
    const ref = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();

        // db.collection("posts").add({
        //     message: input,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp() ,
        //     profilePic: user.photoURL,
        //     username: user.displayName,
        //     image: imageUrl,
        // })

        setInput("")
        setImageUrl("https://i.imgur.com/0eg0aG0.jpg")
    }


    return (
        <div className="messageSender">
            <div className="messageSender__top">
                <PersonIcon src={user.photoURL} />
                <form >
                    <input
                        style={{ height: isActive ? '100px' : '50px' }} onFocus={() => setActive(true)} onBlur={() => setActive(false)}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="messageSender__input"
                        placeholder={`What's on your mind ?, ${user.displayName}`} />
                    <input
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="image URL (Optional)" />
                    {
                        isActive ? (<Button variant="contained" endIcon={<SendIcon />}>
                            Submit
                        </Button>) : <></>
                    }
                </form>

            </div>

            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>

                <div className="messageSender__option">
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <h3>Photo/Video</h3>
                </div>

                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>


        </div>
    )
}

export default MessageSender