import React, { useState } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Quantity(props) {
	LogBox.ignoreLogs([
		"VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
	]);
	const { quantity, setQuantity } = props;
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(quantity);
	const [items, setItems] = useState([
		{
			label: "1",
			value: 1,
		},
		{
			label: "2",
			value: 2,
		},
		{
			label: "3",
			value: 3,
		},
	]);

	return (
		<View>
			<DropDownPicker
				defaultValue={quantity}
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				containerStyle={styles.containerStyle}
				itemStyle={styles.itemStyle}
				dropDownStyle={styles.dropDownPicker}
				style={styles.dropDownPicker}
				labelStyle={styles.labelStyle}
				onChangeValue={
					(value) => {
						setQuantity(value);
					}
					//console.log(value)
					// console.log(setQuantity))
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		height: 40,
		width: 100,
	},
	itemStyle: {
		justifyContent: "flex-start",
	},
	dropDownStyle: {
		backgroundColor: "#fafafa",
	},
	dropDownPicker: {
		backgroundColor: "#fafafa",
	},
	labelStyle: {
		color: "#000",
	},
});
