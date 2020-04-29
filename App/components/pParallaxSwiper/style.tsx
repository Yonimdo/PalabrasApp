import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    backgroundImage: {
        width,
        height
    },
    foregroundTextContainer: {
        flex: 1,

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    }
});