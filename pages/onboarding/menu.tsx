import { Field, Formik } from "formik";

export default function Menu() {
	return (
		<div>
			<form>
				<Formik initialValues={{}} onSubmit={ () => console.log("submit")}>
					<h2>Lets add a menu</h2>
					<Field type="text" placeholder="ex.) Lunch"></Field>
					<h3>What hours is this menu available?</h3>
					<label>Opening hour</label>
					<Field type="date" placeholder="ex.) 12:00"></Field>
				</Formik>
			</form>
		</div>
	);
}
