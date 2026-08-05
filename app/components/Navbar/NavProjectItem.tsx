"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={styles.project_item}>
      <Link className={styles.project_link} href={href}>
        {isActive && (
          <Image
            src="/active.webp"
            alt=""
            width={16}
            height={16}
            className={styles.active_icon}
          />
        )}
        {itemName} <span className={styles.time}>&#40;{date}&#41;</span>
      </Link>
    </li>
  );
}
