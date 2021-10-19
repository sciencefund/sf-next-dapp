import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Donate.module.css";

export default function Donate() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Donate</title>
				<meta name='description' content='Science Fund Donation Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Contribute to the funding pools{" "}
				</h1>
				<div className={styles.grid}>
					<div className={styles.card}>
						<Image
							src='/images/topics/brain.jpg'
							width='300'
							height='300'
						/>
						<h2>Neuroscience</h2>
						<p>description</p>
					</div>
					<div className={styles.card}>
						<Image
							src='/images/topics/virus.jpg'
							width='300'
							height='300'
						/>
						<h2>Infectious Disease</h2>
						<p>description</p>
					</div>{" "}
					<div className={styles.card}>
						<Image
							src='/images/topics/earth.jpg'
							width='300'
							height='300'
						/>
						<h2>Climate Science</h2>
						<p>description</p>
					</div>{" "}
					<div className={styles.card}>
						<Image
							src='/images/topics/microbiology.jpg'
							width='300'
							height='300'
						/>
						<h2>Microbiology</h2>
						<p>description</p>
					</div>{" "}
				</div>
			</main>

			<footer className={styles.footer}>
				<a>@ 2021 science fund dao</a>
			</footer>
		</div>
	);
}
