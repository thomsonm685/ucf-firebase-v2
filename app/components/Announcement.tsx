import { Text } from 'react-native'
import { Card } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';

const Announcement = ({announcement}) => {


  return (
    <Card key={announcement._id}>
        <Card.Title>{announcement.title}</Card.Title>
        <Card.Divider />
        <ImageSlider images={announcement.images} />
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
        {announcement.content}
        </Text>
    </Card>
  )
}

export default Announcement