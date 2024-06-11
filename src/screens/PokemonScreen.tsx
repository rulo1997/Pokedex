import { StackScreenProps } from "@react-navigation/stack";
import { Text, View, StyleSheet , TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from "../navigator/Tabs1";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FadeInImage } from "../components/FadeInImage";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonDetails } from "../components/PokemonDetails";

interface Props extends StackScreenProps<RootStackParams , 'PokemonScreen'> {};

export const PokemonScreen = ({ navigation , route }: Props ) => {

    const { simplePokemon , color } = route.params;

    const { top } = useSafeAreaInsets();

    const { pokemon , isLoading } = usePokemon( simplePokemon.id );

    console.log({ pokemon });

    return (
        
        <View style={{ flex: 1 }}>

            <View 
                style={{
                    ...styles.headerContainer
                    ,backgroundColor: color                
                }}
            >

                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress={ navigation.goBack }
                    style={{ 
                        ...styles.backButton 
                        ,top: top + 5
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        color='white'
                        size={ 35 }
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        ...styles.name
                        ,top: top + 40
                    }}
                >
                    { simplePokemon.name + '\n' } #{ simplePokemon.id }
                </Text>

                <Image 
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokeball }
                />

                <FadeInImage 
                    uri={ simplePokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>

            {

                isLoading ?
                (
                    <View style={ styles.activityIndicator }>
                        <ActivityIndicator 
                            color={ color }
                            size={ 50 }
                        />
                    </View>   
                )
                : <PokemonDetails pokemon={ pokemon }/>

            }

        </View>

    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370
        ,zIndex: 999
        ,alignItems: 'center'
        ,borderBottomRightRadius: 1000
        ,borderBottomLeftRadius: 1000
    },
    backButton: {
        position: 'absolute'
        ,left: 20
    },
    name: {
        color: 'white'
        ,fontSize: 40
        ,alignSelf: 'flex-start'
        ,left: 20
    },
    pokeball: {
        width: 250
        ,height: 250
        ,bottom: -20
        ,opacity: 0.7
    },
    pokemonImage: {
        width: 250
        ,height: 250
        ,position: 'absolute'
        ,bottom: -15
    },
    activityIndicator: {
        flex: 1        
        ,justifyContent: 'center'
        ,alignItems: 'center'
    }
});