import React, {
	useContext,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import Options from "./Options";
import { CartContext } from "../../context/ContextProvider";

export default function OptionsGroup(props:any) {
	const [selected, setSelected] = useState<Array<Object>>([]);
	const context = useContext(CartContext);
	let count = props.data.numberOfChoices;

	const { setOptions, index } = props;

	function handleClick(option:Record<string, any>, e:React.MouseEvent) {
		const target: any = e.target
		if (selected.length >= count) {
			setSelected((prev:any) => {
				if (prev.filter((i:any) => i.name === target.name).length > 0) {
					if (prev.indexOf(target) > 0) {
						const index = prev.indexOf(target);
						prev.unshift(prev.splice(index, 1)[0]);
						prev[0].checked = false;
						return prev.slice(1);
					}
					prev[0].checked = false;
					return prev.slice(1);
				}
				target.option = option;
				console.log(option, "option");
				// setSelected(prev => [...prev, target])
				prev.push(target);
				prev[0].checked = false;
				return prev.slice(1);
			});
			return;
		} else {
			target.option = option;
			setSelected((prev) => {
				return [...prev, target];
			});
		}
	}

	useEffect(() => {
		setOptions((prev: any) => ({
			...prev,
			[index]: selected,
		}));
	}, [selected, index, setOptions]);

	useEffect(() => {
		selected.forEach((item: any) => {
			item.checked = false;
		});
		setSelected([]);
	}, [context?.cart]);

	return (
		<div
			key={props.index}
			style={{
				border: "1px solid black",
				margin: "10px",
				padding: "15px",
			}}
		>
			<>
				<div>{props.data.name}</div>
				<div>
					<div>{props.data.description}</div>
					<div>
						{props.data.options.map((option: Array<Object>, index: number) => {
				
							return (
								<Options
									option={option}
									handleClick={handleClick}
									key={index}
								/>
							);
						})}
					</div>
				</div>

				{/* <button onClick = {() => addToCart(menuItem)}>Add to Cart</button> */}
			</>
		</div>
	);
}
