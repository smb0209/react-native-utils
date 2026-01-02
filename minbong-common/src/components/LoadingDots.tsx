import {useEffect, useRef, useState} from 'react';
import {Animated, Image, Modal, StyleSheet, View} from 'react-native';

import dotFilled from '@/assets/images/loading-dots/dot_filled.png';
import dotEmpty from '@/assets/images/loading-dots/dot_empty.png';


export default function LoadingDots() {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    let targetX = 0;
    if (activeIndex === 0) {
      targetX = -8;
    }
    if (activeIndex === 1) {
      targetX = 0;
    }
    if (activeIndex === 2) {
      targetX = 8;
    }

    Animated.timing(translateX, {
      toValue: targetX,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  return (
    <Modal visible={true} transparent animationType="fade">

      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.dotsRow,
            {transform: [{translateX}]},
          ]}>
          {[0, 1, 2].map(i => (
            <Image
              key={i}
              source={i === activeIndex ? dotFilled : dotEmpty}
              style={styles.dot}
            />
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  overlay: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1CCCA',
    zIndex: 9999,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    marginHorizontal: 6,
  },
});
