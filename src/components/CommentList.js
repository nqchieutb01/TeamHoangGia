import React from "react";
import { useSelector } from "react-redux";
import CommentBox from "../components/CommentBox";

export default function CommentList(props) {
  const yolo = () => {
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
  };
  const [comment, setComment] = React.useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  React.useEffect(() => {
    setComment(props.input);
  }, []);

  if (comment) {
    if (props.own) {
      if (currentUser) {
        return (
          <>
            {comment.map((item, index) => {
              return item.userid == currentUser.userId ? (
                <CommentBox input={item} delete={true} />
              ) : null;
            })}
          </>
        );
      } else {
        return null;
      }
    } else {
      if (currentUser) {
        if (currentUser.userId === 1) {
          return (
            <>
              {comment.map((item, index) => {
                return item ? <CommentBox input={item} delete={true} /> : null;
              })}
            </>
          );
        } else {
          return (
            <>
              {comment.map((item, index) => {
                return item ? (
                  currentUser.userId == item.userid ? (
                    <CommentBox input={item} delete={true} />
                  ) : (
                    <CommentBox input={item} />
                  )
                ) : null;
              })}
            </>
          );
        }
      } else {
        return (
          <>
            {comment.map((item, index) => {
              return item ? <CommentBox input={item} /> : null;
            })}
          </>
        );
      }
    }
  } else {
    return null;
  }
}
