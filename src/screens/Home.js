import React, { useState } from 'react';
import { View,Dimensions, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
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
    <View  style={styles.iconGrid}>
      {Object.keys(images).map((name, index) => (
        <Image key= {index} source={images[name]} style={styles.image} />
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

const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  const products = [
    { id: '1', name: 'Produto 1', price: 189.99, image: require('../../assets/images/itens/item1.png'), descricao: 'Este é o Produto 1, perfeito para suas necessidades do dia a dia.' },
    { id: '2', name: 'Produto 2', price: 289.90, image: require('../../assets/images/itens/item2.png'), descricao: 'Produto 2 é ideal para quem busca qualidade e eficiência.' },
    { id: '3', name: 'Produto 3', price: 99.90, image: require('../../assets/images/itens/item3.png'), descricao: 'Produto 3 é uma excelente escolha com ótimo custo-benefício.' },
    { id: '4', name: 'Produto 4', price: 149.99, image: require('../../assets/images/itens/item4.png'), descricao: 'Com o Produto 4, você terá praticidade e estilo.' },
    { id: '5', name: 'Produto 5', price: 199.99, image: require('../../assets/images/itens/item5.png'), descricao: 'Produto 5 combina modernidade com alta performance.' },
    { id: '6', name: 'Produto 6', price: 249.90, image: require('../../assets/images/itens/item6.png'), descricao: 'Produto 6 foi projetado para atender aos mais exigentes padrões.' },
    { id: '7', name: 'Produto 7', price: 79.99, image: require('../../assets/images/itens/item7.png'), descricao: 'Produto 7 é compacto, eficiente e extremamente funcional.' },
    { id: '8', name: 'Produto 8', price: 299.90, image: require('../../assets/images/itens/item8.png'), descricao: 'Produto 8 é a escolha premium para quem não abre mão de qualidade.' },
    // Reutilizando as imagens para novos produtos
    { id: '9', name: 'Produto 9', price: 159.90, image: require('../../assets/images/itens/item1.png'), descricao: 'Produto 9 é uma solução versátil e confiável.' },
    { id: '10', name: 'Produto 10', price: 189.90, image: require('../../assets/images/itens/item2.png'), descricao: 'Produto 10 entrega desempenho superior.' },
    { id: '11', name: 'Produto 11', price: 129.99, image: require('../../assets/images/itens/item3.png'), descricao: 'Produto 11 une design e funcionalidade.' },
    { id: '12', name: 'Produto 12', price: 299.99, image: require('../../assets/images/itens/item4.png'), descricao: 'Produto 12 oferece alto desempenho.' },
    { id: '13', name: 'Produto 13', price: 189.00, image: require('../../assets/images/itens/item5.png'), descricao: 'Produto 13 traz inovação ao seu cotidiano.' },
    { id: '14', name: 'Produto 14', price: 89.90, image: require('../../assets/images/itens/item6.png'), descricao: 'Produto 14 é compacto e prático.' },
    { id: '15', name: 'Produto 15', price: 199.00, image: require('../../assets/images/itens/item7.png'), descricao: 'Produto 15 atende às suas demandas diárias.' },
    { id: '16', name: 'Produto 16', price: 219.90, image: require('../../assets/images/itens/item8.png'), descricao: 'Produto 16 é a escolha ideal para qualidade superior.' },
    { id: '17', name: 'Produto 17', price: 109.90, image: require('../../assets/images/itens/item1.png'), descricao: 'Produto 17 combina estilo e eficiência.' },
    { id: '18', name: 'Produto 18', price: 179.99, image: require('../../assets/images/itens/item2.png'), descricao: 'Produto 18 é perfeito para quem busca durabilidade.' },
    { id: '19', name: 'Produto 19', price: 259.90, image: require('../../assets/images/itens/item3.png'), descricao: 'Produto 19 é excelente para uso diário.' },
    { id: '20', name: 'Produto 20', price: 139.90, image: require('../../assets/images/itens/item4.png'), descricao: 'Produto 20 oferece alta performance.' },
    { id: '21', name: 'Produto 21', price: 119.90, image: require('../../assets/images/itens/item5.png'), descricao: 'Produto 21 é compacto e fácil de usar.' },
    { id: '22', name: 'Produto 22', price: 89.99, image: require('../../assets/images/itens/item6.png'), descricao: 'Produto 22 traz praticidade e desempenho.' },
    { id: '23', name: 'Produto 23', price: 199.99, image: require('../../assets/images/itens/item7.png'), descricao: 'Produto 23 é projetado para atender todas as suas necessidades.' },
    { id: '24', name: 'Produto 24', price: 229.90, image: require('../../assets/images/itens/item8.png'), descricao: 'Produto 24 combina sofisticação e eficiência.' },
  ];  
  
  // Função de busca (apenas para exibir no console)
  const handleSearch = (searchText) => {
    console.log('Buscando por:', searchText);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={() => navigation.navigate('Detalhes', { product: item })}/>
      )}
      numColumns={4}
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.productList} 
      ListHeaderComponent={() => (
        <>
          <SearchBar onSearch={handleSearch} />
          <Banner />
          <NavigationIcons />
          <OffersSection />
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.cartButtonText}>Ir para o Carrinho</Text>
          </TouchableOpacity>
        </>
      )}
    />
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
    padding: 10,
    backgroundColor: '#fff',
    justifyContent:  'space-between'
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
    marginHorizontal: 5
  },
  product: {
    padding:10,
    alignItems: 'center', // Centraliza o conteúdo dentro do card
  },
});

export default Home;
