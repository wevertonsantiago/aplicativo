import { Alert } from 'react-native'
import React,{createContext,useEffect,PropsWithChildren, useState, useRef} from 'react'
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

interface IProps{
    children: React.ReactElement
}

interface IReposGitHubUserDataAPI{
  id: number,
  full_name: string, 
  description: string, 
  owner: any,
  stargazers_count: number, 
  language:string, 
  html_url:string
  item: any
}
export interface IFavoriteDataStorageGitHubUser{
  item: any
}

export interface ITasksContext{
    colorBackGraound: string
    colorTabBottomBackGround: string
    colorTabBottomActive: string
    colorTabBottomInactive: string
    colorCardBackGraound: string
    colorStarAndTextFavorite: string
    colorButtonFavorite: string
    colorLineCard: string
    colorTextTitle: string
    colorTextDescriptionAndLanguage: string
    colorCircle: string
    colorChanceUserIcon: string
    colorButtonSaveTestInputUser: string
    colorButtonClose: string
    imageLogo: any
    imageChanceUserIcon: any
    imageHomeTabBottom: any
    imageFavoriteTabBottom: any
    imageStar: any
    imageClose: any
    paddingContainer: number
    paddingCardVertical: number
    paddingCardHorizontal: number
    textFontSize: number
    reposGitHubUserDataAPI: IReposGitHubUserDataAPI[] | readonly any[] | undefined,
    setReposGitHubUserDataAPI: React.Dispatch<React.SetStateAction<any>>,
    setTextInputUserGitHub: React.Dispatch<React.SetStateAction<string>>,
    textInputUserGitHub: string,
    setIsModalVisibleTextInputUser: React.Dispatch<React.SetStateAction<boolean>>,
    isModalVisibleTextInputUser: boolean,
    setIsKeyboarActiveTextInputUser: React.Dispatch<React.SetStateAction<boolean>>,
    isKeyboarActiveTextInputUser: boolean,
    setSearchNewReposGitHub: React.Dispatch<React.SetStateAction<boolean>>,
    searchNewReposGitHub: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setFavoriteDataStorageGitHubUser: React.Dispatch<React.SetStateAction<number | undefined>>,
    favoriteDataStorageGitHubUser: number | undefined
    loading: boolean,
    setListCardFavorite: React.Dispatch<React.SetStateAction<any[]>>,
    listCardFavorite: any[],
    setListCardFavoriteStorage: React.Dispatch<React.SetStateAction<any>>,
    listCardFavoriteStorage: any ,
    newListSelect: any[],
    storageFavorite: any,
    listStorageFinal: any [],
    textButtonFavorite: string,
    textNoLanguage: string, 
    textNoDescription: string,
    textNameUserTitle: string,
    textButtonSaveUser: string 
}

export const AuthContext = createContext<ITasksContext>( {} as ITasksContext)

export default function ContextProver({children}: PropsWithChildren<IProps>) {

const [ reposGitHubUserDataAPI, setReposGitHubUserDataAPI ] = useState<[] | undefined>()
const [ favoriteDataStorageGitHubUser, setFavoriteDataStorageGitHubUser] = useState<number | undefined>(undefined)
const [ listCardFavorite, setListCardFavorite ] = useState<any[]>([])
const [ listCardFavoriteStorage, setListCardFavoriteStorage ] = useState<any>()
const [ textInputUserGitHub, setTextInputUserGitHub ] = useState<string>('')
// 'wevertonsantiago'
const [ isModalVisibleTextInputUser, setIsModalVisibleTextInputUser ] = useState<boolean>(false) 
const [ isKeyboarActiveTextInputUser, setIsKeyboarActiveTextInputUser ] = useState<boolean>(false)
const [ searchNewReposGitHub, setSearchNewReposGitHub ] = useState<boolean>(false)
const [ loading, setLoading ] = useState<boolean>(true)

const noInitialRenderEffect= useRef(false)
const noInitialRenderEffectAPI= useRef(false)
let newListSelect: any = []
const navigation = useNavigation()

// COLOR PAGE GLOBAL
const colorBackGraound: string = '#F6F6F5'
const colorTabBottomBackGround: string = '#fff'
const colorTabBottomActive: string = '#070707'
const colorTabBottomInactive: string = '#9A9A9A'
// COLOR CARD CONTAINER
const colorCardBackGraound: string = '#fff'
const colorStarAndTextFavorite: string = '#FFD02C'
const colorButtonFavorite: string = '#FAF3DC'
const colorLineCard: string = '#DADADA'
const colorTextTitle: string = '#070707'
const colorTextDescriptionAndLanguage: string = '#9A9A9A'
const colorCircle: string = '#F22828'
const colorChanceUserIcon: string ='#070707' 
const colorButtonSaveTestInputUser: string = '#D9D9D9'
const colorButtonClose: string = '#070707'

// IMAGE HEADER
const imageLogo: any = require('../assets/WeFit.png')
const imageChanceUserIcon: any = require('../assets/chanceUserIcon.png')
// IMAGE TAB BOTTOM
const imageHomeTabBottom: any = require('../assets/GitHub.png')
const imageFavoriteTabBottom: any = require('../assets/Star.png')
// IMAGE CARD
const imageStar: any = require('../assets/Star.png')
const imageClose: any = require('../assets/Close.png')

// PADDING
const paddingContainer: number = 20
const paddingCardVertical: number = 12
const paddingCardHorizontal: number = 16

// TEXT
const textFontSize: number = 12
const textButtonFavorite: string = 'Favoritar'
const textNoLanguage: string = 'Não tem linguagem'
const textNoDescription: string = 'Não tem descrição'
const textNameUserTitle: string = 'Alterar usuário selecionado'
const textButtonSaveUser: string = 'Salvar'

// ENDPOINT
axios.defaults.baseURL = 'https://api.github.com/users/'

useEffect(()=>{
  if(textInputUserGitHub !== ''){
    navigation.navigate('Home', {name:'Home'}) 
    async function dataUsersAPI(){
       try{
             setLoading(false)
             const {data} = await axios.get(`${textInputUserGitHub}/repos`)
             setLoading(true)
             setReposGitHubUserDataAPI(data)
             setTextInputUserGitHub('')
         }catch(error){
            setLoading(true)
            console.log('dataUsersAPI CONTEXT', error ) 
         }
     }
     dataUsersAPI()
  }else{
    if(noInitialRenderEffectAPI.current){
      Alert.alert(
        "Digite um nome de usuário.",
        "Por favor, digitou o nome do usuário do site GitHub e tente novamente.",
        [
          { text: "OK", onPress: () => {} }
        ]
      );
    }else{
      noInitialRenderEffectAPI.current = true
    }
  }
},[searchNewReposGitHub])

useEffect(()=>{
  if(noInitialRenderEffect.current){
    if(reposGitHubUserDataAPI?.length === 0){
      Alert.alert(
        "Nenhum usuário encontrado!",
        "Por favor, verifique se digitou o nome do usuário corretamente e tente novamente.",
        [
          { text: "OK", onPress: () => {
            setIsKeyboarActiveTextInputUser(false)
            setTimeout(()=>{
              setIsModalVisibleTextInputUser(true)
            },500)
          } }
        ]
      );
    } else{}
  }else{noInitialRenderEffect.current = true}
},[reposGitHubUserDataAPI])

// STORAGE LIST FAVORITE 
const storageFavorite = (chave: any,valor: any) => {
  EncryptedStorage.setItem(chave,valor)
}

const searchStorageFavorite = async (chave: any) =>{
  const valor: any = await EncryptedStorage.getItem(chave)
  setListCardFavoriteStorage(valor)
}
searchStorageFavorite('storageListFavorite')

const listStorageFinal: any[] = listCardFavoriteStorage ? JSON.parse(listCardFavoriteStorage) : ''

  return (
    <AuthContext.Provider value={{
        colorBackGraound,
        colorTabBottomBackGround,
        colorTabBottomActive,
        colorTabBottomInactive,
        colorCardBackGraound,
        colorStarAndTextFavorite,
        colorButtonFavorite,
        colorLineCard,
        colorTextTitle,
        colorTextDescriptionAndLanguage,
        colorCircle,
        colorChanceUserIcon,
        colorButtonSaveTestInputUser,
        colorButtonClose,
        imageLogo,
        imageChanceUserIcon,
        imageHomeTabBottom,
        imageFavoriteTabBottom,
        imageStar,
        imageClose,
        paddingContainer,
        paddingCardVertical,
        paddingCardHorizontal,
        textFontSize,
        reposGitHubUserDataAPI,
        setReposGitHubUserDataAPI,
        setTextInputUserGitHub,
        textInputUserGitHub,
        setIsModalVisibleTextInputUser,
        isModalVisibleTextInputUser,
        setIsKeyboarActiveTextInputUser,
        isKeyboarActiveTextInputUser,
        setSearchNewReposGitHub,
        searchNewReposGitHub,
        setLoading,
        loading,
        setFavoriteDataStorageGitHubUser,
        favoriteDataStorageGitHubUser,
        setListCardFavorite,
        listCardFavorite,
        setListCardFavoriteStorage,
        listCardFavoriteStorage,
        newListSelect,
        storageFavorite,
        listStorageFinal,
        textButtonFavorite,
        textNoLanguage, 
        textNoDescription,
        textNameUserTitle,
        textButtonSaveUser 
        }}>
      {children}
    </AuthContext.Provider>
  )
}