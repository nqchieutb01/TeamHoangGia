import React from "react";
import Loading from "./Loading";
import {Link, useParams} from "react-router-dom";
import "../css/share/index.css";
import BasicRating from "../components/Rating";
import SERVICE from "../services/tour.service";
import PostCommentBox from "../components/PostCommentBox";
import CommentList from "../components/CommentList";
import {Slide} from "react-slideshow-image";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

export default function TourDetail() {
    const {id} = useParams();
    const [loading, setLoading] = React.useState(false);
    const [tourData, setTourData] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setLoading(true);

        async function getTour() {
            try {
                const res = await SERVICE.getTourId(id);
                const tourDetail = await res.data[0];
                const allComment = await SERVICE.getAllComments(id);

                const {name, star: rating, price, description} = tourDetail.tour;
                const listLocation = tourDetail.location;
                const comment = allComment.data;

                const listImage = tourDetail.location.map((item, index) => {
                    return item.image;
                });

                const newData = {
                    name,
                    listImage,
                    rating,
                    price,
                    description,
                    listLocation,
                    comment,
                };

                setTourData(newData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        getTour().catch((e) => console.log(e));
    }, [id]);

    /* rendering */
    if (loading) {
        return <Loading/>;
    }
    if (!tourData) {
        return <h2 className="section-title">Không có Tour để hiển thị</h2>;
    } else {
        const {
            name,
            listImage,
            rating,
            price,
            description,
            listLocation,
            comment,
        } = tourData;
        return (
            <section className="section cocktail-section" style={{marginTop: 50}}>
                <div className="row_d" style={{fontWeight: "bold"}}>
                    <div className="drink-info left_d">
                        <div className="img-container" style={{marginBottom: 10}}>
                            <Slide duration={1000} transitionDuration={2000}>
                                {listImage.map((slideImage, index) => (
                                    <div className="each-slide" key={index}>
                                        <img src={slideImage} alt={name}/>
                                    </div>
                                ))}
                            </Slide>
                        </div>
                        {/* <img src={image} alt={name} style={{ marginBottom: 10 }} /> */}
                        <p>
                            <span className="drink-data">Tên :</span> {name}
                        </p>
                        <p>
                            <span className="drink-data">Đánh giá :</span>
                            <BasicRating default={rating}></BasicRating>
                        </p>
                        <p>
                            <span className="drink-data">Giá :</span> {price.toLocaleString()} VNĐ
                        </p>
                        <p>
                            <span className="drink-data">Các địa điểm: </span>

                            {listLocation.map((item,index) => {
                                return item ? (
                                    <>
                                        <Link onClick={handleOpen}>
                                            {item.location.name}
                                        </Link>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={open}
                                            onClose={handleClose}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={open}>
                                                <Box sx={style}>
                                                    <section className="cocktail-section">
                                                        <h2 className="section_c-title">{name}</h2>
                                                        <div className="drink">
                                                            <img
                                                                src={item.image}
                                                                alt={item.location.name}
                                                                style={{objectFit: "fill"}}
                                                            />
                                                            <div className="drink-info">
                                                                <p style={{textAlign: "left"}}>
                                                                    <span className="drink-data">Tên : </span>{" "}
                                                                    {item.location.name}
                                                                </p>
                                                                <p style={{textAlign: "left"}}>
                                                                    <span className="drink-data">Địa chỉ :</span>{" "}
                                                                    {item.location.address}
                                                                </p>

                                                                <p style={{textAlign: "left"}}>
                                                                    <span className="drink-data">Giá :</span>{" "}
                                                                    {item.location.price} VNĐ
                                                                </p>
                                                                <p style={{textAlign: "left"}}>
                                  <span className="drink-data">
                                    Thời gian mở cửa :
                                  </span>{" "}
                                                                    {item.location.timeOpen}h
                                                                </p>
                                                                <p style={{textAlign: "left"}}>
                                  <span className="drink-data">
                                    Thời gian đóng cửa :
                                  </span>{" "}
                                                                    {item.location.timeClose}h
                                                                </p>
                                                                <p style={{textAlign: "left"}}>
                                                                    <span className="drink-data">Mô tả :</span>{" "}
                                                                    {item.location.description + " "}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </Box>
                                            </Fade>
                                        </Modal>
                                        {
                                            index !== listLocation.length-1 ? <>{",   "}</> : <></>
                                        }

                                    </>
                                ) : null;
                            })}
                        </p>

                        <p style={{textAlign: 'justify'}}>
                            <span className="drink-data">Giới thiệu :</span> <br/><br/>
                            {description}
                        </p>
                    </div>
                    <div className="right_d">
                        <p>
                            <div className="drink-data">Đánh giá của bạn:</div>
                            <br/>
                            <PostCommentBox id={id}/>
                            <CommentList input={comment} own={true}/>
                        </p>
                        <p>
                            <div className="drink-data">Tất cả đánh giá:</div>
                            <br/>
                            <CommentList input={comment}/>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}
