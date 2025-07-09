import Image from "next/image";
import NavBar from "../components/NavBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
	return (
		<main>
			<NavBar />
		</main>
	);
}
