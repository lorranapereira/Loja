import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonStyle from '../components/ButtonStyle'; // Importe o ProductCard
import SectionTitle from '../components/SectionTitle';

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  // Carrega os dados do carrinho ao abrir a tela
  const loadCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
        setCartData(JSON.parse(cart));
      }
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Função para salvar o carrinho no AsyncStorage
  const saveCart = async (updatedCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartData(updatedCart);
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };  

  // Função para aumentar a quantidade de um item
  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartData.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  // Função para diminuir a quantidade de um item
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartData
      .map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - 1 } // Diminui a quantidade
          : item
      )
      .filter((item) => item.quantity > 0); // Remove itens com quantidade 0
  
    saveCart(updatedCart); // Salva o carrinho atualizado
  };
  

  // Calcula o subtotal do carrinho
  const calculateSubtotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionTitle title="Carrinho"/>
      </View>

      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
        )}
        style={styles.cartList}
      />

      <View style={styles.footer}>
        <Text style={styles.subtotal}>Sub-total R${calculateSubtotal().toFixed(2)}</Text>
        <ButtonStyle label="Continuar" onPress={() => navigation.navigate('Home')}></ButtonStyle>
      </View>
    </View>
  );
};

const CartItem = ({ item, onIncrease, onDecrease }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.productImage} />
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => onDecrease(item.id)}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => onIncrease(item.id)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#fff',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    editText: {
      color: '#ff5722',
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#e6e6e6',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#ddd',
      marginRight: 10,
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 5,
      marginRight: 10,
    },
    productDetails: {
      flex: 1,
    },
    productTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    productDescription: {
      fontSize: 12,
      color: '#666',
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ff5722',
    },
    productOldPrice: {
      fontSize: 12,
      color: '#999',
      textDecorationLine: 'line-through',
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    quantityButton: {
      width: 25,
      height: 25,
      borderWidth: 1,
      borderColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      marginHorizontal: 10,
    },
    couponSection: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
      marginTop: 10,
    },
    couponLabel: {
      flex: 1,
      color: '#666',
    },
    couponInput: {
      flex: 2,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    subtotal: {
      fontSize: 16,
    },
    continueButton: {
      backgroundColor: '#ff5722',
      padding: 10,
      borderRadius: 5,
    },
    continueButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  export default Cart;
