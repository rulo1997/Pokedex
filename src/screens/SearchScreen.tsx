import { Text, View, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { SearchInput } from "../components/SearchInput";
import { usePokemonSearch } from "../hooks/usePokemonSearch";

import { styles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isFetching , simplePokemonList } = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    const [term, setTerm] = useState('');

    useEffect(() => {
      
        if( term.length === 0 ) {
            return setPokemonFiltered([]);
        }

        if( isNaN( Number( term ) ) ) {
            
            setPokemonFiltered( simplePokemonList.filter( 
                poke => poke.name.toLocaleLowerCase().includes( term.toLocaleLowerCase() ) 
            ));

        }
        else {

            const pokemonById = simplePokemonList.find( poke => poke.id === term );
            setPokemonFiltered( ( pokemonById ) ? [pokemonById] : [] );

        }

    }, [ term ])
    

    if ( isFetching ) {

        return <Loading />

    }

    return (
        
        <View 
            style={{ 
                flex: 1
                // ,marginTop: ( Platform.OS === 'ios' ) ? top : top + 10
                ,marginHorizontal: 20
            }}
        >
            
            <SearchInput
                onDebounce={ setTerm } 
                style={{
                    position: 'absolute'
                    ,zIndex: 999
                    ,width: screenWidth - 40
                    ,top: ( Platform.OS === 'ios' ) ? top : top + 30
                }}
            />

            <FlatList 
                data={ pokemonFiltered }
                keyExtractor={ ( pokemon ) => pokemon.id }
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                //Header
                ListHeaderComponent={(
                    <Text 
                        style={{ 
                            ...styles.title
                            ,...styles.globalMargin
                            ,paddingBottom: 10
                            ,marginTop: ( Platform.OS === 'ios' ) ? top : top + 80
                        }}
                    >
                        { term }
                    </Text>
                )}
                renderItem={ ({ item , index }) => <PokemonCard pokemon={ item } />}
            />

        </View>

    )
}


