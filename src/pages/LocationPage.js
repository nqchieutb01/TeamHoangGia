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
import Location from "../components/Location";
import Locations from "../components/Locations";


//const url = 'http://localhost:8080/locations/'
const url = 'https://61af70223e2aba0017c49342.mockapi.io/getlocations'

const delete_location = 'http://localhost:8080/locations/delete/'
const add_location = 'http://localhost:8080/locations/add'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: 'Chieunq',
        address: 'Thái Bình',
        image: null,
        priceMinPerPerson: null,
        priceMaxPerPerson: null,
        timeOpen: null,
        timeClose: null,
        type: null
    })
};

export default function LocationPage() {
    const [loading, setLoading] = useState(true)
    const [locations, setLocations] = useState([])
    const [images, setImages] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [loadImg , setLoadImg] = useState(false)
    const [values, setValues] = useState({
        name: null,
        address: null,
        image: '',
        priceMinPerPerson: null,
        priceMaxPerPerson: null,
        timeOpen: null,
        timeClose: null,
        type: null,
    })

    const handleClickOpen = () => {
        setOpen(true);
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



    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const fetchTours = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const data = await response.json()
            setLoading(false)
            console.log(data)
            setLocations(data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    const addLocation = async () => {
        try {
            console.log('ass',images.length)
            if (images.length > 0){
                setValues({...values, image: images[0]['data_url']})
            }
            // console.log(images[0]['data_url'])
            values.image = images[0]['data_url']
            requestOptions.body = JSON.stringify(values)
            await fetch(add_location,requestOptions)
            fetchTours()
            // console.log(requestOptions)
        } catch (e) {
            console.log(e)
        }
    }

    async function deleteLocation(tour) {
        try {
            const res = await fetch(delete_location + tour.id, {method: "DELETE"})
            await fetchTours()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTours()
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
                    <div className="underline"></div>
                    <div><TextField id="standard-basic" label={"Name"} variant="standard"
                                    onChange={handleChange('name')}/></div>
                    <div><TextField id="standard-basic" label={"Address"} variant="standard"
                                    onChange={handleChange('address')}/></div>
                    <div><TextField id="standard-basic" label={"Image"} variant="standard"
                                    onChange={handleChange('image')}/></div>
                    <div><TextField id="standard-basic" label={"priceMinPerPerson"} variant="standard"
                                    onChange={handleChange('priceMinPerPerson')}/></div>
                    <div><TextField id="standard-basic" label={"priceMaxPerPerson"} variant="standard"
                                    onChange={handleChange('priceMaxPerPerson')}/></div>
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
                              onImageRemoveAll,
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
                                <Button onClick={onImageRemoveAll}>Remove all images</Button>
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
                    </div>
                </div>

                <div className='main_c' style={{background: 'white', marginTop: '1%'}}>
                    {/*{tours.map((tour) => {*/}
                    {/*    return <article className="single-tour">*/}
                    {/*        <h5>{tour.name}</h5>*/}
                    {/*        <Button onClick={() => deleteLocation(tour)}>Delete</Button>*/}
                    {/*        <img src={test_img}></img>*/}
                    {/*        /!*<DeleteIcon onClick={deleteLocation(tour.id)}/>*!/*/}
                    {/*    </article>*/}
                    {/*})}*/}
                    <main className='main-tour'>
                        <Locations locations={locations}></Locations>
                    </main>

                </div>
            </div>
        </>
    )
}