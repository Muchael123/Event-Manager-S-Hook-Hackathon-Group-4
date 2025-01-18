import connection  from "../../lib/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const Login = async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
        const [result] = await connection.promise().query(query, [email]);
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }else{
            console.log( result[0].id, "result[0].id");
            const isPasswordValid = await bcrypt.compare(password, result[0].password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Wrong email or password' });
            }
            const token = jwt.sign({ userId: result[0].id }, process.env.JWT_SECRET, { expiresIn: "30d" });
            res.status(200).json({ message: 'Login successful', user: {
                id: result[0].id,
                email: result[0].email,
                name: result[0].name,
                phone_no: result[0].phone_no,
                profile_img: result[0].profile_img
            }, token });
        }
    } catch (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ message: 'Error logging in user. Please try again' });
    }
}
export default Login