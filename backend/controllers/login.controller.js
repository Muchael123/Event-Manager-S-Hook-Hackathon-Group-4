import connection  from "../lib/db.js";
import jwt from 'jsonwebtoken'

const Login = async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    try {
        const [result] = await connection.promise().query(query, [email, password]);
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }else{
            console.log( result[0].id, "result[0].id");
            const token = jwt.sign({ userId: result[0].id }, process.env.JWT_SECRET, { expiresIn: "30d" });
            res.status(200).json({ message: 'Login successful', user: result[0], token });
        }
    } catch (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ message: 'Error logging in user. Please try again' });
    }
}
export default Login