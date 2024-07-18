import { Facility } from '@/utils/types';

export default function Component({ name }: { name: Facility }) {
	const icon = icons[name];

	return icon;
}

const icons: { [key in Facility]?: JSX.Element } = {
	bike_parking: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Bicicletas" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M2.4 1.5c-.3 0-.5-.1-.8-.2l-.3.5-.5.9c0 .1-.1.1-.2.1h-.8v-.4h.7L.7 2h-2.1l-.1.2h.2v.4h-1v-.4h.3l.1-.4-.1-.4c-.2 0-.3.1-.5.1-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8c.9 0 1.7.7 1.8 1.6h.4c.1 0 .1 0 .2.1l1.2 1.7.1-.2C.8.8.6.3.6-.3c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8m-4.8-3.2c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4h.3l-.5-1.2v-.2c0-.1.1-.1.2-.1H-1c-.2-.8-.7-1.3-1.4-1.3m.7 2.6c.3-.2.6-.5.6-.9h-1l.4.9zm1.3-1h-.3c0 .6-.4 1.1-.8 1.4l.1.2H.7L-.4-.1zm2.8-1.6C1.6-1.7 1-1.1 1-.3c0 .4.2.8.5 1l.7-1.2.4.2L1.8.9c.2.1.4.2.6.2.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Bicicletas"
				y="-5.7"
			/>
		</svg>
	),
	bike_sharing: (

		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Bicicletas" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M2.4 1.5c-.3 0-.5-.1-.8-.2l-.3.5-.5.9c0 .1-.1.1-.2.1h-.8v-.4h.7L.7 2h-2.1l-.1.2h.2v.4h-1v-.4h.3l.1-.4-.1-.4c-.2 0-.3.1-.5.1-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8c.9 0 1.7.7 1.8 1.6h.4c.1 0 .1 0 .2.1l1.2 1.7.1-.2C.8.8.6.3.6-.3c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8-.8 1.8-1.8 1.8m-4.8-3.2c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4h.3l-.5-1.2v-.2c0-.1.1-.1.2-.1H-1c-.2-.8-.7-1.3-1.4-1.3m.7 2.6c.3-.2.6-.5.6-.9h-1l.4.9zm1.3-1h-.3c0 .6-.4 1.1-.8 1.4l.1.2H.7L-.4-.1zm2.8-1.6C1.6-1.7 1-1.1 1-.3c0 .4.2.8.5 1l.7-1.2.4.2L1.8.9c.2.1.4.2.6.2.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Bicicletas"
				y="-5.7"
			/>
		</svg>
	),
	boat: (

		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Barco" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M2-1.5c.2-.1.4-.2.6-.2.4 0 .6.1.8.3.2.1.3.2.6.2v.4c-.4.1-.6-.1-.8-.2-.2-.2-.3-.2-.6-.2-.2 0-.3 0-.4.1.1.3.2.6.2.9v1.3l-.6.1v1.4c0 .4-.3.7-.7.7H.5v.4h-.9v-.5h-.7c-.4 0-.7-.3-.7-.7V1.2l-.6-.1V.9-.2c0-.3.1-.6.2-.9-.1-.1-.3-.1-.4-.1-.2 0-.3.1-.5.2s-.4.3-.8.3v-.4c.2 0 .4-.1.5-.2.2-.2.4-.3.8-.3.3 0 .5.1.6.2.1-.2.2-.3.3-.4-.1-.2-.2-.3-.4-.3-.2-.1-.3-.2-.5-.2s-.3.1-.5.2-.4.2-.8.2v-.4c.2 0 .3-.1.5-.2.2-.2.4-.3.8-.3.3 0 .6.1.8.3.2.1.3.2.5.2s.4-.1.5-.2c.2-.1.5-.3.8-.3.4 0 .6.1.8.3.2.1.3.2.5.2s.4-.1.5-.2c.2-.1.4-.3.8-.3s.6.1.8.3c.2.1.3.2.6.2v.4c-.4 0-.6-.1-.8-.2-.2-.2-.3-.2-.6-.2-.2 0-.3.1-.5.2-.1 0-.2.1-.4.2.1.1.2.3.3.4m-3.3 4.1c0 .1.1.2.2.2h2.3c.1 0 .2-.1.2-.2V1.3L0 1.6l-1.4-.3v1.3zm-.6-2.8v.9l1.9.4 2-.4V-.2c0-1-.9-1.9-1.9-1.9-1.1 0-2 .8-2 1.9" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Barco"
				y="-5.7"
			/>
		</svg>
	),
	light_rail: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Comboio" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M2.4 3.5h-4.8c-.3 0-.5-.2-.5-.5v-4.2c0-.3.2-.5.5-.5h.6l-.8-1.6h.6l.8 1.6h2.5L2-3.3h.5l-.8 1.6h.7c.3 0 .5.2.5.5V3c0 .3-.2.5-.5.5m-4.8-.4h1.9v-.7h.9v.7h1.9s.1 0 .1-.1V.6h-4.9l.1 2.5c0-.1 0 0 0 0m4.8-4.4h-4.8s-.1 0-.1.1V.2h4.9v-1.5" />
				<path d="M-1.3-.3c-.1 0-.3-.1-.3-.3 0-.1.1-.3.3-.3.1 0 .3.1.3.3-.1.2-.2.3-.3.3M1.3-.3C1.2-.3 1-.4 1-.6c0-.1.1-.3.3-.3.1 0 .3.1.3.3 0 .2-.1.3-.3.3" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Comboio"
				y="-5.7"
			/>
		</svg>
	),
	near_health_clinic: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Centro_Saude" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#1E6BAF"
				/>
				<path
					d="M3.1 0.8L0.8 0.8 0.8 3.1 -0.8 3.1 -0.8 0.8 -3.1 0.8 -3.1 -0.9 -0.8 -0.9 -0.8 -3.2 0.8 -3.2 0.8 -0.9 3.1 -0.9z"
					fill="#FFF"
				/>
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Centro_Saude"
				y="-5.7"
			/>
		</svg>
	),
	near_hospital: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Hospital" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#1E6BAF"
				/>
				<path
					d="M1.7 2.7L1.7 0.5 -1.7 0.5 -1.7 2.7 -2.6 2.7 -2.6 -2.7 -1.7 -2.7 -1.7 -0.5 1.7 -0.5 1.7 -2.7 2.6 -2.7 2.6 2.7z"
					fill="#FFF"
				/>
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Hospital"
				y="-5.7"
			/>
		</svg>
	),
	near_university: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Universidade" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M3.3-2.4v.6c0 .1-.1.2-.2.2h-.5v2.7h.2c.1 0 .2.1.2.2v1.1c0 .1-.1.2-.1.2L.1 3.8h-.2l-2.7-1.2c-.1 0-.1-.1-.1-.2V1.3c0-.1.1-.2.2-.2h.1v-2.7h-.5c-.1 0-.2-.1-.2-.2v-.6h-.4v-.4h7.3v.4h-.3zm-1.2.8h-.7v2.7h.7v-2.7zm-4.6 3.8h5v-.6h-5v.6zm2.3-3.8H-1v2.7h.7v-2.7zm.4 2.7h.7v-2.7H.2v2.7zM0 3.3l1.7-.7h-3.4l1.7.7zm-2.1-2.2h.7v-2.7h-.7v2.7zM-2.8-2h5.7v-.4h-5.7v.4z" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Universidade"
				y="-5.7"
			/>
		</svg>
	),
	school: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
		>
			<symbol id="Escola" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M3.3-2.7v3.9c0 .1-.1.2-.2.2H1.9V2c0 .1-.1.2-.1.2l-1.6.7v.2l1.2.2c.1 0 .2.1.2.2v.6c0 .1-.1.2-.2.2H0c-.1 0-.2-.1-.2-.2V2.9l-1.6-.7c-.1 0-.1-.1-.1-.2v-.6h-1.2c-.1 0-.2-.1-.2-.2v-3.9h-.3v-.4h7.3v.4h-.4zM.2 3.9h1v-.2l-1-.1v.3zM0 2.6L1.5 2v-4.6H.9v1.5S.8-1 .7-1H-.5c-.1 0-.2-.1-.2-.2v-1.5h-.7v4.6l1.4.7zm-.3-4h.8v-1.2h-.8v1.2zM-2.9 1h1v-3.7h-1V1zm4.8 0h1v-3.7h-1V1z" />
				<path d="M-2.6 -0.5H-2.2V0.6000000000000001H-2.6z" />
				<path d="M-0.8 0.4H-0.4V1.5H-0.8z" />
				<path d="M0.4 0.4H0.8V1.5H0.4z" />
				<path d="M2.2 -0.5H2.6V0.6000000000000001H2.2z" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Escola"
				y="-5.7"
			/>
		</svg>
	),
	shopping: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Comercio" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M3.1 1.5c0 .1-.1.1-.2.1h-5l-.2 1.1c0 .1-.1.2-.2.2h-1v-.5h.8l.8-3.9c0-.1.1-.2.2-.2h4c.1 0 .2.1.2.2l.6 2.8c.1.1.1.1 0 .2M2.5.2H1.3l.1.9h1.3L2.5.2zM-.2.2l-.1.9H1L.9.2H-.2zm1-.4l-.1-1h-.9l-.1 1H.8zM-.8 1.1l.1-.9h-1.1l-.2.9h1.2zm-.9-1.3h1l.1-1h-.9l-.2 1zm3.9-1h-1l.1 1h1.1l-.2-1zM-1.5-1.8c-.4 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8c.1.4-.3.8-.8.8m0-1.2c-.2 0-.4.2-.4.4s.2.4.4.4.4-.2.4-.4-.2-.4-.4-.4M1.7-1.8c-.4 0-.8-.4-.8-.8s.4-.8.8-.8.8.4.8.8-.3.8-.8.8m0-1.2c-.2 0-.3.2-.3.4s.2.4.4.4.4-.2.4-.4c-.1-.2-.3-.4-.5-.4" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Comercio"
				y="-5.7"
			/>
		</svg>
	),
	subway: (

		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Metro" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M1.2 1.3L0.1 -1.4 0.1 -1.4 0 -1.4 0 -1.4 -1.1 1.3 -2.1 1.3 -2.1 -2.6 -1.4 -2.6 -1.4 0 -1.3 0 -0.3 -2.6 0 -2.6 0.1 -2.6 0.4 -2.6 1.4 0 1.4 0 1.4 -2.6 2.2 -2.6 2.2 1.3z" />
				<path d="M3.6-2.6h-.5v3c0 1.7-1.4 3.1-3.1 3.1S-3.1 2.1-3.1.4v-3h-.4v3C-3.5 2.4-1.9 4 0 4 2 4 3.6 2.4 3.6.4v-3z" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Metro"
				y="-5.7"
			/>
		</svg>
	),
	train: (

		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Comboio" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7 0 3.1 2.5 5.7 5.7 5.7 3.1 0 5.7-2.5 5.7-5.7 0-3.1-2.6-5.7-5.7-5.7"
					fill="#FD0"
				/>
				<path d="M2.4 3.5h-4.8c-.3 0-.5-.2-.5-.5v-4.2c0-.3.2-.5.5-.5h.6l-.8-1.6h.6l.8 1.6h2.5L2-3.3h.5l-.8 1.6h.7c.3 0 .5.2.5.5V3c0 .3-.2.5-.5.5m-4.8-.4h1.9v-.7h.9v.7h1.9s.1 0 .1-.1V.6h-4.9l.1 2.5c0-.1 0 0 0 0m4.8-4.4h-4.8s-.1 0-.1.1V.2h4.9v-1.5" />
				<path d="M-1.3-.3c-.1 0-.3-.1-.3-.3 0-.1.1-.3.3-.3.1 0 .3.1.3.3-.1.2-.2.3-.3.3M1.3-.3C1.2-.3 1-.4 1-.6c0-.1.1-.3.3-.3.1 0 .3.1.3.3 0 .2-.1.3-.3.3" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Comboio"
				y="-5.7"
			/>
		</svg>
	),
	transit_office: (
		<svg
			enableBackground="new 0 0 50 50"
			version="1.1"
			viewBox="0 0 50 50"
			x="0"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			xmlSpace="preserve"
			y="0"
		>
			<symbol id="Navegante" viewBox="-5.7 -5.7 11.3 11.3">
				<path
					d="M0-5.7c-3.1 0-5.7 2.5-5.7 5.7S-3.1 5.7 0 5.7 5.7 3.2 5.7 0 3.1-5.7 0-5.7"
					fill="#FD0"
				/>
				<path d="M2.2 2.2zM-2.2-2.2zM0 4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-7.1c-.8 0-1.6.3-2.2.9.1 0 .2-.2.2-.3 0-.2-.2-.4-.4-.4s-.4.2-.4.4c-.1.3.1.5.3.5.1 0 .2 0 .3-.1-.5.5-.9 1.3-.9 2.1 0 1.7 1.4 3.1 3.1 3.1.8 0 1.6-.3 2.2-.9-.1 0-.2.2-.2.3 0 .2.2.4.4.4s.4-.2.4-.4c.1-.3-.1-.5-.3-.5-.1 0-.2 0-.3.1.5-.5.9-1.3.9-2.1 0-1.7-1.4-3.1-3.1-3.1z" />
			</symbol>
			<use
				height="11.3"
				overflow="visible"
				transform="matrix(4.2463 0 0 -4.2463 25 25)"
				width="11.3"
				x="-5.7"
				xlinkHref="#Navegante"
				y="-5.7"
			/>
		</svg>
	),
};
