import React, { useState } from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";

const addTour = 'http://localhost:8080/tours/create'
const addLocations = 'http://localhost:8080/tours/add_locations'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
    name: null,
    price: null,
    description: null,
};

export default function DetailsCreateTour({userId, locationsInCart}) {
    const [values, setValues] = useState(initialValues);
    const [images, setImages] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    // console.log(locationsInCart)

    const handleClickOpen = () => {
        console.log("test submit")
        console.log(values)
        //setOpen(true);
    };

    const handleYes = () => {
        //addLocation()
        setOpen(false);
    };
    const handleNo = () => {
        setOpen(false);
    };
    const handleChange = (prop) => (event) => {
        console.log("test change")
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    return (
        <div className="form-outline">
            <h4>Name of Tour</h4>
            <input type="text" id="typeText" className="form-control" onChange={handleChange('name')} />
            <br/>
            <h4>Price <AttachMoneyIcon style={{color:"yellowgreen"}}/></h4>
            <input type="text" id="typeText" className="form-control" onChange={handleChange('price')}/>
            <br/>
            <h4>Description</h4>
            <textarea type="text" id="typeText" className="form-control" onChange={handleChange('description')} />
            <br/>

            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Submit
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
            </div>


        </div>
    );
}