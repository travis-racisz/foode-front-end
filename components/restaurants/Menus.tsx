import React from "react";
import MenuItems from "./MenuItems";

export default function Menus(props) {
	const { data } = props;

	return (
		<div className = "menu-container" key={data.name}>
			<div>
				<h4 className="menu-name">{data.name}</h4>
				<>
					<div>
						{data.MenuItems.map((menuItem:Record<string, any>, index:number) => {
							return <MenuItems key = {index} menuItem={menuItem} />;
						})}
						
					</div>
					<div className="menu-divider"></div>
				</>
			</div>
		</div>
	);
}
