import * as React from 'react';
import {useEffect, useState} from 'react';
import SERVICE from "../services/location.service";

import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {Button} from "@mui/material";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

export default function Location() {
    const [locations, setLocations] = useState([])
    const [currentLocationID, setCurrentLocationID] = useState(-1);
    const [open, setOpen] = React.useState(false);
    const editState = {
        id: null,
        name: null,
        address: null,
        description: null,
        price: null,
        timeOpen: null,
        timeClose: null,
        type: null
    }
    useEffect(() => {

        SERVICE.getAllLocations().then(
            (res) => {
                setLocations(res.data)
                console.log(res.data)
                console.log(locations)
            }
        ).catch((e) => console.log(e))
        return () => {
            setLocations([])
        }
    }, [])

    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = async () => {
        console.log(currentLocationID)
        setLocations(locations.filter((location) => location.id !== currentLocationID))
        SERVICE.deleteLocation(currentLocationID).then().catch((e) => console.log(e))
        setOpen(false);
    };

    const handleNo = () => {
        setOpen(false);
    };
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleClick = () => {
        // console.log(editRowsModel)
        const id = Object.keys(editRowsModel)[0]
        if (typeof id === 'undefined') {
            return
        }
        const data = editRowsModel[id]
        editState.id = id;
        editState.name = data.name.value
        editState.address = data.address.value
        editState.description = data.description.value
        editState.price = data.price.value
        editState.timeOpen = data.timeOpen.value
        editState.timeClose = data.timeClose.value
        editState.type = data.type.value
        // console.log(editState)
        SERVICE.editLocation(editState).then().catch((e) => console.log(e))
    }

    const handleDeleteLocation = (id) => {
        setCurrentLocationID(id)
        handleClickOpen()
        // console.log(id)
    }

    const columns = [
        {
            field: 'id', headerName: 'Xóa', width: 100,
            renderCell: (params) => (
                <strong>
                    {/*{params.value}*/}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{marginLeft: 0, background: 'red'}}
                            onClick={() => handleDeleteLocation(params.value)}
                        >
                            <DeleteForeverIcon/> ID = {params.value}
                        </Button>

                    </div>
                </strong>
            )
        },
        {field: 'name', headerName: 'Tên', width: 120, editable: true},
        {field: 'address', headerName: 'Địa Chỉ', editable: true},
        {field: 'description', headerName: 'Mô tả', editable: true},
        {field: 'image', headerName: 'image', width: 120, editable: true,},
        {field: 'price', headerName: 'Giá', type: 'number', width: 120, editable: true,},
        {field: 'timeOpen', headerName: 'Mở cửa', width: 120, editable: true,},
        {field: 'timeClose', headerName: 'Đóng của', width: 120, editable: true,},
        {field: 'type', headerName: 'Loại', width: 120, editable: true,},
        {field: 'createdAt', headerName: 'createdAt', width: 120},
        {field: 'updatedAt', headerName: 'updatedAt', width: 120},
    ];

    return (
        <div style={{width: '100%'}}>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={locations}
                    columns={columns}
                    editMode="row"
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    getRowId={(row) => row.id}
                />
            </div>
            <Button onClick={handleClick} variant="contained" style={{background: 'red'}}>Chỉnh sửa</Button>
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
