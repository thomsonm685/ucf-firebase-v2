import { Text, View } from 'react-native'
import { Card } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';
import { StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const Announcement = ({announcement}) => {

  return (
    <View style={styles.announcementContainer}>
      <Card key={announcement._id}>
          <Card.Title>{announcement.title}</Card.Title>
          <Card.Divider />
          <ImageSlider images={announcement.images} />
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>
          {announcement.content}
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
})