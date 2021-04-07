import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.css';
import Comment from '../comment';
import AuthContext from '../../AuthContext';
import { useHistory } from 'react-router-dom';

const CommentSection = ({ comments, id }) => {
    const [content, setContent] = useState('');
    const { user } = useContext(AuthContext);
    

    const renderComments = () => {
        return [...comments].map((e,i) => {
            return <Comment key={i} comment={e}/>
        })
    }
    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const submitCommentHandler = async () => {
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
        window.location.reload(false);
    }

    console.log(comments);

    return (<div className={styles["comment_block"]}>
        
        <div className={styles['create_new_comment']}>
            <div className={styles['input_comment']}>
                <input type="text" placeholder="Join the conversation.." onChange={handleChange}/>
                <button type="button" className="btn btn-outline-light" style={{float: 'right'}}
                onClick={submitCommentHandler}>Submit comment</button>
            </div>
            
        </div>

        {renderComments()}

    </div>);
}

export default CommentSection;