import React from "react";

interface IProps {
	option: Record<string, any>;
	handleClick: (option: Record<string, any>, e: React.MouseEvent) => void;
	key: number;
}

export default function Options(props:IProps) {
	const { option, handleClick, key } = props;

	return (
		<div key={key}>
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
