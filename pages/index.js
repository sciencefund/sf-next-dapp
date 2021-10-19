import Head from "next/head";
import Link from "next/link";
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
					<div className={styles.button}>
						<Link href='/donate'>
							<h2>Donate</h2>
						</Link>
					</div>
					<div className={styles.button}>
						<Link href='/trace'>
							<h2>Trace</h2>
						</Link>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
