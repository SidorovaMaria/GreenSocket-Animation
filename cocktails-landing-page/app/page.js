import NavBar from "../components/NavBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Hero from "../components/Hero";
import Cocktails from "../components/Cocktails";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
			<Cocktails />
		</main>
	);
}
