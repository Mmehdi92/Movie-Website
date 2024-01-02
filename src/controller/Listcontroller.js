export const getListFromUserById = async (id) => {
  try {
    const response = await fetch(`/api/list/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteListById = async (id) => {
    try {
        const response = await fetch(`/api/list/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
  
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching user lists:", error.message);
      }
  };
  
