import * as React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import SERVICE from '../services/user.service'
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

export default function User() {

    const [users,setUsers] = useState([])
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [currentID,setCurrentID] = React.useState(-1);
    const editState = {
        id:null,
        fistname: null ,
        lastname :null ,
        phonenumber : null ,
    }
    useEffect( ()=>{
        SERVICE.getAllUsers().then((res)=>{
            setUsers(res.data)
            // console.log(res.data)
        }).catch((e)=>console.log(e))
        return ()=>{
            setUsers([])
        }
    },[])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = () => {
        if (currentID !== 1) {
            SERVICE.deleteUser(currentID).then().catch((e)=>console.log(e))
            setUsers([...users.filter((user)=>user.id!==currentID)])
        }
        setOpen(false);
    };
    const handleNo = () => {
        setOpen(false);
    };

    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleClick = ()=>{
        const id = Object.keys(editRowsModel)[0]
        if (typeof id === 'undefined'){
            return
        }
        const data = editRowsModel[id]
        editState.id = id ;
        editState.firstname = data.firstname.value
        editState.lastname = data.lastname.value
        editState.phonenumber = data.phonenumber.value
        SERVICE.editUser(editState).then().catch((e)=>console.log(e))
    }

    const handleDeleteUser = (id)=>{
        setCurrentID(id)
        handleClickOpen()
    }

    const [open, setOpen] = React.useState(false);
    const columns = [
        {field: 'id',headerName: 'Delete',width: 100,
            renderCell: (params) => (
                <strong>
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
        {field: 'username', headerName: 'username', width: 120, editable: true},
        {field: 'firstname', headerName: 'Họ', width: 120, editable: true},
        // {field: 'password', headerName: 'Password', width: 180, editable: true},
        {field: 'lastname', headerName: 'Tên', editable: true},
        {field: 'phonenumber', headerName: 'SĐT', type: 'number', editable: true},
        {field: 'role', headerName: 'Role'},
        {field: 'createdAt', headerName: 'CreatedAt', type: 'date', width: 120, editable: true,},
        {field: 'updatedAt', headerName: 'UpdatedAt', type: 'dateTime', width: 120, editable: true,},
    ];

    return (
        <div style={{width: '100%'}}>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    editMode="row"
                    onEditRowsModelChange={handleEditRowsModelChange}
                    components={{
                        Toolbar: CustomToolbar,
                    }}

                />
            </div>
            <Button onClick={handleClick} variant="contained" style={{background:'red'}}>Chỉnh sửa</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleNo}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn có chắc chắn muốn thay đổi không ?
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