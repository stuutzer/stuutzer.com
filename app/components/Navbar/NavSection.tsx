import Link from "next/link";

export type NavItem = {
  label: string;
  href: string;
};

type NavSectionProps = {
  title: string;
  items?: NavItem[];
};

export default function NavSection({ title, items }: NavSectionProps) {
  return (
    <section>
      <h2>check out my stuff</h2>
      {items && items.length > 0 && (
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
