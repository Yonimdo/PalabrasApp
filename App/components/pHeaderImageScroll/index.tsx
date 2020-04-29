import React from "react";
import { Dimensions, View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import LabelSelect from "~/components/LabelSelect";

export default class PHeaderImageScroll extends React.Component {

  render() {
    return (
      <HeaderImageScrollView
        maxHeight={200}
        minHeight={80}
        headerImage={require("../../assets/splash.png")}
        renderForeground={() => (
          <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
            <TouchableOpacity onPress={() => console.log("tap!!")}>
              <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <View style={{ height: 1000 }}>
          <TriggeringView onHide={() => console.log("text hidden")}>
            <LabelSelect enable enableAddBtn>

            </LabelSelect>
          </TriggeringView>
        </View>
      </HeaderImageScrollView>
    );
  }
}