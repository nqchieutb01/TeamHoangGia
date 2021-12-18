import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack';
import "../index.css"
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import default_img from "../img/default.jpeg"

export default function Tour({id, listImage, name, price, star, description, createdAt, updatedAt}) {
    // console.log(id)

    return (
        <article className='cocktail'>
            <div className='img-container'>
                {/*<img src={image} alt={name} />*/}
                <Slide>
                    {listImage.map((slideImage, index) => (
                        <div className="each-slide" key={index}>
                            <img src={slideImage} alt={name}/>
                        </div>
                    ))}
                </Slide>
            </div>
            <br/>

            <div>
                <Stack direction="row" spacing={2}>
                    <Avatar>{id}</Avatar>
                    <h6 style={{textAlign: "left", letterSpacing: "0.05rem"}}>
                        Chieunq
                        <br/> {new Date(createdAt).toDateString()}
                    </h6>
                </Stack>
            </div>

            <div className='cocktail-footer'>
                <h4 className="tour-price">Giá: {price} VNĐ</h4>
                <h6 style={{letterSpacing: "0.05rem"}}>Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.{description}</h6>

                <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
                    Chi tiết
                </Link>

            </div>

        </article>
    )
}
