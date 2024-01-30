import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <Link className={styles.toReg} href='/hello-page'>Start</Link>
  )
}
