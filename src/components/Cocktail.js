import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "../index.css"
import {useGlobalContext} from "../context";
import Button from "@mui/material/Button";
import ModalCocktail from "./ModalCocktail";
import Modal from "./Modal_test";
export default function Cocktail({ image, name, id, info, glass }) {
    // console.log(id)
    return (
    <article className='cocktail'>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>

        <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
          details
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
