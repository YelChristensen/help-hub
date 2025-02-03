import React from "react";

import styles from "../styles/components/ButtonsContainer.module.css";

const ButtonsContainer = (props) => {
  const showSortOptions = () => {
    const options = document.getElementById("sort-options");
    if (options) {
      options.classList.toggle(styles.show);
    }
  };

  const handleSortOpportunities = (e, option) => {
    e.stopPropagation();
    props.sortOpportunities(option);
    showSortOptions();
  };

  const showFilterOptions = () => {
    const options = document.getElementById("filter-options");
    if (options) {
      options.classList.toggle(styles.show);
    }
  };

  const handleFilterOpportunities = (e, option) => {
    e.stopPropagation();
    props.filterOpportunities(option);
    showFilterOptions();
  };

  return (
    <div className={styles.buttonsContainer}>
      <button className={styles.buttonSecondary} onClick={showSortOptions}>
        Sort
        <div id="sort-options" className={styles.options}>
          <p onClick={(e) => handleSortOpportunities(e, "asc")}>Older First</p>
          <p onClick={(e) => handleSortOpportunities(e, "desc")}>Newer First</p>
        </div>
      </button>
      <button className={styles.buttonSecondary} onClick={showFilterOptions}>
        Filter
        <div id="filter-options" className={styles.options}>
          <p onClick={(e) => handleFilterOpportunities(e, "Open")}>Open</p>
          <p onClick={(e) => handleFilterOpportunities(e, "In Progress")}>
            In Progress
          </p>
          <p onClick={(e) => handleFilterOpportunities(e, "Closed")}>Closed</p>
          <p onClick={(e) => handleFilterOpportunities(e)}>Clear Filters</p>
        </div>
      </button>
      <button
        className={styles.buttonPrimary}
        onClick={() => props.handleOpenOpportunity()}
      >
        New
      </button>
    </div>
  );
};

export default ButtonsContainer;
