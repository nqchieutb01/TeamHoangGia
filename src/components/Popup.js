import React from "react";
import { Link, useParams } from "react-router-dom";
import "../css/share/index.css";
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
  
export default function Popup(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Link onClick={handleOpen}>{props.item.location.name}</Link>
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
              <h2 className="section_c-title">{props.item.location.name}</h2>
              <div className="drink">
                <img
                  src={props.item.image}
                  alt={props.item.location.name}
                  style={{ objectFit: "fill" }}
                />
                <div className="drink-info">
                  <p style={{ textAlign: "left" }}>
                    <span className="drink-data">Tên : </span>{" "}
                    {props.item.location.name}
                  </p>
                  <p style={{ textAlign: "left" }}>
                    <span className="drink-data">Địa chỉ :</span>{" "}
                    {props.item.location.address}
                  </p>

                  <p style={{ textAlign: "left" }}>
                    <span className="drink-data">Giá :</span>{" "}
                    {props.item.location.price} VNĐ
                  </p>
                  <p style={{ textAlign: "left" }}>
                    <span className="drink-data">Thời gian mở cửa :</span>{" "}
                    {props.item.location.timeOpen}h
                  </p>
                  <p style={{ textAlign: "left" }}>
                    <span className="drink-data">Thời gian đóng cửa :</span>{" "}
                    {props.item.location.timeClose}h
                  </p>
                  <p style={{ textAlign: "left" }}>
                    <span className="drink-data">Mô tả :</span>{" "}
                    {props.item.location.description + " "}
                  </p>
                </div>
              </div>
            </section>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
