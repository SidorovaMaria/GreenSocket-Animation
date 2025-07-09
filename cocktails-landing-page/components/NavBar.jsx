"use client";

import { useRef } from "react";
import { navLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NavBar = () => {
	const navRef = useRef(null);

	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: navRef.current,
				start: "bottom top",
				toggleActions: "play none none reverse",
			},
		});

		navTween.fromTo(
			navRef.current,
			{ backgroundColor: "transparent" },
			{
				immediateRender: false,
				backgroundColor: "#00000050",
				backdropFilter: "blur(10px)", // typo fixed: `backgroundFilter` ➜ `backdropFilter`
				duration: 1,
			}
		);
	}, []);

	return (
		<nav className="fixed z-50 w-full" ref={navRef}>
			<div className="flex md:flex-row flex-col md:justify-between items-center  gap-5 py-5 lg:px-0 px-5 container mx-auto">
				<a href="#home" className="flex items-center gap-2">
					<img src="/images/logo.png" alt="logo" />
					<p className="font-modern-negra text-3xl -mb-2">Velvet Pour</p>
				</a>
				<ul className="flex-center lg:gap-12 gap-7">
					{navLinks.map((link) => (
						<li key={link.id}>
							<a
								className="cursor-pointer text-nowrap font-semibold font-modern-negra md:text-xl tracking-widest text-2xl hover:text-purple-300 transition-all duration-300 ease-in-out"
								href={`#${link.id}`}
							>
								{link.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
