import * as React from 'react';
import SERVICE from "../services/location.service";

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
} from '@mui/x-data-grid-generator';

import {useDemoData} from '@mui/x-data-grid-generator';
import Alert from '@mui/material/Alert';
import {Button} from "@mui/material";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";

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

    useEffect(() => {

        SERVICE.getAllLocations().then(
            (res) => {
                setLocations(res.data)
            }
        ).catch((e) => console.log(e))

    }, [])

    const [editRowsModel, setEditRowsModel] = React.useState({});
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = async () => {
        console.log(currentLocationID)
        setLocations(locations.filter((location)=>location.id !== currentLocationID))
        await SERVICE.deleteLocation(currentLocationID)
        setOpen(false);
    };

    const handleNo = () => {
        setOpen(false);
    };
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleClick = () => {
        console.log(editRowsModel)
    }

    const handleDeleteLocation = (id) => {
        setCurrentLocationID(id)
        handleClickOpen()
        // console.log(id)
    }

    const columns = [
        {
            field: 'id', headerName: 'Delete', width: 100,
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
                            Delete
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
                                    Bạn có chắc chắn muốn xóa không ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleNo}>Không</Button>
                                <Button onClick={handleYes}>Có</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </strong>
            )
        },
        {field: 'name', headerName: 'Name', width: 180, editable: true},
        {field: 'address', headerName: 'Address', editable: true},
        {field: 'image', headerName: 'image', width: 120, editable: true,},
        {field: 'priceMinPerPerson', headerName: 'priceMinPerPerson', type: 'number', width: 120, editable: true,},
        {field: 'priceMaxPerPerson', headerName: 'priceMaxPerPerson', type: 'dateTime', width: 120, editable: true,},
        {field: 'timeOpen', headerName: 'timeOpen', width: 120, editable: true,},
        {field: 'timeClose', headerName: 'timeClose', width: 120, editable: true,},
        {field: 'createdAt', headerName: 'createdAt', width: 120, editable: true,},
        {field: 'updatedAt', headerName: 'updatedAt', width: 120, editable: true,},
    ];

    return (
        <div style={{width: '100%'}}>
            <Alert severity="info" style={{marginBottom: 8}}>
                <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
            </Alert>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={locations}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
            <Button onClick={handleClick}>Test</Button>
        </div>
    );
}

const rows = [
    {
        id: 1,
        name: randomTraderName(),
        age: 25,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 2,
        name: randomTraderName(),
        age: 36,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 3,
        name: randomTraderName(),
        age: 19,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 4,
        name: randomTraderName(),
        age: 28,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: 5,
        name: randomTraderName(),
        age: 23,
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
];