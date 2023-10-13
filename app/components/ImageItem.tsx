import { Card } from "@rneui/themed";
import { Dimensions, StyleSheet, View } from "react-native";
import ZoomModal from "./ZoomModal";
import { useState } from "react";

const width = (Dimensions.get('window').width-60) > 700 ? 650 : Dimensions.get('window').width-60;


export default function ImageItem ({item}) {
        const [visible, setVisible] = useState(false);
        
        return (
        <>
        <View>
            <Card.Image
            onPress={()=>setVisible(true)}
            style={styles.image}
            source={{
            uri:item.url,
            }}
        />
        </View>
        <ZoomModal visible={visible} images={[{url:item.url}]} setVisible={setVisible} />
        </>
    )
}


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