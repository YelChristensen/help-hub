import React, { useEffect, useState } from "react";
import { getOpportunities } from "../api/opportunities";

import Header from "../components/Header";
import ButtonsContainer from "../components/ButtonsContainer";
import Opportunity from "../components/Opportunity";
import ListOpportunities from "../components/ListOpportunities";
import LoadingSpinner from "../components/LoadingSpinner";

import styles from "../styles/pages/Index.module.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [openNewOpportunity, setOpenNewOpportunity] = useState(false);

  const fetchOpportunities = async () => {
    const data = await getOpportunities();
    setOpportunities(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    if (opportunities.length === 0) {
      setIsLoading(true);
      fetchOpportunities();
    }
  }, []);

  const updateOpportunityList = () => {
    setIsLoading(true);
    fetchOpportunities();
  };

  //create new opportunity rendering funcionality
  const handleOpenOpportunity = () => {
    if (openNewOpportunity) {
      closeOpportunity();
    } else {
      setOpenNewOpportunity(true);
    }
  };

  const closeOpportunity = () => {
    //timeout to wait for the animation to finish
    setTimeout(() => {
      setOpenNewOpportunity(false);
    }, 300);
  };

  const handleOpportunityCreated = () => {
    closeOpportunity();
    setIsLoading(true);
    fetchOpportunities();
  };

  //sort funcionality
  const sortOpportunities = (option) => {
    if (option === "asc") {
      const sortedOpportunities = [...opportunities].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      setOpportunities(sortedOpportunities);
    } else if (option === "desc") {
      const sortedOpportunities = [...opportunities].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setOpportunities(sortedOpportunities);
    }
  };

  //filter funcionality
  const filterOpportunities = (option) => {
    const filteredOpportunities = opportunities.filter(
      (opportunity) => opportunity.status === option
    );
    setFilteredOpportunities(filteredOpportunities);
  };

  return (
    <div className={styles.app}>
      <Header />
      <main>
        <div className={styles.container}>
          <ButtonsContainer
            handleOpenOpportunity={handleOpenOpportunity}
            sortOpportunities={sortOpportunities}
            filterOpportunities={filterOpportunities}
          />
          {!!openNewOpportunity && (
            <Opportunity handleOpportunityCreated={handleOpportunityCreated} />
          )}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ListOpportunities
              opportunities={opportunities}
              filteredOpportunities={filteredOpportunities}
              updateOpportunityList={updateOpportunityList}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
