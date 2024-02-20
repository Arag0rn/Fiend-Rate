"use client"
import React from 'react'
import styles from "./navbar.module.scss"; 
import { usePathname } from 'next/navigation'

export const Navbar = () => {
    const pathname = usePathname()
    console.log(pathname);
    
  return (
    <div className={styles.navbar}>
        <svg className={pathname === '/home' ? styles.active : styles.notActive } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="ic:baseline-home">
        <path id="Vector" d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" />
        </g>
        </svg>

        <svg className={pathname === '/rate' ? styles.active : styles.notActive } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>

        <svg className={pathname === '/notification' ? styles.active : styles.notActive } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18.5C11.17 18.5 10.5 17.83 10.5 17H13.5C13.5 17.83 12.83 18.5 12 18.5ZM17 16H7V15L8 14V11.39C8 9.27 9.03 7.47 11 7V6.5C11 5.93 11.43 5.5 12 5.5C12.57 5.5 13 5.93 13 6.5V7C14.97 7.47 16 9.28 16 11.39V14L17 15V16Z" />
        </svg>

        <svg className={pathname === '/profile' ? styles.active : styles.notActive } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM19 19H5V18.77C5 18.15 5.28 17.57 5.76 17.19C7.47 15.82 9.64 15 12 15C14.36 15 16.53 15.82 18.24 17.19C18.72 17.57 19 18.16 19 18.77V19Z" />
        </svg>



    </div>
  )
}
