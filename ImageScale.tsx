import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const ImageTest = () => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }, { scale: scale.value }, { rotateZ: `${rotation.value}rad` }],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(dragGesture, Gesture.Simultaneous(zoomGesture));

  return (
    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, flex: 1, overflow: 'hidden' }}>
      <GestureDetector gesture={composed}>
        <Animated.Image
          source={{ uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg' }}
          style={[animatedStyles, { flex: 1, width: Dimensions.get('window').width, height: 400 }]}
        />
      </GestureDetector>
    </View>
  );
};

export default ImageTest;
