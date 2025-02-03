import React, { useEffect, useState } from "react";
import { STATUS, OPPORTUNITY_TYPE } from "../utils/enum";
import { createOpportunity } from "../api/opportunities";

import styles from "../styles/components/Opportunity.module.css";

const Opportunity = ({ handleOpportunityCreated }) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
    customerName: "",
    opportunityType: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOpportunity(formData);
    } catch (error) {
      console.error("Error creating opportunity:", error);
    }
    handleOpportunityCreated();
  };

  return (
    <div className={`${styles.card} ${styles.newOpportunity}`}>
      <h3>Create New Opportunity</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
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
        </div>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Opportunity Type:</label>
          <select
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Please select...
            </option>
            {Object.values(OPPORTUNITY_TYPE).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {(formData.opportunityType === OPPORTUNITY_TYPE.HANDOVER ||
          formData.opportunityType === OPPORTUNITY_TYPE.COVER_REQUEST) && (
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {formData.opportunityType === OPPORTUNITY_TYPE.COVER_REQUEST && (
          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit">Create Opportunity</button>
      </form>
    </div>
  );
};

export default Opportunity;
