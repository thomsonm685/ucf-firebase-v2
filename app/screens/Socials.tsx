import { View, Text, ScrollView, ActivityIndicator, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card } from '@rneui/themed';
import ScreenTitle from '../components/ScreenTitle'; 
import ImageSlider from '../components/ImageSlider';
import Announcement from '../components/Announcement';
import Case from '../components/Case';
import SocialIconLink from '../components/SocialIconLink';

const Socials = ({navigation}) => {

  const cardRows = (Dimensions.get('window').width) < 500 ? 2 : 3;


  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInitial = async () => {
    setLoading(true);
    try{
      const fetchSettings = await fetch('https://ucf-server-2c6f04fbd850.herokuapp.com/api/settings').then(d=>d.json());
      setSocials(fetchSettings.data.settings.socials);
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
    <View style={{marginBottom:50}}>
      <ScreenTitle navigation={navigation} title="SOCIALS"/>
      <Text style={styles.subheading}>Visit us on social media:</Text>
      <View>
        {loading?
        <View style={{height:500, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="#BC1E2E"/>
        </View>
        :    
        // <FlatList horizontal={false} numColumns={cardRows}
        //   data={socials}

        //   renderItem={(social) => <SocialIconLink item={social} key={social.icon}/>}
        //   keyExtractor={item => item.icon}
        // >
        // </FlatList>         
        <View style={styles.iconList}>
            {socials.filter(s=>s.url && s.url!=="").map(social=>(
                <SocialIconLink url={social.url} icon={social.icon} key={social.name}/>
            ))}
        </View>             
        }
      </View>
    </View>
  )
}

export default Socials;

const styles = StyleSheet.create({
    iconList: {
        display: 'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    subheading:{
        textAlign:'center',
        color: '#BC1F2D',
        fontSize: 15,
        margin: 10,
        fontWeight: 500
    },
})