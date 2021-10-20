import styles from "./topicCard.module.css";
import Image from "next/image";

export default function TopicCard(props) {
	return (
		<div className={styles.card}>
			<Image src={props.imagePath} width='300' height='300' />
			<h2>{props.topic}</h2>
			<p>{props.description}</p>
		</div>
	);
}
