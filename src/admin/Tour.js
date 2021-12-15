import * as React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import SERVICE from '../services/tour.service'
import Alert from '@mui/material/Alert';
import {Button} from "@mui/material";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useCallback, useEffect, useState} from "react";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Tour() {

    const [tours,setTours] = useState([])
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [currentID,setCurrentID] = React.useState(-1);

    useEffect( ()=>{
        SERVICE.getAllTour().then((res)=>{
            setTours(res.data)
            // console.log("anh ban ",res.data)
            // console.log("anh ban ",users)
        }).catch((e)=>console.log(e))
    },[])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = () => {
        console.log(currentID)
        // Không cho phép xóa admin
        setTours([...tours.filter((user)=>user.id!==currentID)])
        setOpen(false);
    };
    const handleNo = () => {
        setOpen(false);
    };

    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
        // console.log(users)
    }, []);

    const handleClick = ()=>{
        console.log(editRowsModel)
    }

    const handleDeleteUser = (id)=>{
        // console.log(id)
        setCurrentID(id)
        handleClickOpen()
    }

    const [open, setOpen] = React.useState(false);
    const columns = [
        {field: 'id',headerName: 'Delete',width: 100,
            renderCell: (params) => (
                <strong>
                    {/*{params.value}*/}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 0 , background:'red'}}
                            onClick={()=>handleDeleteUser(params.value)}
                        >
                            <DeleteForeverIcon/> ID = {params.value}
                        </Button>

                    </div>
                </strong>
            )},
        {field: 'name', headerName: 'Name', width: 180, editable: true},
        {field: 'description', headerName: 'description', width: 180, editable: true},
        // {field: 'password', headerName: 'Password', width: 180, editable: true},
        {field: 'price', headerName: 'price', editable: true},
        {field: 'star', headerName: 'star', type: 'number', editable: true},
        {field: 'createdAt', headerName: 'CreatedAt', type: 'date', width: 180, editable: true,},
        {field: 'updatedAt', headerName: 'UpdatedAt', type: 'dateTime', width: 180, editable: true,},
        {field: 'Userid', headerName: 'Userid',  width: 180, editable: true,},
    ];

    return (
        <div style={{width: '100%'}}>
            <Alert severity="info" style={{marginBottom: 8}}>
                <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
            </Alert>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={tours}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    editMode="row"
                    onEditRowsModelChange={handleEditRowsModelChange}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
            <Button onClick={handleClick}>Test</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleNo}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn có chắc chắn muốn xóa không ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>Không</Button>
                    <Button onClick={handleYes}>Có</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}