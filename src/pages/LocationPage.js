import React, {useState, useEffect} from 'react'
import Loading from './Loading'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageUploading from "react-images-uploading";
import "../components/Tour_test.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Locations from "../components/Locations";
import SERVICE from "../services/location.service"

// const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LocationPage() {
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [images, setImages] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
        name: null,
        address: null,
        image: '',
        price: 0,
        timeOpen: null,
        timeClose: null,
        type: null,
    })

    // console.log('api :' , as.URL_BACKEND)
    const [check, setcheck] = React.useState({
        bool: false,
        message: null,
    });
    let checkRequired = false

    const handleClickOpen = () => {
        checkRequired = false
        required(values.type, "Type of Location Tour must be not null")
        required(values.timeClose, "TimeClose  of Location must be not null")
        required(values.timeOpen, "TimeOpen of Location must be not null")
        validPrice(values.price, "Price of Location must be >= 0")
        required(values.price, "Price of Location must be not null")
        required(values.address, "address of Location must be not null")
        required(values.name, "Name of Location must be not null")

        if (!checkRequired) {
            setOpen(true);

        }
    };

    const handleOk = () => {
        setcheck({bool: false});
    };
    const handleYes = () => {
        addLocation()
        setOpen(false);
    };
    const handleNo = () => {
        setOpen(false);
    };

    const onChange = (imageList, addUpdateIndex) => {
        // console.log(imageList, addUpdateIndex);
        // console.log(imageList[0]['data_url'])
        setImages(imageList);
    };

    const required = (value, message) => {
        if (!value) {
            checkRequired = true
            setOpen(false)
            setcheck({bool: true, message: message})
            // console.log(message)
        }
    }
    const validPrice = (value, message) => {
        if (value < 0) {
            checkRequired = true
            setOpen(false)
            setcheck({bool: true, message: message})
            // console.log(message)
        }
    }


    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const fetchLocations = async () => {
        setLoading(true)
        try {
            const data = await SERVICE.getAllLocations()
            setLoading(false)
            // console.log(data.data)
            setLocations(data.data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const addLocation = async () => {
        try {
            if (images.length > 0) {
                setValues({...values, image: images[0]['data_url']})
                values.image = images[0]['data_url']
            }
            // console.log(values)
            // await fetch(add_location, requestOptions)
            await SERVICE.addLocation(values)
            await fetchLocations()
            // setLocations([...locations,values])
            setImages([])
            // checkRequired = false
            // setcheck({bool:false,message: null})
            // setValues({
            //     name: null,
            //     address: null,
            //     image: '',
            //     price: 0,
            //     timeOpen: null,
            //     timeClose: null,
            //     type: null,
            // })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    if (loading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }
    // if (locations.length === 0) {
    //     return (
    //         <main>
    //             <div className='title'>
    //                 <h2>Chưa có Location nào</h2>
    //             </div>
    //         </main>
    //     )
    // }
    return (
        <>
            <div class="row_c">
                <div className='left_c' style={{marginTop: '1%'}}>
                    <h6>Add Location</h6>
                    <div className="underline"></div>
                    <div><TextField id="standard-basic" label={"Name"} variant="standard"
                                    onChange={handleChange('name')}/></div>
                    <div><TextField id="standard-basic" label={"Address"} variant="standard"
                                    onChange={handleChange('address')}/></div>
                    <div><TextField type="number" min="0" step={1000} id="standard-basic" label={"price"}
                                    variant="standard"
                                    onChange={handleChange('price')}/></div>

                    <div><TextField id="standard-basic" label={"TimeOpen"} variant="standard"
                                    onChange={handleChange('timeOpen')}/></div>
                    <div><TextField id="standard-basic" label={"TimeClose"} variant="standard"
                                    onChange={handleChange('timeClose')}/></div>
                    <div><TextField id="standard-basic" label={"Type"} variant="standard"
                                    onChange={handleChange('type')}/></div>
                    <br/>

                    <h6>Upload Image</h6>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        // maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              // onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps
                          }) => (
                            // write your building UI
                            <div className="">
                                <Button
                                    style={isDragging ? {color: "red"} : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </Button>
                                &nbsp;
                                <br/>
                                {/*<Button onClick={onImageRemoveAll}>Remove all images</Button>*/}
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image["data_url"]} alt="" width="100"/>
                                        <div className="image-item__btn-wrapper">
                                            <Button style={{color: 'red'}} className="delete-btn"
                                                    onClick={() => onImageUpdate(index)}>Update</Button>
                                            <Button style={{color: 'red'}} className="delete-btn"
                                                    onClick={() => onImageRemove(index)}>Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                    <br/>

                    <div>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add Location
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
                    <main className='main-tour'>
                        <Locations locations={locations}></Locations>
                    </main>

                </div>
            </div>
        </>
    )
}