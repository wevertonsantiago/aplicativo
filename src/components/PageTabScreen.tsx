import { View, SafeAreaView, Image,StatusBar ,TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from '../contexts/ContextProver'
import Home from '../pages/Home'
import Favorite from '../pages/Favorite'
import ModalTextInputUser from './ModalTextInputUser'

export type RootStackParamList = {
  Tap: undefined
  Home: {name: string}
  Favorite: {name: string}

}

export default function PageTabScreen() {

const {
    colorBackGraound,
    colorTabBottomBackGround, 
    colorTabBottomActive,
    colorTabBottomInactive,
    imageHomeTabBottom,
    imageFavoriteTabBottom,
    isModalVisibleTextInputUser

} = useContext(AuthContext)    

const Tab = createBottomTabNavigator()

  return (
    <View style={{flex:1}}>
    <SafeAreaView 
    style={{backgroundColor:colorBackGraound}}/>
    <SafeAreaView 
    style={{flex:1, backgroundColor:colorTabBottomBackGround}}>
      <Tab.Navigator>
          
          <Tab.Screen name="Home" component={Home} 
          options={{ 
            headerShown:false, 
            tabBarShowLabel:false,
            tabBarIcon:({focused}) => {
              return(
                <View>
                    <Image source={imageHomeTabBottom}
                    style={{
                      width:32, height:32,
                      tintColor: focused ? colorTabBottomActive : colorTabBottomInactive 
                    }}
                    />
                </View>
               )
              }
            }}/>

          <Tab.Screen name="Favorite" component={Favorite} 
             options={{ 
               headerShown:false, 
               tabBarShowLabel:false,
               tabBarIcon:({focused}) => {
                 return(
                   <View>
                        <Image source={imageFavoriteTabBottom}
                        style={{
                          width:32, height:32,
                          tintColor: focused ? colorTabBottomActive : colorTabBottomInactive 
                        }}
                        />
                    </View>
                   )
                  }
                }}/>

      </Tab.Navigator>
                {
                  isModalVisibleTextInputUser && (
                    <View
                      style={{backgroundColor:'#07070740', position:'absolute' ,height:'100%', width:'100%'}}>
                        <ModalTextInputUser/>
                    </View>    
                  )
                }
    </SafeAreaView>
  </View>
  )
}