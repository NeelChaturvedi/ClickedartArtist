import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Dot = ({active, press}) => {
  const width = useSharedValue(active ? 24 : 10);
  const opacity = useSharedValue(active ? 1 : 0.5);

  useEffect(() => {
    width.value = withTiming(active ? 24 : 10, {duration: 300});
    opacity.value = withTiming(active ? 1 : 0.5, {duration: 300});
  }, [active, opacity, width]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      opacity: opacity.value,
    };
  });

  return (
    <View>
      <Pressable onPress={press}>
        <Animated.View style={[styles.dot, animatedStyle]} />;
      </Pressable>
    </View>
  );
};
const Switch = ({index, total, dotsPress}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: total}).map((_, i) => (
        <Dot key={i} active={index === i} press={() => dotsPress(i)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    height: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});

export default Switch;
