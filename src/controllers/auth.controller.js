import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import env from '../config/env.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default { login };
