import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import * as React from 'react';
import { Card } from '@rneui/themed';

const width = (Dimensions.get('window').width-60) > 700 ? 650 : Dimensions.get('window').width-60;

function ImageSlider({images}) {
    // const width = (Dimensions.get('window').width-60) > 700 ? 650 : Dimensions.get('window').width-60;


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
            <View>
                <Card.Image
                style={styles.image}
                source={{
                uri:item.url,
                }}
            />
            </View>
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
        maxWidth: 700,
        width: '100%'
    },
    image: {
        width: width,
        height: width,
        // height: width*1,
        objectFit: 'contain'
    }
})

export default ImageSlider;