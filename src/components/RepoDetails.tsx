import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from "../styles/RepoDetails.module.scss";

/**
 * Компонент для отображения подробностей выбранного репозитория.
 */
const RepoDetails: React.FC = () => {
  const selectedRepo = useSelector(
    (state: RootState) => state.repos.selectedRepo
  );

  console.log(selectedRepo);

  // Если репозиторий не выбран, показываем сообщение "Добро пожаловать"
  if (!selectedRepo)
    return (
      <div className={styles.repoDetails}>
        <p>Выберите репозиторий</p>
      </div>
    );

  return (
    <div className={styles.repoDetailsAll}>
      <h2>{selectedRepo.name}</h2>
      <div className={styles.desc}>
      <div className={styles.lang}>{selectedRepo.language}</div>
      <div className={styles.star}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z"
            fill="#FFB400"
          />
        </svg>
        {selectedRepo.stargazers_count}
      </div>
      </div>
      
      <p>{selectedRepo.description}</p>
      <p>{selectedRepo.license?.name}</p>
    </div>
  );
};

export default RepoDetails;
