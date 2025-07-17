import React, { useCallback, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { default as Slider } from "rn-range-slider";
import { IPollAnswer } from "@/entities/polls";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { NumericInput } from "@/shared/ui";

interface PollsSliderProps {
  minValue?: number;
  maxValue?: number;
  currentAnswer?: IPollAnswer[] | null;
  setScrollEnabled: (value: boolean) => void;
  setCurrentAnswer: React.Dispatch<React.SetStateAction<IPollAnswer[] | null>>;
}

export const PollsSlider = ({
  minValue = 0,
  maxValue = 100,
  currentAnswer,
  setScrollEnabled,
  setCurrentAnswer,
}: PollsSliderProps) => {
  const [low, setLow] = useState(
    () => Number(currentAnswer?.[0]?.title) || minValue,
  );
  const sliderRef = useRef<View | null>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  const [inputValue, setInputValue] = useState(
    () => currentAnswer?.[0]?.title || String(minValue),
  ); // Локальное состояние для инпута

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = () => <Rail />;
  const renderRailSelected = () => <RailSelected />;
  const handleValueChange = useCallback((lowValue: number) => {
    setLow(lowValue);
    setInputValue(String(lowValue));
    setCurrentAnswer([{ title: String(lowValue) }]);
  }, []);

  const handleTouchStart = (event: GestureResponderEvent) => {
    setScrollEnabled(false);
    if (sliderWidth === 0) return;

    const { locationX } = event.nativeEvent;
    const newValue = Math.round(
      (locationX / sliderWidth) * (maxValue - minValue) + minValue,
    );

    handleValueChange(newValue);
  };

  // Управление состоянием input'a
  const handleApply = () => {
    handleValueChange(Number(inputValue));
    Keyboard.dismiss();
  };

  const handleBlur = () => {
    setInputValue(String(low));
  };

  const handleChangeText = (text: string) => {
    // Оставляем только цифры и ограничиваем длину до 3 символов
    const filteredText = text.replace(/[^0-9]/g, "");
    console.log(filteredText);
    if (filteredText.length <= 3) {
      setInputValue(filteredText);
    }
  };

  const onSliderLayout = () => {
    if (sliderRef.current) {
      sliderRef.current.measure((x, y, width) => {
        setSliderWidth(width);
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <NumericInput
        globalValue={low}
        onGlobalValueChange={handleValueChange}
        value={inputValue}
        returnKeyType="done"
        onChangeText={handleChangeText}
        onSubmitEditing={handleApply}
        onBlur={handleBlur}
      />
      <View
        ref={sliderRef}
        style={styles.sliderContainer}
        onLayout={onSliderLayout}
      >
        <Slider
          onTouchStart={handleTouchStart}
          onTouchEnd={() => setScrollEnabled(true)}
          removeClippedSubviews
          disableRange
          style={styles.slider}
          low={low}
          min={minValue}
          max={maxValue}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={handleValueChange}
        />
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, styles.titleTextLeft]}>
            {minValue}
          </Text>
          <Text style={[styles.titleText, styles.titleTextRight]}>
            {maxValue}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Thumb = () => {
  return <View style={styles.thumbStyle} />;
};
const Rail = () => {
  return (
    <View style={styles.railStyle}>
      <View style={[styles.railThumb, styles.railThumbLeft]} />
      <View style={[styles.railThumb, styles.railThumbRight]} />
    </View>
  );
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
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.grayLight,
    position: "relative",
  },
  railSelectedStyle: {
    height: 2,
    backgroundColor: Colors.redAccent,
  },
  mainContainer: {
    position: "relative",
    gap: 36,
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: 6,
  },
  titleText: {
    fontWeight: "bold",
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    lineHeight: 16,
    includeFontPadding: false,
    color: Colors.grayText,
  },
  titleTextLeft: {
    flexGrow: 1,
  },
  titleTextRight: {
    flexShrink: 0,
  },
  sliderContainer: {
    paddingTop: 12,
  },
  railThumb: {
    backgroundColor: Colors.redAccent,
    width: 5,
    height: 5,
    borderRadius: 50,
    position: "absolute",
  },
  railThumbLeft: {
    left: 0,
    top: -1,
  },
  railThumbRight: {
    right: 0,
    top: -1,
  },
});
