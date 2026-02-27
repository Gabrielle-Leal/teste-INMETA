import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
        <Link href="/" className="inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
