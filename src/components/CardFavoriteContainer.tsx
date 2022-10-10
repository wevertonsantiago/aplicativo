import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import React, {useContext, useEffect, useReducer} from 'react'

import { AuthContext } from '../contexts/ContextProver'

export default function CardFavoriteContainer() {

  const {
    colorCardBackGraound,
    colorTextTitle,
    colorLineCard,
    colorTextDescriptionAndLanguage,
    imageStar,
    colorStarAndTextFavorite,
    colorCircle,
    paddingContainer,
    paddingCardHorizontal,
    paddingCardVertical,
    textFontSize,
    listStorageFinal,
    textNoLanguage, 
    textNoDescription
} = useContext(AuthContext) 

const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

useEffect(()=>{
  setTimeout(()=>{
    forceUpdate()
  },500)
},[])

function Footer(){
  return(
    <View style={{height:80}}/>
  )
}

  return (
    <View style={{paddingHorizontal:paddingContainer}}>
          {
           listStorageFinal && (
            <View>
              <FlatList
              data={listStorageFinal}
              ListFooterComponent={<Footer/>}
              ItemSeparatorComponent={()=>(<View style={{height:10}}/>)}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {

                const textTitleUserRepos = item.full_name.split('/')
               
                return(
                  <TouchableOpacity key={item.id}
                  onPress={() => Linking.openURL(item.html_url)}
                  style={[styles.containerCard,{
                    paddingHorizontal:paddingCardHorizontal,
                    paddingVertical:paddingCardVertical,
                    backgroundColor:colorCardBackGraound,
                    borderRadius:4
                    }]}>
  
                    <View style={styles.cardTextAndLogo}>

                      <View style={{flexDirection:'row'}}>
                        <Text 
                        style={{fontSize:textFontSize, color:colorTextTitle}}>
                          {textTitleUserRepos[0]}
                        </Text>
                        <Text 
                        style={{fontSize:textFontSize, color:colorTextTitle, fontWeight:'bold'}}>
                          /{textTitleUserRepos[1]}
                        </Text>
                      </View>

                      <Image source={{uri: item.ownerAvatar_url}}
                      style={styles.cardLogo} />

                    </View>

                    <View style={{paddingVertical:paddingCardVertical}}>
                      <View style={{height:1, backgroundColor:colorLineCard}}/>
                    </View>

                    <View>
                      <Text style={{fontSize:textFontSize, color:colorTextDescriptionAndLanguage}}>
                        {item.description ?? textNoLanguage}
                      </Text>
                    </View>

                    <View style={{paddingVertical:paddingCardVertical}}/>

                    <View style={[styles.cardStarCountLanguage]}>

                      <View style={[styles.containerImageStarCount]}>
                        <Image source={imageStar} 
                        style={[styles.imageStarCount,{tintColor:colorStarAndTextFavorite}]}/>
                        <Text style={{fontSize:textFontSize, color:colorTextDescriptionAndLanguage}}>
                          {item.stargazers_count}
                        </Text>
                      </View>

                      <View style={[styles.containerCircleAndLanguage]}>
                        <View style={[styles.circle,{backgroundColor:colorCircle}]}/>
                        <Text style={{fontSize:textFontSize, color:colorTextDescriptionAndLanguage}} >
                          {item.language ?? textNoDescription}
                        </Text>
                      </View>

                    </View>
                    
                  </TouchableOpacity>
                )
              } 
            }
            />
            </View>
           ) 
          }
    </View>
  )
}

const styles = StyleSheet.create({
  containerCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4
  },
  cardTextAndLogo:{
    flexDirection:'row', 
    justifyContent:'space-between',
    alignItems:'center'
  },
  cardLogo:{
    width: 29, 
    height: 29,
    borderRadius:20
  },
  cardStarCountLanguage:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between'
  },
  containerImageStarCount:{
    flexDirection:'row', 
    alignItems:'center'
  },
  containerCircleAndLanguage:{
    flexDirection:'row', 
    alignItems:'center'
  },
  imageStarCount:{
    width:20,
    height:20, 
    marginRight:6
  },
  circle:{
    width:8,
    height:8, 
    borderRadius:20,
    marginRight:6
  },
});