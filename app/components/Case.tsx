import { Dimensions, StyleSheet, Text, TouchableOpacity, View,Linking, Alert } from 'react-native'
import { Button, Card, ListItem, Overlay } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';
import { useState } from 'react';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import * as WebBrowser from 'expo-web-browser';

const Case = ({item, navigation}) => {

  const windowWidth =  Dimensions.get('window').width;
  console.log("🚀 ~ file: Case.tsx:7 ~ Case ~ navigation:", navigation)


    const thisCase = item.item;
    console.log("🚀 ~ file: Case.tsx:7 ~ Case ~ thisCase:", thisCase)

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
 
    const [expanded,setExpanded] = useState(false);
    const [selectedObjective,setSelectedObjective] = useState(null);

    const openAnswerKey = async (jotformId) => {
      // try {

        const url = 'https://form.jotform.com/jsform/'+jotformId;
        await WebBrowser.openBrowserAsync('https://www.jotform.com/'+jotformId, {
          controlsColor: "#BC1F2D"
        });
        // Linking.openURL('https://www.jotform.com/'+jotformId)
        // if (await InAppBrowser.isAvailable()) {
        //   const result = await InAppBrowser.open(url, {
        //     // iOS Properties
        //     dismissButtonStyle: 'cancel',
        //     preferredBarTintColor: '#453AA4',
        //     preferredControlTintColor: 'white',
        //     readerMode: false,
        //     animated: true,
        //     modalPresentationStyle: 'fullScreen',
        //     modalTransitionStyle: 'coverVertical',
        //     modalEnabled: true,
        //     enableBarCollapsing: false,
        //     // Android Properties
        //     showTitle: true,
        //     toolbarColor: '#6200EE',
        //     secondaryToolbarColor: 'black',
        //     navigationBarColor: 'black',
        //     navigationBarDividerColor: 'white',
        //     enableUrlBarHiding: true,
        //     enableDefaultShare: true,
        //     forceCloseOnRedirection: false,
        //     // Specify full animation resource identifier(package:anim/name)
        //     // or only resource name(in case of animation bundled with app).
        //     animations: {
        //       startEnter: 'slide_in_right',
        //       startExit: 'slide_out_left',
        //       endEnter: 'slide_in_left',
        //       endExit: 'slide_out_right'
        //     },
        //     headers: {
        //       'my-custom-header': 'my custom header value'
        //     }
        //   })
        // }
        // else Linking.openURL(url)
      // } catch (error) {
      //   Alert.alert(error.message)
      // }
    }


    return (
        <>
        <TouchableOpacity  style={{width: windowWidth < 500?'50%':'33%'}} onPress={toggleOverlay}>
        <Card containerStyle={styles.card}>
          <Card.Image
            source={{
              uri: thisCase.image,
            }}
            style={{objectFit:'contain'}}
          />
          <Card.Title style={{paddingTop: 10}}>{thisCase.title}</Card.Title>
        </Card> 
        </TouchableOpacity >

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} style={styles.overlayContainer}>
            <Text style={styles.textPrimary}>Select Objective:</Text>
            {thisCase.objectives.map(objective=>(
              <Button 
                  key={objective._id}
                  type='outline'
                  title={objective.title}
                  onPress={()=>{
                      // toggleOverlay();
                      // navigation.navigate('Answer Key',{objective});
                      openAnswerKey(objective.jotformId);
                  }}
                  style={{margin:10}}
              />
            ))}
        </Overlay>
        </>
        // <ListItem.Accordion
        // content={
        //     <>
        //     {/* <Icon name="place" size={30} /> */}
        //     <ListItem.Content>
        //         <ListItem.Title>{thisCase.title}</ListItem.Title>
        //     </ListItem.Content>
        //     </>
        // }
        // isExpanded={expanded}
        // onPress={() => {
        //     setExpanded(!expanded);
        // }}
        // >
        // {thisCase.objectives.map(objective=>(
        //     <Button 
        //         key={objective._id}
        //         type='outline'
        //         title={objective.title}
        //         onPress={()=>navigation.navigate('Answer Key',{objective})}
        //     />
        // ))}
        // </ListItem.Accordion>
        // <Card key={thisCase._id}>
        //     <Card.Title>{thisCase.title}</Card.Title>
        //     <Card.Divider />
        // </Card>
    )
}

export default Case;

const styles = StyleSheet.create({
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
    // width: cardWidth
  },
  card: {
    cursor:'pointer'
  },
  overlayContainer: {
    padding: 10,
    width: '80%',
    maxWidth: 600,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center'
  }
  
})