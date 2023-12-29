import { query } from "@/utils/dbConnection";


export async function GET(req, { params }) {
    return new Response(JSON.stringify({message : "Hello World"}))
}

export async function DELETE(req, { params }) {
    
}