'use client';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import HelloPage from '../containers/HelloPage';

export default function Home({ params: { lng } }) {
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setTimeout(() => setLoading(true), 1000);
  }, []);


  if (!loading) return <Loader />;

  return (
    <HelloPage params={lng} />
  )
}
