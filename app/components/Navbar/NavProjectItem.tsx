import styles from "./NavProjectItem.module.css"

interface NavProjectItemProps{
    itemName: string;
    date: string;
}

export default function NavProjectItem({itemName, date} : NavProjectItemProps){
    return(
        <li className={styles.project_item}>{itemName} <span className={styles.time}>&#40;{date}&#41;</span></li>
    )
}