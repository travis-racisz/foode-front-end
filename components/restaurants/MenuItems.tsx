import React, { useContext, useEffect, useRef, useState } from "react";
import OptionsGroup from "./OptionsGroup";
import { CartContext } from "../../context/ContextProvider";

export default function MenuItems(props:any) {
	const { menuItem, index } = props;
	const [menuItemState, setMenuItemState] = useState(menuItem);
	const [showOptions, setShowOptions] = useState(false);
	const [options, setOptions] = useState<Options>();
	const context = useContext(CartContext);

	interface Options{ 
		[key: string]: Object[];
	}

	interface IOptionsGroup {
		name: String, 
		description: String, 
		numberOfChoices: Number,
		options: Array<any>,
	}
	useEffect(() => {
		console.log(menuItemState, "menuItemState");
		if (options) {
			setMenuItemState({ ...menuItem, options: options });
		}
	}, [options, menuItem]);

	return (
		<div
			key={index}
			className= "menu-item-container"
		>
			<div
				
				className="menu-item"
			>
				<p>{menuItem.name}</p>
				<p>{menuItem.description}</p>
				<p>${(menuItem.price / 100).toFixed(2)}</p>

				<div>
					{showOptions
						? menuItem.optionsgroup.map((optionsGroup:IOptionsGroup, index: number) => {
								return (
									<OptionsGroup
										key = {index}
										
										options={options}
										data={optionsGroup}
										menuItem={menuItem}
										setOptions={setOptions}
									/>
								);
						  })
						: null}
					{showOptions ? (
						<button onClick={() => context?.addToCart(menuItemState)}>
							Add to cart
						</button>
					) : (
						<button
							type="button"
							onClick={() => setShowOptions((prev) => !prev)}
						>
							+
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
