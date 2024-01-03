import ListDAO from "@/dao/ListDao/ListDao";

// export async function GET(req, res) {
//   const userId = req.query.userId;

//   try {
//     const result = await ListDAO.getListByUserId(userId);
//     if(result.length === 0) {
//       return new Response(
//         JSON.stringify({ message: "No lists found", status: 404 })
//       );
//     }

//     return new Response(JSON.stringify(list));
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: error.message }, { status: 500 })
//     );
//   }
// }

export async function POST(req) {
  try {
    const { list_name, userId } = await req.json();
    if (!list_name || !userId) {
      return new Response(JSON.stringify({ message: "Missing fields" }));
    }

    const newList = await ListDAO.createList(list_name, userId);

    return new Response(JSON.stringify({newList}, { status: 201 }));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}

export async function PUT(req, res) {
  const { listId, listName } = await req.json();

  if (!listId || !listName) {
    return new Response(JSON.stringify({ message: "Missing fields" }));
  }


  try {
    const updateList = await ListDAO.updateList(listId, listName);
    if (updateList.length === 0) {
      return new Response(JSON.stringify({ message: "List not found", status: 404 }))
    }

    return new Response(JSON.stringify(updateList[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }, { status: 500 }));
  }
}