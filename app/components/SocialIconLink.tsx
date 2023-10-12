import { Dimensions, StyleSheet, Text, TouchableOpacity, View,Linking, Alert } from 'react-native'
import { Button, Card, ListItem, Overlay } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';
import { useState } from 'react';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import * as WebBrowser from 'expo-web-browser';
import { SocialIcon, SocialIconProps } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth =  Dimensions.get('window').width;

const SocialIconLink = ({url, icon}) => {

    // const {url, icon} = item.item;
    console.log('url:',url);
    console.log('icon:',icon);


    const openSocialLink = async () => {
        await WebBrowser.openBrowserAsync(url, {
            controlsColor: "#BC1F2D"
        });
    }


    return (
        <TouchableOpacity  style={styles.iconContainer} onPress={openSocialLink} key={icon}>
        {icon==="tiktok"?
        <></>
        // <Ionicons
        // name='tiktok'
        // size={50}
        // onPress={openSocialLink}
        //  />
        :
        <SocialIcon
        type={icon}
        iconType={'font-awesome'}
        key={icon}
        iconSize={40}
        onPress={openSocialLink}
        />}
        </TouchableOpacity >
    )
}

export default SocialIconLink;

const styles = StyleSheet.create({
  iconContainer: {
    // width: windowWidth < 500?'50%':'33%',
    padding: 10
  },
//   textPrimary: {
//     marginVertical: 20,
//     textAlign: 'center',
//     fontSize: 20,
//     // width: cardWidth
//   },
//   card: {
//     cursor:'pointer'
//   },
//   overlayContainer: {
//     padding: 10,
//     width: '80%',
//     maxWidth: 600,
//     display: 'flex',
//     justifyContent: "center",
//     alignItems: 'center'
//   }
  
})