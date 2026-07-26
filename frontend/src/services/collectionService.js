import api from "./api";

export const getCollections = async () => {
  const response = await api.get("/collections");
  return response.data;
};

export const createCollection = async (name) => {
  const response = await api.post("/collections", {
    name,
  });
  return response.data;
};

export const deleteCollection = async (id) => {
  const response = await api.delete(`/collections/${id}`);
  return response.data;
};

export const renameCollection = async (id, name) => {
  const response = await api.put(`/collections/${id}`, {
    name,
  });
  return response.data;
};

export const getCollectionMemories = async (id) => {
  const response = await api.get(`/collections/${id}`);
  return response.data;
};

export const addMemoryToCollection = async (collectionId, memoryId) => {
  const response = await api.post(
    `/collections/${collectionId}/memory/${memoryId}`
  );

  return response.data;
};

export const removeMemoryFromCollection = async (
  collectionId,
  memoryId
) => {
  const response = await api.delete(
    `/collections/${collectionId}/memory/${memoryId}`
  );

  return response.data;
};