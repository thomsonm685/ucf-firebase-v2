import { Text } from 'react-native'
import { Button, Card, ListItem } from '@rneui/themed';
import ImageSlider from '../components/ImageSlider';
import { useState } from 'react';

const Case = ({thisCase, navigation}) => {

    const [expanded,setExpanded] = useState(false);

    return (
        <ListItem.Accordion
        content={
            <>
            {/* <Icon name="place" size={30} /> */}
            <ListItem.Content>
                <ListItem.Title>{thisCase.title}</ListItem.Title>
            </ListItem.Content>
            </>
        }
        isExpanded={expanded}
        onPress={() => {
            setExpanded(!expanded);
        }}
        >
        {thisCase.objectives.map(objective=>(
            <Button 
                key={objective._id}
                type='outline'
                title={objective.title}
                onPress={()=>navigation.navigate('Answer Key',{objective})}
            />
        ))}
        </ListItem.Accordion>
        // <Card key={thisCase._id}>
        //     <Card.Title>{thisCase.title}</Card.Title>
        //     <Card.Divider />
        // </Card>
    )
}

export default Case