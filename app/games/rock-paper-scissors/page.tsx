'use client';
<<<<<<< HEAD
import styles from './page.module.css';

export default function Home() {
    return(
        <div className={styles.page}>
            <head>
                <title>Rock Paper Scissors</title>
                <link href="page.module.css" rel="stylesheet" />
            </head>
            <body>
                <main className={styles.main}>
                    <h1>Rock Paper Scissors</h1>
                    <h2>Game by MemmeMann</h2>
                    <section>
                        <p>Choose a thing</p>
                    </section>
                    <button>Rock</button>
                    <button>Paper</button>
                    <button>Scissors</button>
                </main>
            </body>
        </div>
    );
}
=======
import { Footer, Header } from '@/app/layout';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <title>Rock Paper Scissors</title>
      <Header />
      <main className={styles.main}>
        <h1>Rock Paper Scissors</h1>
        <h2>Game by MemmeMann</h2>
        <section>
          <p>Choose a thing</p>
        </section>
        <button>Rock</button>
        <button>Paper</button>
        <button>Scissors</button>
      </main>
      <Footer />
    </div>
  );
}
>>>>>>> c5109591831e3175771546f2d1ffe61659e10f7c
