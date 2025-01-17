import connection  from "../lib/db.js";
import { randomUUID } from 'crypto';

export default async function Register(req, res) {
    const { email, password, name } = req.body;
    const phone_no = req.body.phone_no || '+254 700 000 000';
    const profile_img = req.body.profile_img || 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png';
    const id = randomUUID();
    console.log("id",id);
    console.log(email, password, name, phone_no, profile_img);
    const query = `
    INSERT INTO users (id, email, password, name, phone_no, profile_img)
    VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        
        const [result] = await connection.promise().query(query, [id, email, password, name, phone_no, profile_img]);
        
        
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err) {
        console.error('Error inserting data into database:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'User with that email already exists' });
        }
       return res.status(500).json({ message: 'Error registering user. Please try again' });
    }
}
