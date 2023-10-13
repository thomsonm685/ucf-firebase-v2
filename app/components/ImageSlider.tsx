import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Card } from '@rneui/themed';
import { useState } from 'react'
import ZoomModal from './ZoomModal';
import ImageItem from './ImageItem';

const width = (Dimensions.get('window').width-60) > 700 ? 650 : Dimensions.get('window').width-60;

function ImageSlider({images}) {
    // const width = (Dimensions.get('window').width-60) > 700 ? 650 : Dimensions.get('window').width-60;
    const [currentIndex, setCurrentIndex] = useState(0);


  return (
    <View style={styles.imageContainer}>
        <Carousel
        loop={false}
        width={width}
        height={width}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({item}) => <ImageItem item={item} />}
        />
        {images.length>1?
        <View style={styles.dotsContainer}>
        {images.map((image,i)=>(
            <View key={i} style={i===currentIndex?styles.activeDotItem:styles.dotsItem}/>
        ))}
         </View>
         :''
        }
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
    },
    dotsContainer: {
        margin:10,
        display: 'flex', 
        justifyContent:'center',
        flexDirection: 'row',
    },
    dotsItem: {
        width: 10, 
        height: 10, 
        borderRadius: 50,
        borderColor: 'gray', 
        borderWidth: 1,
        borderStyle: 'solid',
        margin: 3
    },
    activeDotItem: {
        width: 10, 
        height: 10, 
        borderRadius: 50,
        borderColor: 'gray', 
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'gray',
        margin: 3
    }
})

export default ImageSlider;