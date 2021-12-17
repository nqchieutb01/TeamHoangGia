import React, {useState, useEffect} from 'react'
import Loading from './Loading'
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import SERVICE from '../services/tour.service'

// const url = 'https://course-api.com/react-tours-project'

// Lấy tạm API để test xóa Tour
const url = 'http://localhost:8080/locations/'
const delete_tour = 'http://localhost:8080/locations/delete/'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function MyTour() {
    const [loading, setLoading] = useState(true)
    const [tours, setTours] = useState([])
    const [open, setOpen] = React.useState(false)
    const [deleteId , setDeleteId] = useState(-1)

    const handleClickOpen = (id) => {
        setDeleteId(id)
        setOpen(true);
    };

    const handleYes = async () => {
        // console.log(deleteId)
        await deleteTour()
        setOpen(false);
    };

    const handleNo = () => {
        setOpen(false);
    };

    const fetchTours = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const tours = await response.json()
            // console.log(tours)
            SERVICE.getTourId(1).then(
                (res)=> {
                    console.log(res)
                }
            )
            setLoading(false)
            setTours(tours)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const deleteTour = async ()=> {
        try {
            setOpen(true)
            console.log(deleteId)
            await fetch(delete_tour + deleteId, {method: "DELETE"})
            setTours([...tours.filter((tour)=>tour.id!==deleteId)])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(async () => {
        await fetchTours()
    }, [])

    if (loading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }
    if (tours.length === 0) {
        return (
            <main style={{marginTop:'10%'}}>
                <div className='title'>
                    <h2>Bạn chưa có tour nào , xin vui lòng tạo Tour</h2>
                </div>
            </main>
        )
    }
    return (
        <>
            <div className='main-tour'>
                {tours.map((tour) => {
                    return <article className="single-tour" key={tour.id}>
                        <h5>{tour.name}</h5>
                        <div>
                            <Button style={{color: 'red'}} onClick={()=>handleClickOpen(tour.id)}>Delete <DeleteIcon/></Button>
                        </div>
                    </article>
                })}
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleNo}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn có chắc chắn xóa Tour này không ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>Không</Button>
                    <Button onClick={handleYes}>Có</Button>
                </DialogActions>
            </Dialog>
        </>


    )
}
