import styles from "./NavAboutBanner.module.css"

import InfoIcon from "./InfoIcon"

export default function NavAboutBanner(){
    return(
        <div className={styles.banner}>
            <InfoIcon/>
            <a href="https://www.linkedin.com/in/justin-teng-tu/" target="_blank">Click here to learn more about ME THE GOAT</a>
        </div>
    )
}