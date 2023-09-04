import React from "react";
import {Text ,View , Image , StyleSheet} from 'react-native' ;
  
const AddGifImage = () => {
    return (
        <View style={Styles.container}>
          <Image
            style ={{width: '100%', height:80, backgroundColor:'red'}}
            source={{ uri : "https://media.geeksforgeeks.org/wp-content/uploads/20220221170632/ezgifcomgifmaker1.gif"}}
            resizeMode='stretch'
          />
        </View>
      );
}
  
const Styles = StyleSheet.create({
    container :{
        // alignContent:'center',
        //margin:25
    }
})
  
export default AddGifImage;