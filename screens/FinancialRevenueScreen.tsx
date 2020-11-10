import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import firebase from '../firebase.config';
import { View } from '../components/Themed';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function FinancialRevenueScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref('controle/financial/revenue')
      .orderByKey()
      .on('value', (snapshot) => {
        setData(Object.values(snapshot.val() || {}) || []);
      });

    return () => {
      firebase.database().ref('controle/financial/revenue').off('value');
    };
  }, [setData]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, padding: 16 }}
        data={data || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>
                {format(new Date(item['date']), 'EEEE, dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </Text>
              <Text style={styles.price}>
                {currencyFormatter.format(item['value'])}
              </Text>
            </View>
            {/* <Text>{item['account']}</Text> */}
            <View style={styles.separator} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#ddd',
  },
  price: {
    fontWeight: 'bold',
  },
});
