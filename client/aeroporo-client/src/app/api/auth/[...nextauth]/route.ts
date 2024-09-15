import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Faz a requisição para a sua API que verifica o email
          const res = await fetch(`http://localhost:3001/users/search/email?email=${credentials?.email}`);
          const user = await res.json();

          // Se o usuário foi encontrado e a senha está correta
          if (user && user.password === credentials?.password) {
            return user;
          } else {
            // Se o email ou a senha estiverem errados, retorna null
            return null;
          }
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/',  // Página de login personalizada
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
