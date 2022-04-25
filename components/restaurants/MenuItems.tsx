import React, { useContext, useEffect, useRef, useState } from "react";
import OptionsGroup from "./OptionsGroup";
import { CartContext } from "../../context/ContextProvider";

export default function MenuItems(props:any) {
	const { menuItem } = props;
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
		if (options) {
			setMenuItemState({ ...menuItem, options: options });
		}
	}, [options]);

	return (
		<div
			key={menuItem.name}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					border: "1px solid black",
					width: "700px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<p>{menuItem.name}</p>
				<p>{menuItem.description}</p>
				<p>${menuItem.price / 100}.00</p>

				<div>
					{showOptions
						? menuItem.optionsgroup.map((optionsGroup:IOptionsGroup, index:Number) => {
								return (
									<OptionsGroup
										index={index}
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
