import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Buscar na Shopee"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={() => onSearch(searchText)}>
        <FontAwesome name="search" size={20} color="#ffffff" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.icon}>
        <FontAwesome name="shopping-cart" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

// Componente para o Banner
const Banner = () => (
  <View style={styles.banner}>
    <Text style={styles.bannerText}>Fidelidade Shopee</Text>
    <Text style={styles.bannerSubText}>Aproveite seus descontos exclusivos</Text>
  </View>
);


const NavigationIcons = () => {
  const images = {
    'Moedas e Prêmios': require('../../assets/images/fixos/cifrao.png'),
    'Live': require('../../assets/images/fixos/live.png'),
    'Lojas Oficiais': require('../../assets/images/fixos/sacolacoracao.png'),
    'Casa Shopee': require('../../assets/images/fixos/casa.png'),
    'Mais Categorias': require('../../assets/images/fixos/search.png'),
    'Cupons': require('../../assets/images/fixos/cupon.png'),
    'Frete Grátis': require('../../assets/images/fixos/frete.png'),
    'ShopeePay': require('../../assets/images/fixos/pay.png'),
    'Lovito': require('../../assets/images/fixos/lovito.png'),
    'Ver Mais': require('../../assets/images/fixos/vermais.png'),
  };
  
  return (
    <View style={styles.iconGrid}>
      {Object.keys(images).map((name, index) => (
        <Image source={images[name]} style={styles.image} />
      ))}
    </View>
  );  
};

// Componente para a Seção de Ofertas
const OffersSection = () => (
  <View style={styles.offersSection}>
    <SectionTitle title="Ofertas Relâmpago" />
    <View style={styles.countdown}>
      <Text>01:23:32</Text>
    </View>
  </View>
);


const Home = ({ navigation }) => {
  const products = [
    { 
      id: '1', 
      name: 'Produto 1', 
      price: 189.99, 
      image: require('../../assets/images/itens/item1.png'), 
      descricao: 'Este é o Produto 1, perfeito para suas necessidades do dia a dia.'
    },
    { 
      id: '2', 
      name: 'Produto 2', 
      price: 289.90, 
      image: require('../../assets/images/itens/item2.png'), 
      descricao: 'Produto 2 é ideal para quem busca qualidade e eficiência.'
    },
    { 
      id: '3', 
      name: 'Produto 3', 
      price: 99.90, 
      image: require('../../assets/images/itens/item3.png'), 
      descricao: 'Produto 3 é uma excelente escolha com ótimo custo-benefício.'
    },
    { 
      id: '4', 
      name: 'Produto 4', 
      price: 149.99, 
      image: require('../../assets/images/itens/item4.png'), 
      descricao: 'Com o Produto 4, você terá praticidade e estilo.'
    },
    { 
      id: '5', 
      name: 'Produto 5', 
      price: 199.99, 
      image: require('../../assets/images/itens/item5.png'), 
      descricao: 'Produto 5 combina modernidade com alta performance.'
    },
    { 
      id: '6', 
      name: 'Produto 6', 
      price: 249.90, 
      image: require('../../assets/images/itens/item6.png'), 
      descricao: 'Produto 6 foi projetado para atender aos mais exigentes padrões.'
    },
    { 
      id: '7', 
      name: 'Produto 7', 
      price: 79.99, 
      image: require('../../assets/images/itens/item7.png'), 
      descricao: 'Produto 7 é compacto, eficiente e extremamente funcional.'
    },
    { 
      id: '8', 
      name: 'Produto 8', 
      price: 299.90, 
      image: require('../../assets/images/itens/item8.png'), 
      descricao: 'Produto 8 é a escolha premium para quem não abre mão de qualidade.'
    },
  ];
  
  // Função de busca (apenas para exibir no console)
  const handleSearch = (searchText) => {
    console.log('Buscando por:', searchText);
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <Banner />
      <NavigationIcons />
      <OffersSection />

      {/* Botão para ir ao Carrinho */}
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Ir para o Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch}>
        <FontAwesome name="search" size={20} color="#333" style={styles.icon} />
      </TouchableOpacity>

      {/* Lista de Produtos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>           
          <ProductCard
          product={item}
          onPress={() => navigation.navigate('Detalhes', { product: item })}
        />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgb(255, 87, 34)',
  },
  searchInput: {
    flex: 1,
    padding: 8,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
  },
  banner: {
    backgroundColor: '#ff5722',
    padding: 15,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerSubText: {
    fontSize: 14,
    color: '#fff',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 12,
    color: '#333',
  },
  offersSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  offersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  countdown: {
    backgroundColor: '#e6e6e6',
    padding: 5,
    borderRadius: 5,
  },
  productList: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#ff5722',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 50,  
    height: 50, 
    resizeMode: 'contain',
  },
});

export default Home;
