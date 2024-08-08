import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchRepos } from "../redux/repoSlice";
import { Button, TextField } from "@mui/material";
import styles from "../styles/SearchBar.module.scss";

/**
 * Компонент для поиска репозиториев.
 */
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Обработчик клика на кнопку поиска.
   */
  const handleSearch = () => {
    dispatch(fetchRepos(query));
  };

  return (
    <div className={styles.fieldContainer}>
      <TextField
        sx={{ width: 900, background: "#fff", borderRadius: 1 }}
        variant="outlined"
        placeholder="Поиск репозиториев"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth // Растягивает поле ввода до кнопки
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Найти
      </Button>
    </div>
  );
};

export default SearchBar;
