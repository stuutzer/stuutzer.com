import Link from "next/link";
import styles from "./NavProjectItem.module.css";

interface NavProjectItemProps {
  href: string;
  itemName: string;
  date: string;
}

export default function NavProjectItem({
  href,
  itemName,
  date,
}: NavProjectItemProps) {
  return (
    <li className={styles.project_item}>
      <Link href={href}>
        {itemName}{" "}
        <span className={styles.time}>&#40;{date}&#41;</span>
      </Link>
    </li>
  );
}
