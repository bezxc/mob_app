import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { default as Slider } from "rn-range-slider";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface RangeSelectSliderProps {
  title: string;
  l?: number;
  h?: number;
  minValue?: number;
  maxValue?: number;
}

export const RangeSlider = ({
  title,
  l = 0,
  h = 0,
  minValue = 0,
  maxValue = 150000,
}: RangeSelectSliderProps) => {
  const [low, setLow] = useState(minValue);
  const [high, setHigh] = useState(maxValue);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = () => <Rail />;
  const renderRailSelected = () => <RailSelected />;
  const handleValueChange = useCallback(
    (lowValue: number, highValue: number) => {
      setLow(lowValue);
      setHigh(highValue);
    },
    [],
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.rangeValuesText}>{`${low} - ${high} ₽`}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          low={low}
          high={high}
          min={minValue}
          max={maxValue}
          step={1000}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={handleValueChange}
        />
      </View>
    </View>
  );
};

const Thumb = () => {
  return <View style={styles.thumbStyle} />;
};
const Rail = () => {
  return <View style={styles.railStyle} />;
};
const RailSelected = () => {
  return <View style={styles.railSelectedStyle} />;
};

const styles = StyleSheet.create({
  thumbStyle: {
    backgroundColor: Colors.redAccent,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  slider: {},
  railStyle: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.grayLight,
  },
  railSelectedStyle: {
    height: 4,
    backgroundColor: Colors.redAccent,
  },
  mainContainer: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.grayLight,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  titleText: {
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    lineHeight: 16,
    includeFontPadding: false,
    color: Colors.grayText,
    flexGrow: 1,
  },
  rangeValuesText: {
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 16,
    includeFontPadding: false,
    color: Colors.black,
    flexShrink: 0,
  },
  sliderContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
});
