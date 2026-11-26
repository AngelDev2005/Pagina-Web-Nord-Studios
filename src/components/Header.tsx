import Link from "next/link";
export default function Header({
  links,
}: {
  links: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <header>
      <nav aria-label="Principal">
        <ul>
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
