import { Text, View } from 'react-native'
import { Card } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const Announcement = ({announcement}) => {
 


  const openLink = async (url) => {
    await WebBrowser.openBrowserAsync(url, {
        controlsColor: "#BC1F2D"
    });
}

  return (
    <View style={styles.announcementContainer}>
      <Card key={announcement._id}>
          <Card.Title>{announcement.title}</Card.Title>
          <Card.Divider />
          <ImageSlider images={announcement.images} />
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>

        {  announcement.content.split('$*').map(x=>{
              try{
                let urlthing = JSON.parse(x);
                return(<Text onPress={()=>openLink(urlthing.url)} style={styles.signUpLink}>{urlthing.name}</Text>)
              }
              catch(e){
                return(<Text>{x}</Text>)
              }
            })
  }
          </Text>
      </Card>
    </View>
  )
}

export default Announcement;

const styles = StyleSheet.create({
  announcementContainer:{
    maxWidth: 700
  },
  signUpLink:{
    color:'blue'
  },
})