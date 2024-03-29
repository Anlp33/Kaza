import React from "react";
import Gallery from "../components/Gallery";
import Rating from "../components/Rating";
import Dropdown from "../components/Dropdown";
import "../styles/dropdown.css";
import "../styles/rent.css";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function Rent() {
  const params = useParams();

  const [dataRent, setData] = useState("");

  

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.find((location) => location.id === params.cardId));
      });
  }, [params.cardId]);

  console.log(dataRent)
  
  if (dataRent === undefined) {
    return <Navigate to="*"></Navigate>;
  }

  return (
    <div>
      {dataRent && <Gallery pictures={dataRent.pictures} />}
      <div className="rent-info">
        <div className="rent-info-leftCorner">
          {dataRent && <h2>{dataRent.title}</h2>}
          {dataRent && <p>{dataRent.location}</p>}
          {dataRent && (
            <ul className="tags">
              {dataRent.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="rent-info-rightCorner">
          <div className="host">
            <div className="host-details">
              {dataRent && <h2>{dataRent.host.name}</h2>}

              {dataRent && (
                <img src={dataRent.host.picture} alt="host profile" />
              )}
            </div>
            {dataRent && <Rating rating={dataRent.rating} />}
          </div>
        </div>
      </div>
      <div className="dropdown-Rent">
        <div id="dropdownRent-title">
          {dataRent && (
            <Dropdown title="Description" text={dataRent.description} />
          )}
        </div>
        <div id="dropdownRent-text">
          {dataRent && (
            <Dropdown
              title="Equipements"
              text={dataRent.equipments.map((equipment, index) => (
                <li key={`${equipment}-${index}`}>{equipment}</li>
              ))}
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
}
