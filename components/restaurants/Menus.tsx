import React from "react";
import MenuItems from "./MenuItems";

export default function Menus(props) {
	const { data, index } = props;

	return (
		<div className = "menu-container" key={index}>
			<div>
				<h4 className="menu-name">{data.name}</h4>
				<>
					<div>
						{data.MenuItems.map((menuItem:Record<string, any>, index:number) => {
							return <MenuItems index = {index} menuItem={menuItem} key = {index} />;
						})}
						
					</div>
					<div className="menu-divider"></div>
				</>
			</div>
		</div>
	);
}
