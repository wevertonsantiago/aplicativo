import { View, ActivityIndicator, StatusBar} from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../contexts/ContextProver'

import Header from '../components/Header'
import CardHomeContainer from '../components/CardHomeContainer'

export default function Home() {

  const {
    colorBackGraound, 
    reposGitHubUserDataAPI,
    loading
  } = useContext(AuthContext)  

  return (
    <View style={{flex:1, backgroundColor:colorBackGraound}}>
      <StatusBar barStyle={'dark-content'}/>
        <Header/>
        {
          !loading && (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size={'large'}/>
            </View>
          )
        }

        {
          reposGitHubUserDataAPI && loading && (
            <CardHomeContainer/>
          )
        }
    </View>
  )
}