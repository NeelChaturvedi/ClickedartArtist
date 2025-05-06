import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Dot = ({active}) => {
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

  return <Animated.View style = {[styles.dot, animatedStyle]} />;
};
const Switch = ({index, total}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: total}).map((_, i) => (
        <Dot key={i} active={index === i} />
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
