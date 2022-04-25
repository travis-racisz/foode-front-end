import React from "react";
import MenuItems from "./MenuItems";

export default function Menus(props) {
	const { data } = props;

	return (
		<div key={data.name}>
			<div>
				<h4>{data.name}</h4>
				<>
					<div style={{ border: "1px solid black" }}>
						{data.MenuItems.map((menuItem:Record<string, any>, index:number) => {
							return <MenuItems key = {index} menuItem={menuItem} />;
						})}
					</div>
				</>
			</div>
		</div>
	);
}
