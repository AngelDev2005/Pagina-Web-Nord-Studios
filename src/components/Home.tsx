import Link from "next/link";
export function Home({
  name,
  hasProjects,
}: {
  name: string;
  hasProjects: boolean;
}) {
  return (
    <>
      <h1>{name}</h1>
      <Link href="/servicios">Explorar servicios</Link>
      {hasProjects && (
        <p>
          <Link href="/proyectos">Ver proyectos</Link>
        </p>
      )}
    </>
  );
}
