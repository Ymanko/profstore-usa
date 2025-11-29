import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfStore',
  description: 'Some shop',
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to ProfStore</h1>
        <p>Your one-stop shop for all your needs!</p>
      </main>
    </div>
  );
}
