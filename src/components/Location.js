import React  from 'react';
import "../css/Tour.css"
import "../css/share/index.css"
import default_img from "../img/default.jpeg"
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckIcon from '@mui/icons-material/Check';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import InfoIcon from '@mui/icons-material/Info';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
};
export default function Location ({ id, name, address,description ,image, price, timeOpen, timeClose, removeLocation,inCart}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    if (removeLocation) {
        return (
            <article className='single-tour'>
                <div className='img-container'>
                    {
                        // (image !== null) ?
                            <img src={image} alt={name} style={{objectFit: "fill"}}/>
                        // :<img src={default_img} alt={name} style={{objectFit: "fill"}}/>
                    }
                </div>
                <div className='cocktail-footer'>
                    <h3>{name}</h3>
                    <h4>{address}</h4>
                    <h4 className="tour-price">Giá: {price.toLocaleString()} VNĐ</h4>
                    <div>
                        <button onClick={handleOpen} className={"btn btn-primary btn-details"} style={{color:'white' , backgroundColor:'blue'}}><InfoIcon/> Chi tiết</button>
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
                                    <section className='cocktail-section'>
                                        <h2 className='section_c-title'>{name}</h2>
                                        <div className='drink'>
                                            {
                                                (image !== null) ? <img src={image} alt={name} style={{objectFit: "fill"}}/> :
                                                    <img src={default_img} alt={name} style={{objectFit: "fill"}} />
                                            }
                                            <div className='drink-info'>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Tên : </span> {name}
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Địa chỉ :</span> {address}
                                                </p >

                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Giá :</span> {price} VNĐ
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Thời gian mở cửa :</span> {timeOpen}h
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Thời gian đóng cửa :</span> {timeClose}h
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Mô tả :</span> {description+" "}
                                                </p >
                                            </div>
                                        </div>
                                    </section>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>
                    {
                        (inCart===false) ?  (<button className="delete-btn" onClick={() => removeLocation(id)}>
                            Thêm vào Tour
                            <AddCircleIcon style={{marginLeft: "15px"}}/>
                        </button>) : (
                            <div style={{color:'#7CFC00'}}> <h6>Đã thêm <CheckIcon/></h6>
                            </div>
                        )
                    }

                </div>
            </article>
        );
    }
    else {
        return (
            <article className='single-tour'>
                <div className='img-container'>
                    {
                        // (image !== null) ?
                            <img src={image} alt={name} style={{objectFit: "fill"}}/>
                            // : <img src={default_img} alt={name} style={{objectFit: "fill"}} />
                    }
                </div>
                <div className='cocktail-footer'>
                    <h3>{name}</h3>
                    <h4>{address}</h4>
                    <h4 className="tour-price">Giá: {price.toLocaleString()} VNĐ</h4>

                    <div>
                        <button onClick={handleOpen} className={"btn btn-primary btn-details"} style={{color:'white' , backgroundColor:'blue'}}><InfoIcon/> Chi tiết</button>
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
                                    <section className='cocktail-section'>
                                        <br/><br/><br/>
                                        <h2 className='section_c-title'>{name}</h2>
                                        <div className='drink'>
                                            {
                                                (image !== null) ? <img src={image} alt={name} style={{objectFit: "fill"}}/> :
                                                    <img src={default_img} alt={name} style={{objectFit: "fill"}} />
                                            }
                                            <div className='drink-info'>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Tên : </span> {name}
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Địa chỉ :</span> {address}
                                                </p >

                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Giá :</span> {price} VNĐ
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Thời gian mở cửa :</span> {timeOpen}h
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Thời gian đóng cửa :</span> {timeClose}h
                                                </p>
                                                <p style={{textAlign:'left'}}>
                                                    <span className='drink-data'>Mô tả :</span> {description+" "}
                                                </p >
                                            </div>
                                        </div>
                                    </section>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>

                </div>
            </article>
        );
    }
}