
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  email: string;
  password: string;
  role: 'admin' | 'lecturer' | 'student';
  jwt_token: string;
};

const mockUsers: User[] = [
  {
    email: 'admin@lasu.edu',
    password: 'admin123',
    role: 'admin',
    jwt_token: 'admin_jwt_token',
  },
  {
    email: 'lecturer@lasu.edu',
    password: 'lecturer123',
    role: 'lecturer',
    jwt_token: 'lecturer_jwt_token',
  },
  {
    email: 'student@lasu.edu',
    password: 'student123',
    role: 'student',
    jwt_token: 'student_jwt_token',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      return res.status(200).json({ data: user });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
