import api from "./api";

/* ===========================
   Dashboard
=========================== */

export const getDashboardStats = async () => {
  const { data } = await api.get("/memory/dashboard");
  return data;
};

export const getRecentMemories = async () => {
  const { data } = await api.get("/memory/recent");
  return data;
};

export const getTopDomains = async () => {
  const { data } = await api.get("/memory/dashboard/top-domains");
  return data;
};

export const getTopTags = async () => {
  const { data } = await api.get("/memory/dashboard/top-tags");
  return data;
};

export const getAIInsight = async () => {
  const { data } = await api.get("/memory/dashboard/insight");
  return data;
};

/* ===========================
   Memories
=========================== */

export const getAllMemories = async () => {
  const { data } = await api.get("/memory/all");
  return data;
};

export const getMemory = async (id) => {
  const { data } = await api.get(`/memory/${id}`);
  return data;
};

export const updateMemory = async (id, payload) => {
  const { data } = await api.patch(`/memory/update/${id}`, payload);
  return data;
};

export const deleteMemory = async (id) => {
  const { data } = await api.delete(`/memory/delete/${id}`);
  return data;
};

export const favoriteMemory = async (id) => {
  const { data } = await api.patch(`/memory/favorite/${id}`);
  return data;
};

/* ===========================
   Search
=========================== */

export const searchMemories = async (query) => {
  const { data } = await api.post("/memory/search", {
    query,
  });

  return data;
};

export const searchMemory = searchMemories;

/* ===========================
   Favorites
=========================== */

export const getFavoriteMemories = async () => {
  const { data } = await api.get("/memory/favorites");
  return data;
};

/* ===========================
   Recent
=========================== */

export const getRecentMemoryList = async () => {
  const { data } = await api.get("/memory/recent");
  return data;
};

export const getMostVisited = async () => {
  const { data } = await api.get("/memory/dashboard/most-visited");
  return data;
};

export const saveMemory = async (data) => {
  const response = await api.post("/memory/save", data);
  return response.data;
};