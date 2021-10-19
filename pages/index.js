import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<p className={styles.slogan}>
					Reimagining the path to discovery
				</p>
				<h1 className={styles.title}>science fund</h1>

				<div className={styles.grid}>
					<a href='/donate' className={styles.button}>
						<h2>Donate</h2>
					</a>

					<a href='/trace' className={styles.button}>
						<h2>Trace</h2>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
