import React from "react";
import MenuItems from "./MenuItems";

export default function Menus(props) {
	const { data, index } = props;

	return (
		<div className = "container flex flex-col items-center justify-center" key={index}>
			<div className="">
				<h4 className="text-slate-900 text-2xl text-center">{data.name}</h4>
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
