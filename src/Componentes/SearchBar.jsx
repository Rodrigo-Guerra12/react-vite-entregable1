import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";
import classes from "./SearchBar.module.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [searchResults, setSearchResults] = useState(null);

  const itemsPerPage = 20; // Cantidad de resultados por página

  const handleSearch = async () => {
    // Construye la URL de búsqueda con los parámetros de consulta y paginación
    const apiUrl = `https://api.github.com/search/repositories?q=${searchTerm}&page=${currentPage}&per_page=${itemsPerPage}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `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 ${
            import.meta.env.REACT_APP_GITHUB_API_TOKEN
          }`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.items); // Almacena los resultados en el estado
      } else {
        console.error("Error en la solicitud");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    // Realiza la búsqueda al cargar la página y cada vez que cambia la página
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <div className={classes.contenido}>
        <div className={classes.searchbar}>
          <TextField
            className={classes.input1}
            type="text"
            placeholder="Buscar repositorios"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
        <SearchResults results={searchResults} />
        <div className={classes.pagination}>
          <footer>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <p>Pagina</p>
            {currentPage}
            <Button onClick={() => setCurrentPage(currentPage + 1)}>
              Siguiente
            </Button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
