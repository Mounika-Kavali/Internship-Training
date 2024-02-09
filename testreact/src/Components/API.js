export const getData = async () => {
  try {
    //r a sample student data API to practice with-JSONPlaceholder API:
    //it provides a set of sample data that can be used for educational purposes.
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
