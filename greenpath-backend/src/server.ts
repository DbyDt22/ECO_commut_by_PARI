import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

type StoredUser = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  createdAt: string;
};

const usersByEmail = new Map<string, StoredUser>();

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'ECO COMMUTE backend is running',
  });
});

app.post('/api/auth/register', async (request, response) => {
  try {
    const { fullName, email, password } = request.body;

    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return response.status(400).json({
        message: 'Full name, email and password are required.',
      });
    }

    const cleanedName = fullName.trim();
    const cleanedEmail = email.trim().toLowerCase();

    if (cleanedName.length < 2) {
      return response.status(400).json({
        message: 'Please enter a valid full name.',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)) {
      return response.status(400).json({
        message: 'Please enter a valid email address.',
      });
    }

    if (password.length < 8) {
      return response.status(400).json({
        message: 'Password must contain at least 8 characters.',
      });
    }

    if (Buffer.byteLength(password, 'utf8') > 72) {
      return response.status(400).json({
        message: 'Password is too long.',
      });
    }

    if (usersByEmail.has(cleanedEmail)) {
      return response.status(409).json({
        message: 'An account with this email already exists.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser: StoredUser = {
      id: randomUUID(),
      fullName: cleanedName,
      email: cleanedEmail,
      passwordHash,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };

    usersByEmail.set(cleanedEmail, newUser);

    return response.status(201).json({
      message: 'Account created successfully.',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);

    return response.status(500).json({
      message: 'Unable to create the account.',
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`ECO COMMUTE backend running on port ${port}`);
});