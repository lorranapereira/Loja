import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Cart from './src/screens/Cart';
import Detalhes from './src/screens/Detalhes'; // Nova página de detalhes

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={{ 
                title: 'Página Inicial', 
                headerShown: false // Oculta o cabeçalho para a tela Home
              }}
            />
            <Stack.Screen 
              name="Cart" 
              component={Cart} 
              options={{ title: 'Carrinho' }} 
            />
            <Stack.Screen 
              name="Detalhes" 
              component={Detalhes} 
              options={{ title: 'Detalhes' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      } 
    </View>
  );
};

export default App;
