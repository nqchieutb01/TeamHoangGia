import React from 'react'
import {useGlobalContext} from '../context'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchV1() {
    const {initValue, search, setSearch} = useGlobalContext()
    const {isClick, setIsClick} = useGlobalContext()
    const handleChange = (prop) => (event) => {
        setSearch({...search, [prop]: event.target.value});
    };

    function handleSubmit(e) {
        setIsClick(!isClick)
        e.preventDefault()
    }

    const handleDeleteFilter = () => {
        setSearch(initValue)
        setIsClick(!isClick)
    }

    return (
        <>
            <form className='grocery_c-form' onSubmit={handleSubmit}>
                <h3><SearchIcon/> Tìm kiếm</h3>
                <div className={"underline"}></div>
                <br/>
                <div className='form-control_c'>
                    <input
                        type='text'
                        className='grocery_c'
                        placeholder="Tên"
                        value={search.name}
                        onChange={handleChange('name')}
                    />
                </div>
                <br/>
                <h6>Địa điểm</h6>
                <div className='form-control_c'>
                    <input
                        type='text'
                        className='grocery_c'
                        placeholder="Địa điểm"
                        value={search.location}
                        onChange={handleChange('locationName')}
                    />
                </div>
                <br/>
                <h6>Giá </h6>

                <div className='form-control_c'>
                    <input
                        type='number'
                        min="0"
                        step={100000}
                        className='grocery_c'
                        placeholder="Giá nhỏ nhất"
                        value={search.minPrice}
                        onChange={handleChange('priceMin')}
                    />
                </div>
                <br/>
                <div className='form-control_c'>
                    <input
                        type='number'
                        min="0"
                        step={100000}
                        className='grocery_c'
                        placeholder="Giá lớn nhất"
                        value={search.maxPrice}
                        onChange={handleChange('priceMax')}
                    />
                </div>
                <br/>
                <div>
                    <h6>Đánh giá </h6>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <FormControl sx={{m: 1, width: '100%'}} style={{width: '80%'}}>
                        <InputLabel id="demo-simple-select-helper-label">Sao</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={search.rating}
                            label="Age"
                            onChange={handleChange('rating')}
                        >
                            <MenuItem value={4}>Rất Tốt</MenuItem>
                            <MenuItem value={3}>Tốt</MenuItem>
                            <MenuItem value={2}>Bình Thường</MenuItem>
                            <MenuItem value={1}>Tệ</MenuItem>
                            <MenuItem value={0}>Rất Tệ</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <br/>
                <Button variant="outlined" color="error" onClick={handleDeleteFilter} style={{marginRight: '10%'}}>
                    Xóa bộ lọc
                </Button>
                <Button variant="contained" onClick={handleSubmit} style={{width: '30%'}}>
                    Tìm
                </Button>
            </form>
        </>
    )
}
