import { useState } from "react";
import classes from "./SearchResults.module.css";
import PropTypes from "prop-types";

function SearchResults({ results }) {
  const [showDescription, setShowDescription] = useState(null);

  const toggleDescription = (index) => {
    setShowDescription(index === showDescription ? null : index);
  };

  return (
    <div>
      <ul>
        {results &&
          results.map((result, index) => (
            <>
              <div className={classes.cardcontent}>
                <img
                  className={classes.imgstyle}
                  src={result.owner.avatar_url}
                  alt={`Avatar de ${result.owner.login}`}
                  width="50"
                  height="50"
                />

                <li key={index} className={classes.li}>
                  <strong>Nombre del Repositorio:</strong> {result.name}
                  <br />
                  <br />
                  <br />
                  {showDescription === index ? (
                    <>
                      <div className={classes.descriptionstyle}>
                        <strong>Descripción:</strong> {result.description}{" "}
                        <strong>Fecha de creacion:</strong>
                        {result.created_at}
                        <strong>Estrellas:</strong> {result.stargazers_count}
                        <strong>Nombre de Usuario:</strong> {result.owner.login}
                      </div>
                      <br />
                    </>
                  ) : null}
                  <button
                    className={classes.btn1}
                    onClick={() => toggleDescription(index)}
                  >
                    {showDescription === index ? "Ocultar" : "Más"}
                  </button>
                </li>
              </div>
            </>
          ))}
      </ul>
    </div>
  );
}
SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
      name: PropTypes.string,
      description: PropTypes.string,
      created_at: PropTypes.string,
      stargazers_count: PropTypes.number,
    })
  ),
};

export default SearchResults;
