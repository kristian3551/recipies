import React from 'react';
import styles from './index.module.css';

const Comment = ({ comment }) => {

    const date = new Date(comment.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const days = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (<div className={styles["new_comment"]}>
    <ul className={styles["user_comment"]}>

             
             <div className={styles["comment_body"]}>
                 <p>{comment.content}</p>
             </div>

             
             <div className={styles["comment_toolbar"]}>

                 
                 <div className={styles["comment_details"]}>
                     <ul>
                         <li style={{color: 'black'}}><i className="fa fa-clock-o" style={{color: 'black'}}></i> {hours}:{minutes}</li>
                         <li style={{color: 'black'}}><i className="fa fa-calendar"></i>{days}/{month}/{year}</li>
                         <li style={{color: 'black'}}><i className="fa fa-pencil"></i> <span className="user">{comment.author}</span></li>
                     </ul>
                 </div>
                </div>
        </ul>
        </div>);
}

export default Comment;