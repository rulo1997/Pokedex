import { Text, Image, FlatList, ActivityIndicator, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from "../theme/appTheme";
import { usePokemonPaginated } from "../hooks/usePokemonPaginated";
import { FadeInImage } from "../components/FadeInImage";
import { PokemonCard } from "../components/PokemonCard";

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { simplePokemonList , isLoading , loadPokemos } = usePokemonPaginated();

    return (

        <>

            <Image
                source={ require('../assets/pokebola.png') }
                style={ styles.pokebolaBG }
            />

            <View
                style={{
                    ...styles.globalMargin
                    ,alignItems: 'center'
                }}
            >

                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ ( pokemon ) => pokemon.id }
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                    //Header
                    ListHeaderComponent={(
                        <Text 
                            style={{ 
                                ...styles.title
                                ,...styles.globalMargin 
                                ,top: top + 20
                                ,marginBottom: top + 20
                                ,paddingBottom: 10
                            }}
                        >
                            Pokedex
                        </Text>
                    )}
                    renderItem={ ({ item , index }) => <PokemonCard pokemon={ item } />}
                    //Infinite Scroll
                    onEndReached={ loadPokemos }
                    onEndReachedThreshold={ 0.4 }
                    ListFooterComponent={( 
                        <ActivityIndicator 
                            style={{ height: 100 }}
                            size={ 20 }
                            color='gray' 
                        /> 
                    )}
                />

            </View>            

        </>

    )
}
