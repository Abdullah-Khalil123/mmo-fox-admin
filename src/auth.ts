import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials || {};
          if (email && password) {
            if (email == 'abdullah@gmail.com' && password == '12345678') {
              const id = Math.random().toString(36).substring(2, 15);
              return {
                id: id,
                name: 'Abdullah',
                email: email as string,
                token: '1234567890abcdef',
                password: password as string,
              };
            }
            return null;
          }
          return null;
        } catch (error: any) {
          const message = error.response?.data?.error || 'Something went wrong';
          throw new Error(message);
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
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ?? '';
        session.user.name = token.name ?? '';
        session.user.email = token.email ?? '';

        return {
          ...session,
          accessToken: token.accessToken ?? '',
        };
      }
      return session;
    },
  },
});
