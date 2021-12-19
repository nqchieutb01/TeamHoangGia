import React from "react";
import Loading from "./Loading";
import { useParams, Link } from "react-router-dom";
import "../index.css";
import BasicRating from "../components/Rating";
import SERVICE from "../services/tour.service";
import PostCommentBox from "../components/PostCommentBox";
import CommentList from "../components/CommentList";

export default function SingleCocktail() {
  // get data
  //const { id } = useParams();
  const id = 4;
  // console.log(id)
  const [loading, setLoading] = React.useState(false);
  const [tourData, setTourData] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getTour() {
      try {
        const res = await SERVICE.getTourId(id);
        const tourDetail = await res.data[0];
        const allComment = await SERVICE.getAllComments(id);

        const { name, star: rating, price, description } = tourDetail.tour;
        const listLocation = tourDetail.location;
        const image = tourDetail.location[0].image;
        const comment = allComment.data;

        const newData = {
          name,
          image,
          rating,
          price,
          description,
          listLocation,
          comment,
        };

        setTourData(newData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getTour();
  }, [id]);

  /* rendering */
  if (loading) {
    return <Loading />;
  }
  if (!tourData) {
    return <h2 className="section-title">no tour to display</h2>;
  } else {
    const { name, image, rating, price, description, listLocation, comment } =
      tourData;
    return (
      <section className="section cocktail-section" style={{ marginTop: 50 }}>
        <div className="drink">
          <img src={image} alt={name} style={{ top: 0, position: "sticky" }}></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">Name :</span> {name}
            </p>
            <p>
              <span className="drink-data">Rating :</span>
              <BasicRating default={rating}></BasicRating>
            </p>
            <p>
              <span className="drink-data">Price :</span> {price}
            </p>
            <p>
              <span className="drink-data">List location: </span>

              {listLocation.map((item) => {
                return item ? (
                  <>
                    <Link to={`/location/` + item.location.id}>
                      {item.location.name}
                    </Link>
                    <>{",   "}</>
                  </>
                ) : null;
              })}
            </p>

            <p>
              <span className="drink-data">Description </span>
              {description}
            </p>
            <p>
              <div className="drink-data">Comment: </div>
              <br></br>
              <PostCommentBox id={id} />
              <CommentList input={comment} />
            </p>
          </div>
        </div>
      </section>
    );
  }
}
