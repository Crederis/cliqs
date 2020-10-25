const LIST_API = 'https://api.icndb.com/jokes/random/10-';

export const getList = async () => {
  try {
    const response = await fetch(LIST_API).then(res => res.json())
    return response;
  } catch (error) {
    console.log(e);
  }
};
