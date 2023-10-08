import React, { useEffect, useRef, useState } from 'react';

import { View, StyleSheet, Text, Pressable } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated';

const VISIBLE_AREA_WIDTH = 200;
const VISIBLE_AREA_HEIGHT = 200;

const BOX_BORDER_WIDTH = 5;
const BOX_WIDTH = 150 + BOX_BORDER_WIDTH * 2; //add border width
const BOX_HEIGHT = 150 + BOX_BORDER_WIDTH * 2; //add border width
const INITIAL_SCALE = 1;
const NEW_SCALE = 0.5;

const clamp = (value, min, max) => {
  'worklet';
  return Math.min(Math.max(min, value), max);
};

export default function Transforms() {
  const [container, setContainer] = useState(null);
  const [isPanningEnabled, setIsPanningEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [min, setMin] = useState({ x: 0, y: 0 });
  const [max, setMax] = useState({ x: 0, y: 0 });
  const [currentScale, setCurrentScale] = useState(INITIAL_SCALE);

  const scale = useSharedValue(INITIAL_SCALE);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const getEdges = () => {
    'worklet';
    let pointX = (BOX_WIDTH * scale.value - VISIBLE_AREA_WIDTH) * -1;
    const pointY = (BOX_HEIGHT * scale.value - VISIBLE_AREA_HEIGHT) * -1;

    if (scale.value < 1) {
      pointX -= (BOX_WIDTH * scale.value) / 2;
      console.log(-pointX);
    }

    runOnJS(setMin)({
      x: Math.min(pointX, 0),
      y: Math.min(pointY, 0),
    });
    runOnJS(setMax)({
      x: Math.max(0, pointX),
      y: Math.max(0, pointY),
    });

    return {
      x: {
        min: Math.min(pointX, 0),
        max: Math.max(0, pointX),
      },
      y: {
        min: Math.min(pointY, 0),
        max: Math.max(0, pointY),
      },
    };
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }, { translateY: translationY.value }, { scale: scale.value }],
    };
  });

  const onPress = () => {
    const newScale = scale.value === INITIAL_SCALE ? NEW_SCALE : INITIAL_SCALE;
    scale.value = withTiming(newScale);
    setCurrentScale(newScale);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translationX.value;
      ctx.startY = translationY.value;
    },
    onActive: (event, ctx) => {
      'worklet';
      translationX.value = ctx.startX + event.translationX;
      translationY.value = ctx.startY + event.translationY;
      // update state to view values on the screen as they change
      runOnJS(setPosition)({ x: translationX.value, y: translationY.value });
    },
    onEnd: () => {
      'worklet';
      const edges = getEdges();
      const boundedX = clamp(translationX.value, edges.x.min, edges.x.max);
      const boundedY = clamp(translationY.value, edges.y.min, edges.y.max);

      // create "bounce-y" effect when moving the box back inside the bounds
      translationX.value = withTiming(boundedX);
      translationY.value = withTiming(boundedY);

      // update state to view values on the screen as they change
      runOnJS(setPosition)({ x: boundedX, y: boundedY });
    },
  });

  const onContainerLayout = ({ nativeEvent: { layout } }) => {
    setContainer(layout);
  };

  useEffect(() => {
    setIsPanningEnabled(container !== null);
  }, [container]);

  return (
    <View style={styles.container}>
      <View style={styles.workspace}>
        <PanGestureHandler onGestureEvent={gestureHandler} enabled={isPanningEnabled}>
          <Animated.View style={styles.boxContainer} onLayout={onContainerLayout}>
            <Pressable onPress={onPress}>
              <Animated.View style={[styles.box, animatedStyle]} />
            </Pressable>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.output}>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>isPanningEnabled</Text>
          <Text style={styles.outputValue}>{isPanningEnabled.toString()}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>container</Text>
          <Text style={styles.outputValue}>{`${container?.width.toFixed(0)}x${container?.height.toFixed(0)}`}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>minX, minY</Text>
          <Text style={styles.outputValue}>{`${min.x.toFixed(2)},${min.y.toFixed(2)}`}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>maxX, maxY</Text>
          <Text style={styles.outputValue}>{`${max.x.toFixed(2)},${max.y.toFixed(2)}`}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>translationX, translationY</Text>
          <Text style={styles.outputValue}>{`${position.x.toFixed(2)},${position.y.toFixed(2)}`}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>scale</Text>
          <Text style={styles.outputValue}>{currentScale.toFixed(2)}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>Box Size</Text>
          <Text style={styles.outputValue}>{`${BOX_WIDTH.toFixed(2)}x${BOX_HEIGHT.toFixed(2)}`}</Text>
        </View>
        <View style={styles.outputRow}>
          <Text style={styles.outputName}>Box Size (scaled)</Text>
          <Text style={styles.outputValue}>{`${(BOX_WIDTH * currentScale).toFixed(2)}x${(BOX_HEIGHT * currentScale).toFixed(2)}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    borderWidth: 5,
    borderColor: 'green',
  },
  workspace: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dotted',
    flexGrow: 1,
    flexShrink: 1,
  },
  boxContainer: {
    width: VISIBLE_AREA_WIDTH,
    height: VISIBLE_AREA_HEIGHT,
    alignSelf: 'center',
    borderWidth: 5,
    overflow: 'hidden',
    borderColor: 'lightblue',
  },
  box: {
    zIndex: 20,
    borderWidth: BOX_BORDER_WIDTH,
    borderColor: 'red',
    width: BOX_WIDTH - BOX_BORDER_WIDTH * 2, //subtract border width
    height: BOX_HEIGHT - BOX_BORDER_WIDTH * 2, //subtract border width
    backgroundColor: 'pink',
  },
  output: {
    flex: 1,
    flexGrow: 1,
    padding: 5,
  },
  outputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    paddingVertical: 5,
  },
  outputName: {
    marginRight: 5,
  },
  outputValue: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});
