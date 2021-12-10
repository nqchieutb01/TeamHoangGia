import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {useGlobalContext} from "../context";
import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack';
import "../index.css"

export default function Cocktail({ image, name, id, info, glass }) {
    // console.log(id)
    return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <br/>

      <div>
        <Stack direction="row" spacing={2}>
          <Avatar>C</Avatar>
          <h6 style={{textAlign:"left" , letterSpacing:"0.05rem"}}>
            Chieunq
            <br/> 05/12/2021 - 19h:00
          </h6>
        </Stack>
      </div>

      <div className='cocktail-footer'>
        {/*<h3>{name}</h3>*/}
        <h4 className="tour-price">Price: $1000</h4>
        <h6 style={{letterSpacing: "0.05rem"}}>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</h6>
        {/*<h4>{glass}</h4>*/}
        {/*<p>{info}</p>*/}

        <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
          Details
        </Link>
          {/*{isModalOpen ? <Modal/> : <></>}*/}
          {/*{isModalOpen? <ModalCocktail id={id}/> : <></>}*/}
          {/*<Button variant="contained" color="primary" onClick={openModal}>*/}
          {/*    Modal*/}
          {/*</Button>*/}

      </div>

    </article>
  )
}
