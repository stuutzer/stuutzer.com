'use client';

import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Test(){
    const [componentSize, setComponentSize] = useState({ width: 0, height: 0 })
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const ref  = useRef<HTMLElement>(null);
    useEffect(() => {
        if (!ref.current) return
        const observer = new ResizeObserver(([entry]) => {
            const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0]
            setComponentSize({ width: Math.round(width), height: Math.round(height) })
        })
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    useEffect(() => {
        const update = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        update()  // set initial size
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])
    return(
        <main ref={ref} className={styles.main}>
            <p>Window Height: {windowSize.height}</p>
            <p>Window Width: {windowSize.width}</p>
            <p>Component Height: {componentSize.height}</p>
            <p>Component Width: {componentSize.width}</p>
            {(windowSize.width <= 1280) && <p>Breakpoints with React Hooks!</p>}
            <p className={styles.breakpoint_text}>Breakpoints with CSS Media Queries!</p>
        </main>
    )
}