import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const users = [
  {
    id: 1,
    name: 'Sample User',
    email: 'user@example.com',
    password: 'password123',
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        return user || null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Use the baseUrl for redirect to avoid invalid URL issues
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/',
    error: '/signin',
    verifyRequest: '/',
    newUser: null,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
