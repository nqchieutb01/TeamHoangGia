import * as React from 'react';
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
    const {data} = useDemoData({
        dataSet: 'Commodity',
        rowLength: 10,
        maxColumns: 6,
    });
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [currentID,setCurrentID] = React.useState(-1);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = () => {
        console.log(currentID)
        setOpen(false);
    };
    const handleNo = () => {
        setOpen(false);
    };
    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
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
                            Delete {params.value}
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
            )},
        {field: 'name', headerName: 'Name', width: 180, editable: true
        },
        {field: 'age', headerName: 'Age', type: 'number', editable: true},
        {
            field: 'dateCreated',
            headerName: 'Date Created',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'lastLogin',
            headerName: 'Last Login',
            type: 'dateTime',
            width: 220,
            editable: true,
        },
    ];

    return (
        <div style={{width: '100%'}}>
            <Alert severity="info" style={{marginBottom: 8}}>
                <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
            </Alert>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={rows}
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