import React, { useState } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Login.css"
import TourService from "../services/tour.service"
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DetailsCreateTour({userId, locationsInCart }) {
    // console.log(currentUser)
    const initialValues = {
        name: null,
        price: null,
        description: null,
    };
    const [values, setValues] = useState(initialValues);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [check, setCheck] = React.useState({
        bool: false,
        message: null,
    });

    let checkRequired = false

    const handleClickOpen = () => {
        // console.log("test submit")
        checkRequired = false
        required(values.description, "Description of Tour must be not null")
        validPrice(values.price,"Price  of Tour must be number" )
        required(values.price, "Price  of Tour must be not null")
        required(values.name, "Name of Tour must be not null")

        if (!checkRequired) {
            setOpen(true);
        }
    };
    const handleOk = () => {
        setCheck({bool: false});
    };

    const handleYes = () => {
        addTour()
        setOpen(false);
    };

    const handleNo = () => {
        setOpen(false);
    };
    const handleChange = (prop) => (event) => {
        //console.log("test change")
        setValues({...values, [prop]: event.target.value});
        //console.log(values)
    };
    const validPrice = (value, message) => {
        //console.log(value)
        //let xx = value.toNumber
        //console.log(typeof xx)

    }

    const required = (value, message) => {
        if (!value) {
            checkRequired = true
            setOpen(false)
            setCheck({bool: true, message: message})
            // console.log(message)
        }
    }
    const handleClick = () => {
        setOpenSuccess(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
    };

    const addTour = async () => {
        let tmp = await TourService.createTour(values, locationsInCart)
        tmp = tmp.data
        const xx = locationsInCart.map((ss) => ss.id)
        const req = {tourId: tmp.tourId, locations: xx}
        await TourService.addLoction(req)
        handleClick()
        window.location.reload();
    }


    return (
        <div className="form-outline">
            <h4>Tên của Tour</h4>
            <input
                type="text"
                id="typeText"
                className="form-control"
                onChange={handleChange('name')}
            />

            <br/>
            <h4>Giá <AttachMoneyIcon style={{color:"yellowgreen"}}/></h4>
            <input type="number" min="0" step={100000} id="typeText" className="form-control" onChange={handleChange('price')}/>
            <br/>
            <h4>Mô tả</h4>
            <textarea type="text" id="typeText" className="form-control" onChange={handleChange('description')} />
            <br/>

            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Thêm
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
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '150%'}}>
                       Thành Công!
                    </Alert>
                </Snackbar>
            </div>


        </div>
    );
}