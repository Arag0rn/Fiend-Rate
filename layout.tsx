import './globals.css';
import styles from "./styles/global.module.scss"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.background}>{children}</body>
    </html>
  )
}
