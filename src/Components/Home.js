import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1>Ana Sayfa</h1>
      <Link to="/Form">Hasta Ekle</Link>
    </>
  );
}