import { View, Text, ScrollView, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card, ListItem } from '@rneui/themed';
import ScreenTitle from '../components/ScreenTitle'; 
import ImageSlider from '../components/ImageSlider';
import Announcement from '../components/Announcement';
import Case from '../components/Case';

const CaseTimers = ({navigation}) => {
  const cardRows = (Dimensions.get('window').width) < 500 ? 2 : 3;
  const windowWidth =  Dimensions.get('window').width;

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  // const appendFormTest = async () => {  
  //   const formSourceReq = await fetch('https://api.jotform.com/form/193535797748176/source?apikey=f2499e61ca51b029d77282c75d0fc892').then(d=>d.json());
  //   const formHtmlString = formSourceReq.content;
  //   // const parser = new DOMParser();
  //   // const formHTML = parser.parseFromString(formHtmlString,'text/html');
  //   document.querySelector('#theForm').innerHTML = formHtmlString.replace('\\"', '');
  // }

  const loadInitial = async () => {
    setLoading(true);
    try{
      const fetchCases = await fetch('https://f62247e0dfc9.ngrok.app/api/cases').then(d=>d.json());
      // console.log("🚀 ~ file: Announcements.tsx:17 ~ loadInitial ~ fetchAnnouncements:", fetchAnnouncements);
      setCases(fetchCases.data.cases);
      setLoading(false);
    }
    catch(e){
      console.log('ERROR in fetchCases:', e);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      user?'':navigation.navigate('Start Page');
    });
    loadInitial();
  }, [])

  return (
    // <View style={{marginBottom:50}}>
    //   <ScreenTitle title="TIMERS"/>
    //   <ScrollView style={{height:'90%'}}>
    //     {loading?
    //     <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
    //       <ActivityIndicator size={"large"} color="#BC1E2E"/>
    //     </View>
    //     :    
    //     <View>
    //     {cases.map(thisCase=>(
    //         <ListItem>
    //             <Text >Case:</Text>
    //             <Text>{thisCase.title}</Text>
    //             <Button size='sm' title={'Timer'} onPress={()=>navigation.navigate('Timer', {state:thisCase})}></Button>
    //         </ListItem>
    //     ))}
    //     </View>                      
    //     }
    //   </ScrollView> 
    // </View>
    <View style={{marginBottom:50}}>
      <ScreenTitle title="TIMERS" navigation={navigation}/>
      <Text style={styles.subheading}>Choose the case to time:</Text>
      <View style={{height:'90%'}}>
        {loading?
        <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="#BC1E2E"/>
        </View>
        :    
        <FlatList horizontal={false} numColumns={cardRows}
          data={cases}
          renderItem={({item}) => {
            return(
            <TouchableOpacity  style={{width: windowWidth < 500?'50%':'33%'}} onPress={()=>navigation.navigate('Case Timer', {thisCase:item})}>
              <Card>
                <Card.Image
                  source={{
                    uri: item.image,
                  }}
                  style={{objectFit:'contain', opacity: .8}}
                />
                <Card.Title>{item.title}</Card.Title>
              </Card>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item._id}
        >
          {/* {cases.map(thisCase=>(
            <Case key={thisCase._id} thisCase={thisCase} navigation={navigation} />
          ))} */}
        </FlatList>                      
        }
      </View>
    </View>
  )
}

export default CaseTimers

const styles = StyleSheet.create({
  subheading:{
    textAlign:'center',
    color: '#BC1F2D',
    fontSize: 15,
    margin: 10,
    fontWeight: 500
  },
})