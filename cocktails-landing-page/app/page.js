import NavBar from "../components/NavBar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Hero from "../components/Hero";
import Cocktails from "../components/Cocktails";
import About from "../components/About";
import Art from "../components/Art";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
	return (
		<main>
			<NavBar />
			<Hero />
			<Cocktails />
			<About />
			<Art />
			<Menu />
			<Contact />
		</main>
	);
}
