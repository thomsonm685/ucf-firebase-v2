

// import ImageViewer from 'react-native-image-zoom-viewer';
// import Modal from "react-native-modal";
// import FastImage from "react-native-fast-image";
// import { createImageProgress } from "react-native-image-progress";
// import { ActivityIndicator } from 'react-native';

// export default function ZoomModal({images, visible}){
//     const Image = createImageProgress(FastImage);
//     alert(images[0])

//     const renderImage = ({ source, style }) => {
//         alert('source:'+source);
//         return (
//             <Image
//                 source={{ uri: source?.uri, priority: 'high' }}
//                 style={style}
//                 resizeMode="contain"
//                 indicator={renderLoading}
//             />
//         )
//     }

//     const renderLoading = () => {
//         return (<ActivityIndicator color={'white'} size={'large'} />)
//     }

//     return(
//     <Modal visible={visible} transparent={true}>

//     {/* <CrossIcon onPress={closeModal} /> */}

//     <ImageViewer
//         enablePreload={true}
//         index={0}
//         imageUrls={images}
//         useNativeDriver={true}
//         enableSwipeDown={false}
//         renderImage={renderImage}
//         loadingRender={renderLoading}
//         backgroundColor='#fff'
//         saveToLocalByLongPress={false}
//     />

//     </Modal>
//     )
// }

import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { color } from '@rneui/base';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

 
export default function ZoomModal ({images,visible, setVisible}){
    return (
        <Modal visible={visible} transparent={true}>
            <Pressable style={styles.closeIcon} onPress={()=>setVisible(false)}>
                <FontAwesomeIcon icon={faXmarkCircle} color={"#fff"} size={50}/>
            </Pressable>
            <ImageViewer imageUrls={images}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        left: '80%',
        top: '9%',
        zIndex: 100
    }
})