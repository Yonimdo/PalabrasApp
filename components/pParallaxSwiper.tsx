import React from "react";
import {Animated, Text, View, Image, StyleSheet, Dimensions } from "react-native";

import {ParallaxSwiper, ParallaxSwiperPage } from "react-native-parallax-swiper";
import PHeaderImageScroll from "./pHeaderImageScroll";

const { width, height } = Dimensions.get("window");

export default class PParallaxSwiper extends React.Component {
    myCustomAnimatedValue = new Animated.Value(0);

    getPageTransformStyle = (index:any) => ({
        transform: [
            {
                scale: this.myCustomAnimatedValue.interpolate({
                    inputRange: [
                        (index - 1) * (width + 8), // Add 8 for dividerWidth
                        index * (width + 8),
                        (index + 1) * (width + 8)
                    ],
                    outputRange: [0, 1, 0],
                    extrapolate: "clamp"
                })
            },
            {
                rotate: this.myCustomAnimatedValue.interpolate({
                    inputRange: [
                        (index - 1) * (width + 8),
                        index * (width + 8),
                        (index + 1) * (width + 8)
                    ],
                    outputRange: ["180deg", "0deg", "-180deg"],
                    extrapolate: "clamp"
                })
            }
        ]
    });

    render() {
        return (
            <ParallaxSwiper
                speed={0.5}
                animatedValue={this.myCustomAnimatedValue}
            // dividerWidth={8}
            // dividerColor="black"
            // backgroundColor="black"
            // onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
            >
                <ParallaxSwiperPage
                    BackgroundComponent={<Text style={styles.backgroundImage} ></Text>}
                    ForegroundComponent={<PHeaderImageScroll  ></PHeaderImageScroll>}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Text style={styles.backgroundImage} ></Text>}
                    ForegroundComponent={<PHeaderImageScroll  ></PHeaderImageScroll>}

                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Text style={styles.backgroundImage} ></Text>}
                    ForegroundComponent={<PHeaderImageScroll  ></PHeaderImageScroll>}
                />
            </ParallaxSwiper>
        );
    }
}

const styles = StyleSheet.create({
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