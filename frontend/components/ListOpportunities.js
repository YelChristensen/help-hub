import React, { useEffect, useState } from "react";
import { getOpportunity, updateOpportunity } from "../api/opportunities";
import { STATUS } from "../utils/enum";

import styles from "../styles/components/ListOpportunities.module.css";

const ListOpportunities = (props) => {
  const [opportunities, setOpportunities] = useState([]);
  const [visibleOpportunities, setVisibleOpportunities] = useState(9);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  useEffect(() => {
    if (props.filteredOpportunities.length > 0) {
      setOpportunities(props.filteredOpportunities);
    } else {
      setOpportunities(props.opportunities);
    }
  }, [props.opportunities, props.filteredOpportunities]);

  const showMoreOpportunities = () => {
    setVisibleOpportunities((prevVisible) => prevVisible + 9);
  };

  const handleOpportunityClick = async (opportunity) => {
    if (selectedOpportunity && selectedOpportunity._id !== opportunity._id) {
      setSelectedOpportunity(null); // Deselect if the same opportunity is clicked
    } else {
      const opportunityDetails = await getOpportunity(opportunity._id);
      if (opportunityDetails) {
        setSelectedOpportunity(opportunityDetails); // Select the clicked opportunity
      }
    }
  };

  const handleCloseOpportunity = (e) => {
    e.stopPropagation();
    setSelectedOpportunity(null);
  };

  const updateStatus = (e) => {
    e.stopPropagation();
    setSelectedOpportunity({
      ...selectedOpportunity,
      status: e.target.value,
    });
  };

  const saveNewStatus = async (e) => {
    e.stopPropagation();
    await updateOpportunity(selectedOpportunity._id, selectedOpportunity);
    props.updateOpportunityList();
    setSelectedOpportunity(null);
  };

  return (
    <div className={styles.listOpportunities}>
      {opportunities?.slice(0, visibleOpportunities).map((opportunity) => (
        <div
          key={opportunity._id}
          className={`${styles.card} ${
            selectedOpportunity?._id === opportunity._id
              ? styles.selected
              : styles.listed
          }`}
          onClick={() => handleOpportunityClick(opportunity)}
        >
          <h3>{opportunity.title}</h3>
          {selectedOpportunity?._id === opportunity._id ? (
            <>
              <p>
                <label>
                  <strong>Status:</strong>
                </label>
                <select
                  name="status"
                  value={selectedOpportunity.status}
                  onChange={updateStatus}
                  required
                >
                  <option value="" disabled>
                    Please select...
                  </option>
                  {Object.values(STATUS).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <strong>Customer Name:</strong> {opportunity.customerName}
              </p>
              <p>
                <strong>Opportunity Type:</strong> {opportunity.opportunityType}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(opportunity.createdAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Description:</strong> {selectedOpportunity.description}
              </p>
              {selectedOpportunity?.startDate && (
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(selectedOpportunity.startDate).toLocaleDateString()}
                </p>
              )}
              {selectedOpportunity?.endDate && (
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(selectedOpportunity.endDate).toLocaleDateString()}
                </p>
              )}
              <div className={styles.editButtons}>
                <button
                  className={styles.buttonSecondary}
                  onClick={handleCloseOpportunity}
                >
                  Close
                </button>
                <button
                  className={styles.buttonPrimary}
                  onClick={saveNewStatus}
                >
                  Update
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Status:</strong> {opportunity.status}
              </p>
              <p>
                <strong>Customer Name:</strong> {opportunity.customerName}
              </p>
              <p>
                <strong>Opportunity Type:</strong> {opportunity.opportunityType}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(opportunity.createdAt).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      ))}
      {visibleOpportunities < opportunities.length && (
        <button
          className={styles.buttonPrimary}
          onClick={showMoreOpportunities}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default ListOpportunities;
