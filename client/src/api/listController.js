import api from '../config/axiosConfig';

export const createList = async (listData) => {
  try {
    const { data } = await api.post('/1/lists/', listData);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const updateList = async (updatedList) => {
  const { _id, listTitle, position } = updatedList;

  try {
    await api.put(`/1/lists/${_id}`, {
      listTitle,
      position,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (id) => {
  try {
    await api.delete(`/1/lists/${id}`);
  } catch (error) {
    console.log(error);
  }
};
