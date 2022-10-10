import { View, Text, FlatList, Image, TouchableOpacity,StyleSheet, Linking } from 'react-native'
import React, {useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/ContextProver'
import EncryptedStorage from 'react-native-encrypted-storage';

export default function CardHomeContainer() {

const {
    colorCardBackGraound,
    colorTextTitle,
    colorLineCard,
    colorTextDescriptionAndLanguage,
    imageStar,
    colorStarAndTextFavorite,
    colorButtonFavorite,
    colorCircle,
    paddingContainer,
    paddingCardHorizontal,
    paddingCardVertical,
    textFontSize,
    reposGitHubUserDataAPI,
    setReposGitHubUserDataAPI,
    setFavoriteDataStorageGitHubUser,
    favoriteDataStorageGitHubUser,
    listCardFavorite,
    listStorageFinal,
    setListCardFavorite,
    textButtonFavorite,
    textNoLanguage, 
    textNoDescription
} = useContext(AuthContext) 

function Footer(){
  return(
    <View style={{height:80}}/>
  )
}

function handleAddFavorite(index: any){
  const elementSelect = index
  setFavoriteDataStorageGitHubUser(index)
  setTimeout(()=>{
    setReposGitHubUserDataAPI(reposGitHubUserDataAPI?.filter(function(value, index, arr){ 
      return index != elementSelect ;
    }))
  },300)
  setTimeout(()=>{
    setFavoriteDataStorageGitHubUser(undefined)
  },500)
}

// STORAGE LIST FAVORITE 
const storageFavorite = (chave: any,valor: any) => {
  EncryptedStorage.setItem(chave,valor)
}

let listSelectBASE = reposGitHubUserDataAPI && favoriteDataStorageGitHubUser  ? reposGitHubUserDataAPI[favoriteDataStorageGitHubUser] : undefined
let listSelectID = [listSelectBASE?.id]

useEffect(()=>{
  if(listCardFavorite.length === 0 || listCardFavorite === undefined){
    setListCardFavorite(listStorageFinal)
  }else{}
  if(listStorageFinal.length === 0 && listCardFavorite.length === 0 ){
    setListCardFavorite([])
  }else{}
  if(listSelectBASE !== undefined){
      // REFAZENDO ENDPOINT PARA SALVAR NO STORAGE APENAS DADOS NECESSÁRIO
      let listSelectFullName = [listSelectBASE?.full_name]
      let listSelectDescription = [listSelectBASE?.description]
      let listSelectwnerAvatarUrl= [listSelectBASE?.owner.avatar_url]
      let listSelectStarCount = [listSelectBASE?.stargazers_count]
      let listSelectLanguage = [listSelectBASE?.language]
      let listSelectHtmlUrl = [listSelectBASE?.html_url]
        listSelectID.forEach((idFor, index) => {
          let id = idFor
          let full_name = listSelectFullName[index]
          let description = listSelectDescription[index]
          let ownerAvatar_url = listSelectwnerAvatarUrl[index]
          let stargazers_count = listSelectStarCount[index]
          let language = listSelectLanguage[index]
          let html_url = listSelectHtmlUrl[index]
          listCardFavorite.push({id,full_name, description,ownerAvatar_url,stargazers_count,language,html_url})
        })
        if(listCardFavorite.length > 0 || listCardFavorite !== undefined){
          storageFavorite('storageListFavorite',JSON.stringify(listCardFavorite))
        }else{}
    }else{}
},[favoriteDataStorageGitHubUser])

  return (
    <View style={{paddingHorizontal:paddingContainer}}>
          {
           reposGitHubUserDataAPI && (
            <View>
              <FlatList
              data={reposGitHubUserDataAPI}
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
                      <Image source={{uri: item.owner.avatar_url}}
                      style={styles.cardLogo} />
                    </View>

                    <View style={{paddingVertical:paddingCardVertical}}>
                      <View style={{height:1, backgroundColor:colorLineCard}}/>
                    </View>

                    <View>
                      <Text style={{fontSize:textFontSize, color:colorTextDescriptionAndLanguage}}>
                        {item.description ?? textNoDescription}
                      </Text>
                    </View>

                    <View style={{paddingVertical:paddingCardVertical}}/>

                    <View style={styles.cardStarButtonStarCountLanguage}>

                      <TouchableOpacity onPress={() => handleAddFavorite(index)}
                      style={[ styles.cardFavoriteButton,{backgroundColor:colorButtonFavorite}]}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Image source={imageStar} 
                          style={[styles.imageStarButton,{tintColor:colorStarAndTextFavorite}]}/>
                          <Text style={{fontSize:textFontSize, fontWeight:'bold',color:colorStarAndTextFavorite}}>
                            {textButtonFavorite}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <View style={styles.containerImageStarCount}>
                        <Image source={imageStar} 
                        style={[styles.imageStarCount,{tintColor:colorStarAndTextFavorite}]}/>
                        <Text style={{fontSize:textFontSize, color:colorTextDescriptionAndLanguage}}>
                          {item.stargazers_count}
                        </Text>
                      </View>

                      <View style={styles.containerCircleAndLanguage}>
                        <View style={[styles.circle,{backgroundColor:colorCircle}]}/>
                        <Text style={{fontSize:textFontSize, color:colorTextDescriptionAndLanguage}} >
                          {item.language ?? textNoLanguage}
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
  cardStarButtonStarCountLanguage:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between'
  },
  cardFavoriteButton:{
    paddingHorizontal:10, 
    paddingVertical:8,
    borderRadius:4,
    marginRight:20
  },
  imageStarButton:{
    width:20, 
    height:20,  
    marginRight:8
  },
  imageStarCount:{
    width:20,
    height:20, 
    marginRight:6
  },
  containerImageStarCount:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center', 
    width:80
  },
  containerCircleAndLanguage:{
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'flex-end',
    width:100
  },
  circle:{
    width:8,
    height:8, 
    borderRadius:20,
    marginRight:6
  },
});