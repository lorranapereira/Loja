import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonStyle from '../components/ButtonStyle';
import SectionTitle from '../components/SectionTitle';

const Detalhes = ({ route, navigation }) => {
    const { product } = route.params;

    // Adiciona o produto ao AsyncStorage
    const addToCart = async () => {
      try {
        // Busca o carrinho existente
        const cart = await AsyncStorage.getItem('cart');
        const parsedCart = cart ? JSON.parse(cart) : [];
  
        // Verifica se o produto já existe no carrinho
        const existingProduct = parsedCart.find((item) => item.id === product.id);
        if (existingProduct) {
          // Incrementa a quantidade se já existir
          const updatedCart = parsedCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
          // Adiciona o novo produto ao carrinho
          const updatedCart = [...parsedCart, { ...product, quantity: 1 }];
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        }
  
        // Navega para a página do carrinho
        navigation.navigate('Cart');
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    };

  return (
    <View style={styles.container}>
      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Imagem do Produto */}
        <Image source={product.image} style={styles.productImage} />

        {/* Nome do Produto */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Preço e Ofertas Relâmpago */}
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{`R$${product.price.toFixed(2)}`}</Text>
          <SectionTitle title="Ofertas Relâmpago" />
        </View>

        {/* Frete */}
        <View style={styles.shippingContainer}>
          <Text style={styles.shippingText}>Frete: R$7,24 com cupom</Text>
        </View>

        {/* Avaliações do Produto */}
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>Avaliações do Produto</Text>
          <Text style={styles.rating}>⭐ 4,6/5 (231 Opiniões)</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.productDescription}>{product.descricao}</Text>
      </View>

      {/* Rodapé com Botões */}
      <View style={styles.footer}>
        {/* Botão de Chat */}
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="comment" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Botão de Carrinho */}
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="shopping-cart" size={20} color="#fff" />
        </TouchableOpacity>
        <ButtonStyle label="Compre Agora" onPress={addToCart}></ButtonStyle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    color: '#ff5722',
    fontWeight: 'bold',
  },
  offer: {
    fontSize: 14,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  shippingContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  shippingText: {
    fontSize: 14,
    color: '#666',
  },
  reviewContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'justify',
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerButton: {
    backgroundColor: '#20c997',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#ff5722',
    height: 50,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Detalhes;
