export async function getHello(): Promise<string> {
  try {
    const response = await fetch("http://localhost:3333/hello");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching hello:", error);
    return "Error fetching message";
  }
}
