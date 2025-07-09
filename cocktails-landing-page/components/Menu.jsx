"use client";
import React from "react";
import { allCocktails } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const Menu = () => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [transitionStarted, setTransitionStarted] = React.useState(false);
	const [direction, setDirection] = React.useState("next");
	const [span, setSpan] = React.useState(0);

	const totalCocktails = allCocktails.length;
	const getCocktailAt = (indexOffset) => {
		return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
	};
	const currentCocktail = getCocktailAt(0);
	const prevCocktail = getCocktailAt(-1);
	const nextCocktail = getCocktailAt(1);

	const goToSlide = (index, direction) => {
		if (!direction) {
			direction = index > currentIndex ? "next" : "prev";
			setSpan(index - currentIndex);
		} else {
			setSpan(direction === "next" ? 1 : -1);
		}
		setDirection(direction);
		setTransitionStarted(true);
	};

	useGSAP(() => {
		if (!transitionStarted) return;
		const splitText = new SplitText(".details h2", { type: "lines" });
		gsap.to(".cocktail img", {
			immediateRender: false,
			x: direction == "next" ? -400 : 400,
			opacity: 0,
			duration: 0.5,
			ease: "power1.out",
			onComplete: () => {
				setTransitionStarted(false);
				setCurrentIndex((prev) => (prev + span + totalCocktails) % totalCocktails);
				gsap.fromTo(
					".cocktail img",
					{ opacity: 0, x: direction == "next" ? 400 : -400 },
					{
						opacity: 1,
						duration: 1,
						x: 0,
						delay: 0.1,
						ease: "power1.out",
					}
				);
				gsap.fromTo(
					"#title,.recipe-info,.details h2,.details p",
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 1,
					}
				);
			},
		});
		gsap.to("#title,.recipe-info,.details h2,.details p", {
			immediateRender: false,
			opacity: 0,
			duration: 0.5,
			ease: "power1.out",
		});
	}, [transitionStarted, direction]);
	return (
		<section id="menu" aria-labelledby="menu-heading">
			<img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
			<img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
			<h2 id="menu-heading" className="sr-only">
				Cocktail Menu
			</h2>
			<nav className="cocktail-tabs" aria-label="Cocktail Navigation">
				{allCocktails.map((cocktail, index) => {
					const isActive = index === currentIndex;

					return (
						<button
							key={cocktail.id}
							className={`
				${isActive ? "text-white border-white" : "text-white/50 border-white/50"}
			 `}
							onClick={() => goToSlide(index)}
						>
							{cocktail.name}
						</button>
					);
				})}
			</nav>
			<div className="content">
				<div className="arrows">
					<button
						className="text-left"
						onClick={() => goToSlide(currentIndex - 1, "prev")}
					>
						<span>{prevCocktail.name}</span>
						<img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
					</button>
					<button
						className="text-left"
						onClick={() => goToSlide(currentIndex + 1, "next")}
					>
						<span>{nextCocktail.name}</span>
						<img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
					</button>
				</div>
				<div className="cocktail">
					<img src={currentCocktail.image} className="object-contain" />
				</div>
				<div className="recipe">
					<div className="info">
						<p className="recipe-info">Recipe for:</p>
						<p id="title">{currentCocktail.name}</p>
					</div>

					<div className="details">
						<h2>{currentCocktail.title}</h2>
						<p>{currentCocktail.description}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Menu;
