import { ImageZoom } from '@/Image/Zoom2/src';
import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, View, Dimensions, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

const API_KEY = 'YOUR_PEXELS.COM_API_KEY';

const fetchPexelsDotCom = async () => {
  const data = await fetch('https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20', {
    headers: {
      Authorization: API_KEY,
    },
  });

  const { photos } = await data.json();

  return photos;
};

const THUMB_SIZE = 80;
export default () => {
  const [photos, setPhotos] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const getPhotos = async () => {
      // const photos = await fetchPexelsDotCom();
      setPhotos([{ id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }]);
    };
    getPhotos();
  }, []);

  const maxRef = React.useRef<FlatList>();
  const thumbRef = React.useRef();
  const scrollToIndex = (index) => {
    if (index === activeIndex) {
      return;
    }
    maxRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (THUMB_SIZE + 10) - width / 2 + THUMB_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    setActiveIndex(index);
  };

  if (!photos) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden />
      <FlatList
        ref={maxRef}
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(ev) => {
          scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={{ padding: 20, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
              <ImageZoom
                uri={'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg'}
                minScale={0.5}
                minPanPointers={1}
                onInteractionStart={() => console.log('onInteractionStart')}
                onInteractionEnd={() => console.log('onInteractionEnd')}
                onPanStart={() => console.log('onPanStart')}
                onPanEnd={() => console.log('onPanEnd')}
                onPinchStart={() => console.log('onPinchStart')}
                onPinchEnd={() => console.log('onPinchEnd')}
                // style={styles.image}
                resizeMode="contain"
                autoReset={false}
                horizontalOuterRangeOffset={(offset: number) => {
                  // todo
                  // maxRef.current
                  maxRef.current?.scrollToOffset({
                    offset: index * Dimensions.get('window').width + offset,
                    animated: true,
                  });
                }}
                // width={Dimensions.get('window').width}
                // height={Dimensions.get('window').height}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ position: 'absolute', bottom: 80 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                scrollToIndex(index);
              }}
            >
              <Image
                source={{ uri: 'https://linkmore-scm-test.oss-cn-hangzhou.aliyuncs.com/BizFile/4595/Product/1691551892073-3-1ZF2154017.jpg' }}
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: 10,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? 'white' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};
