import styles from "./NavProjects.module.css"

import NavProjectItem from "./NavProjectItem"

export default function NavProjects(){
    return(
        <>
            <h2 className={styles.title}>
                Check Out My Stuff
            </h2>
            <div className={styles.divider}/>
            <ul className={styles.project_items}>
                <NavProjectItem itemName="AUEC '26 Semester Two Brochure" date="Jul'26"/>
                <NavProjectItem itemName="AUEC X DEVS TFT Poster" date="May '25"/>
                <NavProjectItem itemName="AUEC '26 Semester One Roadmap" date="Feb '25"/>
                <NavProjectItem itemName="AUEC '26 Design Overhaul" date="Sep '25"/>
                <NavProjectItem itemName="Rage Art Rumble 2025 Round 2 Poster" date="Sep '25"/>
                <NavProjectItem itemName="AUEC X VUWG Showmatch Poster" date="Apr '25"/>
                <NavProjectItem itemName="Tawhiti Forestry Website" date="Feb '25"/>
                <NavProjectItem itemName="WINESCI 201 Research Poster" date="Jan '25"/>
                <NavProjectItem itemName="MTGlossary" date="Nov' 24"/>
            </ul>
        </>
    )
}