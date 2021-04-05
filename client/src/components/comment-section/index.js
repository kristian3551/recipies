import React, { useState, useContext } from 'react';
import './index.css';
import Comment from '../comment';
import AuthContext from '../../AuthContext';
import { useHistory } from 'react-router-dom';

const CommentSection = ({ comments, id }) => {
    const [content, setContent] = useState('');
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const renderComments = () => {
        return [...comments].map((e,i) => {
            return <Comment key={i} comment={e}/>
        })
    }
    
    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const submitCommentHandler = async () => {
        console.log(user.username, content);
        if(content.length < 8) return;
        const promise = await fetch(`http://localhost:8000/api/recipe/${id}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content, author: user.username
            })
        });
        console.log(promise);
        window.location.reload(false);
    }
    return (<div className="comment_block">
        
        <div className="create_new_comment">
            <div className="input_comment">
                <input type="text" placeholder="Join the conversation.." onChange={handleChange}/>
                <button type="button" className="btn btn-outline-light" style={{float: 'right'}}
                onClick={submitCommentHandler}>Submit comment</button>
            </div>
            
        </div>
        
        {renderComments()}

        {/* <div class="new_comment">
        <ul class="user_comment">

		 		
			 	<div class="comment_body">
			 		<p>Gastropub cardigan jean shorts, kogi Godard PBRB lo-fi locavore. Organic chillwave vinyl Neutra. Bushwick Helvetica cred freegan, crucifix Godard craft beer deep v mixtape cornhole Truffaut master cleanse pour-over Odd Future beard. Portland polaroid iPhone.</p>
			 	</div>

			 	
			 	<div class="comment_toolbar">

			 		
			 		<div class="comment_details">
			 			<ul>
			 				<li style={{color: 'black'}}><i class="fa fa-clock-o" style={{color: 'black'}}></i> 13:94</li>
			 				<li style={{color: 'black'}}><i class="fa fa-calendar"></i>04/01/2015</li>
			 				<li style={{color: 'black'}}><i class="fa fa-pencil"></i> <span class="user">John Smith</span></li>
			 			</ul>
			 		</div>
                    </div>
            </ul>
            </div> */}

    </div>);
}

export default CommentSection;