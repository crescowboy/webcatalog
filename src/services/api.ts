
export async function fetchProductsFromAPI(productId?: number) {
  const baseUrl = 'https://fakestoreapi.com/products';
  const url = productId ? `${baseUrl}/${productId}` : baseUrl;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
}
