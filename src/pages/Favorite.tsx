import { View} from 'react-native'
import React, {useContext} from 'react'

import { AuthContext } from '../contexts/ContextProver'
import Header from '../components/Header'
import CardFavoriteContainer from '../components/CardFavoriteContainer'

export default function Favorite() {

  const { colorBackGraound,listCardFavoriteStorage } = useContext(AuthContext)
  
  return (
    <View style={{flex:1, backgroundColor:colorBackGraound}}>
      <Header/>
      {
          listCardFavoriteStorage && (
          <CardFavoriteContainer/>
        )
      }
    </View>
  )
}