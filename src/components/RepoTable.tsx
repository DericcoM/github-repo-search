import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  setSortField,
  setSelectedRepo,
  setCurrentPage,
  setPageSize,
  sortAndPaginateRepos,
} from "../redux/repoSlice";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  dividerClasses,
} from "@mui/material";
import styles from "../styles/RepoTable.module.scss";

/**
 * Компонент для отображения таблицы репозиториев с пагинацией и сортировкой.
 */
const RepoTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, sortField, sortOrder, currentPage, pageSize } = useSelector(
    (state: RootState) => state.repos
  );

  /**
   * Обработчик изменения сортировки таблицы.
   * @param field Поле для сортировки.
   */
  const handleSort = (field: keyof (typeof repos)[0]) => {
    dispatch(setSortField(field));
    dispatch(sortAndPaginateRepos());
  };

  /**
   * Обработчик изменения страницы.
   * @param event Событие изменения страницы.
   * @param newPage Новая страница.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setCurrentPage(newPage + 1));
  };

  /**
   * Обработчик изменения количества строк на странице.
   * @param event Событие изменения количества строк.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPageSize(parseInt(event.target.value, 10)));
    dispatch(sortAndPaginateRepos());
  };

  // Вычисление индекса начальной строки для пагинации
  const startIndex = (currentPage - 1) * pageSize;
  // Выборка отфильтрованных и отсортированных репозиториев для текущей страницы
  const paginatedRepos = repos.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortField === "name" ? sortOrder : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Название
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "language"}
                  direction={sortField === "language" ? sortOrder : "asc"}
                  onClick={() => handleSort("language")}
                >
                  Язык
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "forks_count"}
                  direction={sortField === "forks_count" ? sortOrder : "asc"}
                  onClick={() => handleSort("forks_count")}
                >
                  Число форков
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "stargazers_count"}
                  direction={
                    sortField === "stargazers_count" ? sortOrder : "asc"
                  }
                  onClick={() => handleSort("stargazers_count")}
                >
                  Число звезд
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "updated_at"}
                  direction={sortField === "updated_at" ? sortOrder : "asc"}
                  onClick={() => handleSort("updated_at")}
                >
                  Дата обновления
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRepos.map((repo) => (
              <TableRow
                key={repo.id}
                className={styles.tableRow}
                onClick={() => dispatch(setSelectedRepo(repo))}
              >
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.language}</TableCell>
                <TableCell>{repo.forks_count}</TableCell>
                <TableCell>{repo.stargazers_count}</TableCell>
                <TableCell>
                  {new Date(repo.updated_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={repos.length}
          page={currentPage - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={styles.tablePagination}
        />
      </div>
    </>
  );
};

export default RepoTable;
