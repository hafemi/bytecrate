'use client';

import styles from './page.module.css';

export default function Home() {
    return(
        <div className={styles.page}>
            <head>
                <title>Rock Paper Scissors</title>
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
