import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, ListItem, Overlay } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';
import { useState } from 'react';


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


    return (
        <>
        <TouchableOpacity  style={{width: windowWidth < 500?'50%':'33%'}} onPress={toggleOverlay}>
        <Card containerStyle={styles.card}>
          <Card.Image
            source={{
              uri: thisCase.image,
            }}
            style={{objectFit:'contain', opacity: .8}}
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
                  title="ASDBAGL ALKSSA"
                  onPress={()=>{
                      toggleOverlay();
                      navigation.navigate('Answer Key',{objective});
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