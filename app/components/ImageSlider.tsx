import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import * as React from 'react';
import { Card } from '@rneui/themed';

const width = Dimensions.get('window').width-60;

function ImageSlider({images}) {
    const width = Dimensions.get('window').width-60;


  return (
    <View style={styles.imageContainer}>
        <Carousel
        loop={false}
        width={width}
        height={width}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({item}) => (

            <Card.Image
                style={styles.image}
                source={{
                uri:item.url,
                }}
            />
        )}
        />

    </View>
  );
};

const styles = StyleSheet.create({
    imageContainer:{
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        // height: width*1,
        objectFit: 'contain'
    }
})

export default ImageSlider;