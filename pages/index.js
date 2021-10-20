import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import TopicCard from "../components/topicCard";
export default function Home() {
	return (
		<div>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.container}>
				<section className={styles.landing}>
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
				</section>
				{/* Curated Pool */}
				<section className={styles.curate}>
					<h1 className={styles.sectionTitle}>
						Contribute to the funding pools{" "}
					</h1>
					<div className={styles.grid}>
						<TopicCard
							imagePath='/images/topics/brain.jpg'
							topic='Neuroscience'
							description='Can we understand the biological basis of learning, memory, behavior and ultimately consciousness?'
						/>
						<TopicCard
							imagePath='/images/topics/virus.jpg'
							topic='Infectious Disease'
							description='What are the chances of a superbug wiping out humanity?'
						/>
						<TopicCard
							imagePath='/images/topics/earth.jpg'
							topic='Climate Change'
							description='Are we the first generation to feel the effect of climate change and last generation to do something about it? '
						/>
						<TopicCard
							imagePath='/images/topics/microbiology.jpg'
							topic='Microbiology'
							description='The microbes within us and grander view of life.'
						/>
					</div>
				</section>
			</main>
			<footer className={styles.footer}>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
