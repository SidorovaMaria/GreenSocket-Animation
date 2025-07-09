"use client";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
const Hero = () => {
	const videoRef = useRef(null);
	const isMobile = useMediaQuery({ maxWidth: 767 });

	useGSAP(() => {
		const heroSplit = new SplitText(".title", { type: "chars, words" });
		const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.05,
		});

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 1,
		});

		gsap.timeline({
			scrollTrigger: {
				trigger: "#hero",
				start: "top top",
				end: "bottom top",
				scrub: true,
			},
		})
			.to("#right-leaf", { y: 200 }, 0)
			.to("#left-leaf", { y: -200 }, 0);

		const startValue = isMobile ? "top 50%" : "center 60%";
		const endValue = isMobile ? "120% top" : "bottom top";

		// Video animation timeline
		// Create the timeline with a default duration
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "video",
				start: startValue,
				end: endValue,
				scrub: 1,
				pin: true,
				delay: 0.5,
				onEnter: () => {
					videoRef.current.play();
				},
			},
		});
		tl.to(videoRef.current, {
			keyframes: [{ scale: 1.2 }, { scale: 1 }],
			duration: 2,
		});

		videoRef.current.onloadedmetadata = () => {
			tl.to(videoRef.current, {
				currentTime: videoRef.current.duration,
				duration: videoRef.current.duration,
				scale: 1.2,
			});
		};
	}, []);
	return (
		<>
			<section id="hero" className="noisy">
				<h1 className="title md:mt-32  mt-40 text-8xl md:text-[20vw] leading-none text-center font-modern-negra">
					MOJITO
				</h1>
				<img
					src="/images/hero-left-leaf.png"
					alt="left-leaf"
					id="left-leaf"
					className="absolute left-0 md:top-20 xl:top-36 2xl:top-52 md:bottom-auto -bottom-20 md:w-fit w-1/3;"
				/>

				<img
					src="/images/hero-right-leaf.png"
					alt="right-leaf"
					id="right-leaf"
					className="absolute right-0 md:bottom-0 xl:top-0 2xl:top-12 top-1/2 md:w-fit w-24;"
				/>
				<div className="body container mx-auto absolute left-1/2 -translate-x-1/2 lg:bottom-20 top-auto md:top-[30vh] flex justify-between items-end px-5">
					<div className="content flex lg:flex-row flex-col w-full gap-10 justify-between items-center lg:items-end mx-auto">
						<div className="space-y-5 hidden md:block">
							<p>Cool. Crisp. Classic.</p>
							<p className="subtitle">
								Sip the Spirit <br /> of Summer
							</p>
						</div>
						<div className="view-cocktails">
							<p className="subtitle">
								Every cocktail on our menu is a blend of premium ingredients,
								creative flair, and timeless recipes — designed to delight your
								senses.
							</p>
							<a href="#cocktails">View Cocktails</a>
						</div>
					</div>
				</div>
			</section>
			<div id="video" className="video absolute inset-0 w-full h-full">
				<video ref={videoRef} muted playsInline preload="auto" src="/videos/output.mp4" />
			</div>
		</>
	);
};

export default Hero;
