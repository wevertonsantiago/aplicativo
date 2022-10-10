import { View, Image, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../contexts/ContextProver'

export default function Header() {

  const {
  colorBackGraound,
  colorChanceUserIcon,
  imageLogo,
  imageChanceUserIcon, 
  paddingContainer,
  setIsModalVisibleTextInputUser,
  isModalVisibleTextInputUser 
  } = useContext(AuthContext)  

  return (
    <View style={{ backgroundColor:colorBackGraound}}>
        <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:paddingContainer
        }}>
            <Image
            source={imageLogo}
            style={{ width: 56, height: 24 }}
            resizeMode='contain'
            />
            <TouchableOpacity onPress={() => setIsModalVisibleTextInputUser(!isModalVisibleTextInputUser)}>
                <Image
                source={imageChanceUserIcon}
                style={{ 
                width: 30, 
                height: 30, 
                tintColor:colorChanceUserIcon 
                }}
                resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}