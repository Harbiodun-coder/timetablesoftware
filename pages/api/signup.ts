
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  email: string;
  password: string;
  role: 'admin' | 'lecturer' | 'student';
  jwt_token: string;
};

let mockUsers: User[] = [
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
    const { email, password, role } = req.body;

    const existingUser = mockUsers.find((user) => user.email === email);

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser: User = {
      email,
      password,
      role,
      jwt_token: `${role}_jwt_token`,
    };

    mockUsers.push(newUser);

    return res.status(201).json({ data: newUser });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
