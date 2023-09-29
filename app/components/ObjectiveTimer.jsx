import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from '@rneui/themed';
import React, { useEffect, useState, Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';




export default function ObjectiveTimer({navigation, objective, addTotalTime, i}){

    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(0);
 
    useEffect(() => {
        let interval = null;
 
        if (running) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [running]);

    useEffect(() => {
        addTotalTime(1);
    }, [time]);
 
 
    const startTimer = () => {
        setRunning(true);
    };
    const stopTimer = () => {
        setRunning(false);
    };


    return(
        <View style={styles.objectiveContainer}>
            <Text style={{fontSize: 20, fontWeight: 300, marginBottom: 5}}>Objective {objective.title}</Text>
            <View style={styles.objectiveStack}>
                <TouchableOpacity>
                {running?
                    <Ionicons
                    onPress={()=>stopTimer()}
                    name='pause-circle-outline'
                    size={50}
                    color='#BC1F2D' />
                :
                <Ionicons
                onPress={()=>startTimer()}
                size={50}
                name='play-outline'
                color='#BC1F2D' />
                }
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: 500}}>{new Date(time * 1000).toISOString().slice(11, 19)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    objectiveContainer:{
        textAlign:'center',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor:'#BC1F2D',
        borderRadius: '8px',
        borderWidth: '1px',
        width: '80%',
        margin: 10,
        padding: 10
    },
    objectiveStack: {
        textAlign:'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
  })
  