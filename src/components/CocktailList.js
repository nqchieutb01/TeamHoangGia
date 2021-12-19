import React from "react";
import Cocktail from "./Cocktail";
import Loading from "../pages/Loading";
import { useGlobalContext } from "../context";
import SERVICE from "../services/tour.service";

// import "../cloneIndex.css"
import "../index.css";

export default function CocktailList() {
  const { cocktails, loading } = useGlobalContext();

  const getData = async () => {
    const res = await SERVICE.getAllTour();
    const allTour = res.data;

    console.log(allTour);
  }

  getData();

  if (loading) {
    return <Loading />;
  }
  if (cocktails.length < 1) {
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    );
  }
  return (
    <section className="section">
      <div className="cocktails-center">
        {cocktails.map((item) => {
          {
            console.log(item);
          }
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
