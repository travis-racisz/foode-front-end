import React from "react";
import { v4 as uuid } from 'uuid';

interface IProps {
	option: Record<string, any>;
	handleClick: (option: Record<string, any>, e: React.MouseEvent) => void;
	index: number;
}

export default function Options(props:IProps) {
	const { option, handleClick, index } = props;
	const unique_id = uuid();
  	const small_id = unique_id.slice(0,8)

	return (
		<div key={index}>
			<label>{option.name}</label>
			<span>${option.value / 100}.00</span>
			<input
				
				name={`${option.name}${small_id}`}
				type="radio"
				onClick={(e: React.MouseEvent<HTMLInputElement>) => handleClick(option, e)}
			/>
		</div>
	);
}
