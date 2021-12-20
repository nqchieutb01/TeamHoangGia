import React, {useState, useEffect} from 'react'
import Loading from './Loading'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageUploading from "react-images-uploading";
import "../css/Tour.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Locations from "../components/Locations";
import SERVICE from "../services/location.service"
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@mui/material/Alert';
import IMG from '../imageDefault'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LocationPage() {
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [values, setValues] = useState({
        name: null,
        address: null,
        description:null,
        image: IMG.imageDefault,
        price: 0,
        timeOpen: null,
        timeClose: null,
        type: null,
    })

    const [check, setCheck] = React.useState({
        bool: false,
        message: null,
    });
    let checkRequired = false

    const handleClickOpen = () => {
        checkRequired = false
        required(values.description, "Vui lòng điền đủ thông tin")
        required(values.timeClose, "Vui lòng điền đủ thông tin")
        required(values.timeOpen, "Vui lòng điền đủ thông tin")
        validPrice(values.price, "Vui lòng điền đủ thông tin")
        required(values.price, "Vui lòng điền đủ thông tin")
        required(values.address, "Vui lòng điền đủ thông tin")
        required(values.name, "Vui lòng điền đủ thông tin")

        if (!checkRequired) {
            setOpen(true);
        }
    };

    const handleOk = () => {
        setCheck({bool: false});

    };
    const handleYes = async () => {
        await addLocation()
        setOpen(false);
        handleClick()
    };
    const handleNo = () => {
        setOpen(false);
    };

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const required = (value, message) => {
        if (!value) {
            checkRequired = true
            setOpen(false)
            setCheck({bool: true, message: message})
        }
    }
    const validPrice = (value, message) => {
        if (value < 0) {
            checkRequired = true
            setOpen(false)
            setCheck({bool: true, message: message})
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const addLocation = async () => {
        try {
            if (images.length > 0) {
                setValues({...values, image: images[0]['data_url']})
                values.image = images[0]['data_url']
                // console.log(values)
            }
            SERVICE.addLocation(values).then((res) => {
                console.log(res)
            }).catch((e) => console.log(e))
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setLoading(true)
        try {
            SERVICE.getAllLocations().then((res) => {
                setLocations(res.data)
                setLoading(false)
            }).catch((e) => console.log(e))
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }, [])

    if (loading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }
    const handleClick = () => {
        setOpenSuccess(true);
    };

    return (
        <>

            <div class="row_c">

                <div className='left_c' style={{marginTop: '1%'}}>

                    <h6>Thêm địa điểm</h6>
                    <div className="underline"></div>
                    <div><TextField label={"Tên"} variant="standard"
                                    onChange={handleChange('name')}/></div>
                    <div><TextField id="standard-basic" label={"Địa chỉ"} variant="standard"
                                    onChange={handleChange('address')}/></div>
                    <div><TextField id="standard-basic" label={"Mô tả"} variant="standard"
                                    onChange={handleChange('description')}/></div>
                    <div><TextField type="number" min="0" step={100000} id="standard-basic" label={"Giá"}
                                    variant="standard"
                                    onChange={handleChange('price')}/></div>

                    <div><TextField id="standard-basic" label={"Mở của"} variant="standard"
                                    onChange={handleChange('timeOpen')}/></div>
                    <div><TextField id="standard-basic" label={"Đóng cửa"} variant="standard"
                                    onChange={handleChange('timeClose')}/></div>
                    <div><TextField id="standard-basic" label={"Loại"} variant="standard"
                                    onChange={handleChange('type')}/></div>
                    <br/>

                    <h6>Tải ảnh</h6>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps
                          }) => (
                            <div className="">
                                <Button
                                    style={isDragging ? {color: "red"} : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Bấm hoặc thả tại đây !!
                                </Button>
                                &nbsp;
                                <br/>
                                {/*<Button onClick={onImageRemoveAll}>Remove all images</Button>*/}
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image["data_url"]} alt="" width="100"/>
                                        <div className="image-item__btn-wrapper">
                                            <Button style={{color: 'red'}} className="delete-btn"
                                                    onClick={() => onImageUpdate(index)}>Cập nhập</Button>
                                            <Button style={{color: 'red'}} className="delete-btn"
                                                    onClick={() => onImageRemove(index)}>Xóa</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                    <br/>

                    <div>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Thêm địa điểm
                        </Button>

                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleNo}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Bạn có chắc chắn muốn thêm không ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleNo}>Không</Button>
                                <Button onClick={handleYes}>Có</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={check.bool}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleNo}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    {check.message}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleOk}> OK </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>

                <div className='main_c' style={{background: 'white', marginTop: '1%'}}>
                    {
                        locations.length === 0 ? (
                            <main>
                                <div className='title'>
                                    <h2>Chưa có Location nào</h2>
                                </div>
                            </main>) : (
                            <main className='main-tour'>
                                <Locations locations={locations}></Locations>
                            </main>)
                    }
                </div>

                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '150%'}}>
                        Thành công!
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}