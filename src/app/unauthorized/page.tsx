export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Acesso negado</h1>
      <p className="text-lg text-gray-700 mb-8">
        Você não tem permissão para acessar esta página.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Voltar para o início
      </a>
    </div>
  );
}
