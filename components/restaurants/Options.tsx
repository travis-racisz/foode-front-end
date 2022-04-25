import React from "react";

interface IProps {
	option: Record<string, any>;
	handleClick: (option: Record<string, any>, e: React.MouseEvent) => void;
}

export default function Options(props:IProps) {
	const { option, handleClick } = props;

	return (
		<div key={option.name}>
			<label>{option.name}</label>
			<span>${option.value / 100}.00</span>
			<input
				name={option.name}
				type="radio"
				onClick={(e: React.MouseEvent<HTMLInputElement>) => handleClick(option, e)}
			/>
		</div>
	);
}
