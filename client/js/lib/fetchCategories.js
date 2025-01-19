async function fetchCategories() {
    try {
      const response = await fetch('https://event-manager-g4.vercel.app/api/v1/categories', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
  
      const categories = await response.json();
      console.log(categories);
      return categories.categories;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export { fetchCategories };