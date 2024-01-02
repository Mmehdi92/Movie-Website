export  const getListFromUserById = async (userId) =>{
   
    try {
        const response = await fetch(`/api/list/${userId}`, {
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
}