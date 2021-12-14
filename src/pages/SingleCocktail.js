import React from "react";
import Loading from "./Loading";
import { useParams, Link } from "react-router-dom";
import "../index.css";
import BasicRating from "../components/Rating";
import CommentBox from "../components/CommentBox";

export default function SingleCocktail() {
  // get data
  const { id } = useParams();
  // console.log(id)
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const { strDrinkThumb: image } = data.drinks[0];

          const newCocktail = {
            name: "Hai Phong tour",
            image,
            rating: 3,
            locationList: ["Thuy Nguyen", "Do Son", "Cat Ba"],
            comment: [
              {
                userId: "1",
                userName: "yolo",
                rating: "1",
                text: "toi rat thich",
              },
              {
                userId: "2",
                userName: "yolo",
                rating: "2",
                text: "toi rat thich",
              },
              {
                userId: "3",
                userName: "yolo",
                rating: "3",
                text: "toi rat thich",
              },
            ],
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  /* rendering */
  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const { name, image, rating, locationList, comment } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn_c btn_c-primary">
          back home
        </Link>

        <h2 className="section_c-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name}></img>
          <div className="drink-info">
            {console.log(cocktail)}
            <p>
              <span className="drink-data">Name :</span> {name}
            </p>
            <p>
              <span className="drink-data">Rating :</span>
              <BasicRating default={rating}></BasicRating>
            </p>
            <p>
              <span className="drink-data">List location: </span>

              {locationList.map((item, index) => {
                return item ? (
                  <>
                    <Link
                      to={`/location/1`}
                      className="btn btn-primary btn-details"
                      key={index}
                    >
                      {item}
                    </Link>
                  </>
                ) : null;
              })}
            </p>

            <p>
              <span className="drink-data">Description </span>
              A tour to Hai Phong
            </p>
            <p>
              <div className="drink-data">Comment: </div>
              <br></br>
              <CommentBox input={comment[0]} type="edit"></CommentBox>
              {comment.map((item, index) => {
                return item ? <CommentBox input={item}></CommentBox> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
