import axiosInstance from "./axiosInstance";

export const getOpportunities = async () => {
  try {
    const response = await axiosInstance.get("/opportunities");
    return response.data;
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw error;
  }
};

export const createOpportunity = async (opportunity) => {
  try {
    const response = await axiosInstance.post("/opportunities", opportunity);
    return response.data;
  } catch (error) {
    console.error("Error creating opportunity:", error);
    throw error;
  }
};

export const getOpportunity = async (id) => {
  try {
    const response = await axiosInstance.get(`/opportunities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    throw error;
  }
};

export const updateOpportunity = async (id, opportunity) => {
  try {
    const response = await axiosInstance.put(
      `/opportunities/${id}`,
      opportunity
    );
    return response.data;
  } catch (error) {
    console.error("Error updating opportunity:", error);
    throw error;
  }
};
