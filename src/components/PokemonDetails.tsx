import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { PokemonFull } from '../interfaces/PokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
    return (
     
        <ScrollView
            showsVerticalScrollIndicator={ false }
            style={{
                ...StyleSheet.absoluteFillObject
            }}
        >

            <View
                style={{
                    ...styles.container
                    ,marginTop: 370 
                }}
            >

                <Text style={ styles.title }>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map( ({ type }) => (
                            <Text 
                                key={ type.name }
                                style={{ ...styles.regularText, marginRight: 10 }}
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>   
                <Text style={ styles.title }>Peso</Text>    
                <Text style={ styles.regularText }>{ pokemon.weight }kg</Text>          

            </View>

            {/* Types */}
            <View
                style={{
                    ...styles.container
                    ,marginTop: 20
                }}
            >
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView
                // style={}
                horizontal
                showsHorizontalScrollIndicator={ false }
            >
                <FadeInImage 
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />

                <FadeInImage 
                    uri={ pokemon.sprites.back_default }
                    style={ styles.basicSprite }
                />

                <FadeInImage 
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.basicSprite }
                />

                <FadeInImage 
                    uri={ pokemon.sprites.back_shiny }
                    style={ styles.basicSprite }
                />
            </ScrollView>

            {/* Habilidades */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Sprites</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map( ({ ability }) => (
                            <Text 
                                key={ ability.name }
                                style={{ ...styles.regularText, marginRight: 10 }}
                            >
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Movimientos */}
            <View style={ styles.container }>
                <Text style={ styles.title }>Moves</Text>
                <View style={{ flexDirection: 'row' , flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map( ({ move }) => (
                            <Text 
                                key={ move.name }
                                style={{ ...styles.regularText, marginRight: 10 }}
                            >
                                { move.name }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Stats */}
            <View style={{ ...styles.container , marginBottom: 70 }}>
                <Text style={ styles.title }>Stats</Text>
                <View>
                    {
                        pokemon.stats.map( ( stat , index ) => (
                            <View 
                                key={ stat.stat.name + index }
                                style={{ flexDirection: 'row' }}
                            >
                                <Text                                     
                                    style={{ ...styles.regularText, marginRight: 10 , width: 150 }}
                                >
                                    { stat.stat.name }
                                </Text>
                                <Text                                     
                                    style={{ ...styles.regularText, fontWeight: 'bold' }}
                                >
                                    { stat.base_stat }
                                </Text>
                            </View>
                        ))
                    }
                </View>
            </View>

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    }
    ,title: {
        fontWeight: 'bold'
        ,fontSize: 22
        ,marginTop: 20
    }
    ,regularText: {
        fontSize: 19
    }
    ,basicSprite: {
        width: 100
        ,height: 100
    }
});
