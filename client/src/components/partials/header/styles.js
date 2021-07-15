import styled from "styled-components";

const MAIN_COLOR = "rgb(242, 84, 91)";

const Button = styled.button`
	display: block;
	color: #fff;
	font-size: 1rem;
	border: none;
	background-color: ${MAIN_COLOR};
	line-height: normal;
	height: 40px;
	width: 40px;
	@media (min-width: 769px) {
		display: none;
	}
`;

const Backdrop = styled.div.attrs((props) => ({
	classname: props.classname,
	open: props.menustate,
}))`
	position: fixed;
	display: block;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(5px);
	visibility: ${(props) => (props.menustate ? "visible" : "hidden")};
	opacity: ${(props) => (props.menustate ? "1" : "0")};
	transition: all 0.2s ease-in;
	@media (min-width: 769px) {
		visibility: hidden;
	}
`;

const MenuContainer = styled.div`
	position: absolute;
	top: 0;
	left: ${(props) => (props.menustate ? "0" : "-100%")};
	width: 75%;
	height: 100%;
	z-index: 11;
	background-color: #fff;
	transition: left 0.4s ease-in;
	@media (min-width: 769px) {
		display: block;
		position: static;
		width: 100%;
	}
`;
const UL = styled.ul`
	position: absolute;
	top: 3rem;
	padding: 1rem;
	left: ${(props) => (props.menustate ? "0" : "-100%")};
	transition: left 0.2s ease-in;

	.menu-item {
		margin-bottom: 1rem;

		.menu-link {
			text-decoration: none;

			padding: 0.5rem;
			font-size: 1.2rem;
		}
	}

	@media (min-width: 769px) {
		display: flex;
		position: static;
		align-items: center;
		padding: 0;
		.menu-item {
			margin-left: 1rem;
			margin-bottom: 0;

			.menu-link {
				border: 1px solid transparent;
				&:hover {
					border: 1px solid ${MAIN_COLOR};
				}
			}
		}
	}
`;

export { Button, Backdrop, MenuContainer, UL };
