import React from "react";
import { useSelector } from "react-redux";
import CommentBox from "../components/CommentBox";

export default function CommentList(props) {
    const [comment, setComment] = React.useState(null);
    const { user: currentUser } = useSelector((state) => state.auth);

    React.useEffect(() => {
        setComment(props.input);
    }, []);

    return comment ? (
        currentUser ? (
            <>
                {comment.map((item, index) => {
                    return item.userid == currentUser.userId ||
                    currentUser.userId == 1 ? (
                        <CommentBox input={item} delete={true} />
                    ) : null;
                })}
                {comment.map((item, index) => {
                    return item.userid != currentUser.userId &&
                    currentUser.userId != 1 ? (
                        <CommentBox input={item} />
                    ) : null;
                })}
            </>
        ) : (
            <>
                {comment.map((item, index) => {
                    return item ? <CommentBox input={item} /> : null;
                })}
            </>
        )
    ) : null;
}