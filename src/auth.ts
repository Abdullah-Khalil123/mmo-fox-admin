import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const response = await axiosInstance.post('/user/login', {
            email: credentials?.email,
            password: credentials?.password,
          });
          const { user, token } = response.data;
          if (user && token) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              token: token,
            };
          }

          return null;
        } catch (error: any) {
          console.error(
            'Login error:',
            error?.response?.data || error.message || error
          );
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account?.type === 'credentials') {
        const { id, name, email, token: accessToken } = user;
        Object.assign(token, { id, name, email, accessToken });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id = '', name = '', email = '' } = token ?? {};
        Object.assign(session.user, { id, name, email });

        return {
          ...session,
          accessToken: token.accessToken ?? '',
        };
      }
      return session;
    },
  },
});
