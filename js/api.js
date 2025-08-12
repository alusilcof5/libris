const apiUrl = 'https://openlibrary.org/search.json?q=1000';

export const fetchBooks = async () => {
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Error fetching books');
  const data = await response.json();
  console.log(data);
  return data.docs; 
};

