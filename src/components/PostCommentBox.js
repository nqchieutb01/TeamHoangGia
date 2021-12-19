import React from "react";
import CommentBox from "../components/CommentBox";
import { useSelector } from "react-redux";

export default function PostCommentBox(props) {
    const { user: currentUser } = useSelector((state) => state.auth);

    return currentUser ? (
        <><CommentBox input={currentUser} type="edit" tour={props.id} /></>

    ) : null;
}