"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import styles from "./NavReferral.module.css"

const referrals = [
    { src: "/ayush.webp", alt: "Ayush", href: "https://yush9.dev" },
    { src: "/lawrence.webp", alt: "Lawrence", href: "https://blackpri0r.dev" },
    { src: "/nic.webp", alt: "Nic", href: "https://nicnonac.com" },
    { src: "/treyson.webp", alt: "Treyson", href: "https://www.treysontsen.com" },
]

export default function NavReferral(){
    const [referral, setReferral] = useState<typeof referrals[number] | null>(null)

    useEffect(() => {
        setReferral(referrals[Math.floor(Math.random() * referrals.length)])
    }, [])

    return(
        <div className={styles.container}>
            {referral && (
                <a href={referral.href} target="_blank">
                    <Image
                        src={referral.src}
                        alt={referral.alt}
                        fill
                    />
                </a>
            )}
        </div>
    )
}
