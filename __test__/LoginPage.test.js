import { render, screen, waitFor } from '@testing-library/react';
import Login from '@/app/login/page'; // Update the import path based on your project structure
import dbConnection from '@/utils/dbConnection';
import bcrypt from 'bcrypt';
import { SessionProvider } from 'next-auth/react'; // Make sure to import SessionProvider

// Rest of your test file code...


// Mock the authentication provider
jest.mock('next-auth/next', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the query function from your utils
jest.mock('../src/utils/dbConnection', () => ({
  query: jest.fn(),
}));

// Mock the bcrypt compare function
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('Login Page', () => {
  it('renders login page', async () => {
    // Mock your user data and bcrypt compare result
    const mockUser = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
    };
    const mockCredentials = {
      email: 'john.doe@example.com',
      password: 'password',
    };

    // Mock the query function to return the user
    dbConnection.query.mockResolvedValueOnce([mockUser]);

    // Mock the bcrypt compare to return true
    bcrypt.compare.mockResolvedValueOnce(true);

    // Mock the NextAuth handler to return the user
    require('next-auth/next').default.mockImplementationOnce(async () => ({
      credentials: mockCredentials,
      user: mockUser,
    }));

    // Render the Login component
    render(
      <SessionProvider session={{}}>
        <Login />
      </SessionProvider>
    );

    // Wait for the authentication process to complete
    await waitFor(() => {
      // Add your assertions based on the expected UI elements
      expect(screen.getByText('Log in')).toBeInTheDocument();
      // Add more assertions as needed
    });
  });
});

