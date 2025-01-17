import { connection } from "../lib/connecttodb.js";

export default async function FetchAllCategories (req, res){
     const query = `SELECT * FROM categories`;
     try {
        const [result] = await connection.promise().query(query);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.status(200).json({ 
         categories: result.map(category => category.name) 
       });
     } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'Error fetching categories. Please try again' });
     }
}