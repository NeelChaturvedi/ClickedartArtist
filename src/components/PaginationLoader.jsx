/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

const DotLoader = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  const getStyle = dot => ({
    transform: [
      {
        scale: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5],
        }),
      },
    ],
    opacity: dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, getStyle(dot1)]} />
      <Animated.View style={[styles.dot, getStyle(dot2)]} />
      <Animated.View style={[styles.dot, getStyle(dot3)]} />
    </View>
  );
};

export default DotLoader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginHorizontal: 5,
  },
});
