'use client';
import Link from 'next/link';
import styles from './page.module.scss';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(true), 1000);
  }, []);

  if (!loading) return <Loader />;

  return (
    <Link className={styles.toReg} href='/hello-page'>Start</Link>
  )
}
