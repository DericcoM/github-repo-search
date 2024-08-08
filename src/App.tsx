import React from "react";
import { Container, Grid } from "@mui/material";
import SearchBar from "./components/SearchBar";
import RepoTable from "./components/RepoTable";
import RepoDetails from "./components/RepoDetails";
import styles from "./styles/App.module.scss";

/**
 * Основной компонент приложения.
 */
const App: React.FC = () => {
  return (
    <Container maxWidth={false} className={styles.container}>
      <Grid container spacing={1} className={styles.gridContainer}>
        <Grid item xs={14} className={styles.searchBarContainer}>
          <SearchBar />
        </Grid>
        <Grid item xs={8} className={styles.repoTableContainer}>
          <RepoTable />
        </Grid>
        <Grid item xs={4} className={styles.repoDetailsContainer}>
          <RepoDetails />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
