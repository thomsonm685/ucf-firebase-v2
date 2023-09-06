import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../firebaseConfig'
import Ionicons from '@expo/vector-icons/Ionicons'
import {Entypo} from '@expo/vector-icons'


export interface w {
    title: string;
    done: boolean;
    id: string;
}

const List = ({navigation} : any) => {
    
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    const addTodo = async () => {
        await addDoc(collection(FIRESTORE_DB, 'todos'), {title: todo, done: false});
        setTodo('');
    }

    useEffect(()=>{
        const todoRef = collection(FIRESTORE_DB,'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: any[] = [];
                snapshot.docs.forEach(doc=>{
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Todo);
                })
                setTodos(todos);
            },
        });
        
        return () => subscriber();
    }, []);

    const renderTodo = ({item}:any) => {

        const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

        const toggleDone = async () => {
           await updateDoc(ref, {done: !item.done}); 
        }

        const deleteItem = async () => {
            await deleteDoc(ref); 
        }


        return(
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done ? <Ionicons name='md-checkmark-circle' size={24} color='green' /> : <Entypo size={24} name='circle' />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name='trash-bin-outline' size={24} color='red' onPress={deleteItem} />
            </View>
        )
    }

    return (
    <View style={styles.container}>
        <View>
            <TextInput placeholder='Add Todo' onChangeText={input=>setTodo(input)} value={todo}/>
            <Button title="Add Todo" disabled={todo===''} onPress={addTodo}/>
        </View>
        <View>
            <FlatList 
                data={todos}
                renderItem={renderTodo}
                keyExtractor={(todo: Todo) => todo.id}
            />
        </View>        
        {/* <Button 
        title="Details Page"
        onPress={()=>navigation.navigate('Details')}
        /> */}
    </View>
    )
}

export default List

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
    },
    form:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 20,
    },
    input:{
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff'
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 4
    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,

    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
})