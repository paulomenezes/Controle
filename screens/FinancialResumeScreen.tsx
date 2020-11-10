import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import firebase from '../firebase.config';
import { View } from '../components/Themed';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function FinancialResumeScreen() {
  const [revenueValue, setRevenueValue] = useState(0);
  const [expenseValue, setExpenseValue] = useState(0);
  const [totalValue, seTtotalValue] = useState(0);

  useEffect(() => {
    firebase
      .database()
      .ref('controle/financial')
      .orderByKey()
      .on('value', (snapshot) => {
        const revenue = snapshot.val()?.revenue || {};
        const expense = snapshot.val()?.expense || {};

        const revenueArray = Object.values(revenue) as any[];
        const expenseArray = Object.values(expense) as any[];

        let revenueTotal = 0;
        let expenseTotal = 0;

        for (const rev of revenueArray) {
          revenueTotal += rev['value'];
        }

        for (const exp of expenseArray) {
          expenseTotal += exp['value'];
        }

        let total = revenueTotal - expenseTotal;

        setRevenueValue(revenueTotal);
        setExpenseValue(expenseTotal);
        seTtotalValue(total);
      });

    return () => {
      firebase.database().ref('controle/financial').off('value');
    };
  }, [setRevenueValue, setExpenseValue, seTtotalValue]);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Receita:</Text>
          <Text style={styles.price}>
            {currencyFormatter.format(revenueValue)}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Despesa:</Text>
          <Text style={styles.price}>
            {currencyFormatter.format(expenseValue)}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Total:</Text>
          <Text style={styles.price}>
            {currencyFormatter.format(totalValue)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
