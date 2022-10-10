import { Modal, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput} from "react-native"
import React, { useContext } from "react"

import { AuthContext } from "../contexts/ContextProver";

export default function ModalTextInputUser() {

    const {
        isModalVisibleTextInputUser,
        setIsModalVisibleTextInputUser,
        paddingContainer,
        colorButtonSaveTestInputUser,
        colorTextTitle,
        imageClose,
        colorButtonClose,
        setTextInputUserGitHub,
        textInputUserGitHub,
        colorTabBottomBackGround,
        isKeyboarActiveTextInputUser,
        setIsKeyboarActiveTextInputUser,
        searchNewReposGitHub,
        setSearchNewReposGitHub,
        textNameUserTitle,
        textButtonSaveUser 
    } = useContext(AuthContext) 

    const heightWindown = Dimensions.get('window').height

    function handleNewGitHubRepos(){
        setIsKeyboarActiveTextInputUser(false)
        setIsModalVisibleTextInputUser(false)
        setSearchNewReposGitHub(!searchNewReposGitHub)
    }

    function handleCloseModal(){
        setIsModalVisibleTextInputUser(false)
        setIsKeyboarActiveTextInputUser(false)
    }

    return (
    <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisibleTextInputUser}
        >
            <View style={{
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
                paddingHorizontal:paddingContainer,
                height:300, 
                backgroundColor:colorTabBottomBackGround, 
                marginTop:isKeyboarActiveTextInputUser ? heightWindown <= 716 ? heightWindown*0.26 : heightWindown*0.37 : heightWindown-200
            }}>

                <View style={styles.titleAndClose}>
                    <Text style={{fontSize:16,fontWeight:"bold", color: colorTextTitle}}>
                        {textNameUserTitle}
                    </Text>
                    <TouchableOpacity onPress={() => handleCloseModal() }
                    style={[styles.backgroundClose,{backgroundColor:colorButtonSaveTestInputUser}]}>
                        <Image source={imageClose}
                        style={{width:12,height:12,tintColor:colorButtonClose}}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{paddingTop:paddingContainer}}>
                    <TextInput
                            style={[styles.inputNameUser,{borderColor: colorButtonSaveTestInputUser}]}
                            onChangeText={(text)=>setTextInputUserGitHub(text)}
                            value={textInputUserGitHub}
                            onFocus={() => setIsKeyboarActiveTextInputUser(true)}
                            onBlur={() => setIsKeyboarActiveTextInputUser(false)}
                            autoFocus={isKeyboarActiveTextInputUser}
                            placeholder="Nome do usuário"
                            keyboardType="default"
                    />
                </View>

                <View style={{paddingTop:10, alignItems:'center'}}>
                    <TouchableOpacity onPress={ () => handleNewGitHubRepos() }
                    style={{backgroundColor:colorButtonSaveTestInputUser, borderRadius:20}}>
                        <Text style={[styles.textButtonSave,{color: colorTextTitle}]}>
                            {textButtonSaveUser }
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    titleAndClose:{
        marginTop:21, 
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'space-between' 
    },
    backgroundClose:{
        width:25,
        height:25, 
        borderRadius:20, 
        alignItems:'center', 
        justifyContent:'center'
    },
    inputNameUser:{
        padding:10,
        borderRadius:10, 
        borderWidth:1
    },
    textButtonSave:{
        paddingHorizontal:90,
        paddingVertical:10, 
        fontSize:16,
        fontWeight:"bold"
    }
  });