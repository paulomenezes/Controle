import React from 'react';
import DatePicker from 'react-native-datepicker';
import { StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
// import { Picker } from '@react-native-picker/picker';
import SegmentedControl from '@react-native-community/segmented-control';

import { Text, View } from '../components/Themed';
import firebase from '../firebase.config';
import { StackScreenProps } from '@react-navigation/stack';
import { FinancialAddParamList } from '../types';

const TypeMap: Record<number, string> = {
  0: 'revenue',
  1: 'expense',
};

type Props = StackScreenProps<FinancialAddParamList, 'FinancialAddScreen'>;

export default function FinancialAddScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          type: 0,
          date: new Date().toISOString(),
          value: 0,
          category: 'Venda',
          account: 'Dinheiro',
        }}
        onSubmit={(values) => {
          if (!values.value) {
            alert('Digite um valor');
          } else {
            const date = new Date(values.date);

            firebase
              .database()
              .ref(
                `controle/financial/${TypeMap[values.type]}/${date.getTime()}`
              )
              .set(values, (error) => {
                if (!error) {
                  props.navigation.goBack();
                } else {
                  alert('Não foi possível salvar');
                }
              });
          }
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <View style={{ flex: 1, padding: 16 }}>
            <SegmentedControl
              values={['Receita', 'Despesa']}
              selectedIndex={values.type}
              onChange={(event) => {
                setFieldValue('type', event.nativeEvent.selectedSegmentIndex);
              }}
            />

            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={{ flex: 1 }}>Data:</Text>
              <DatePicker
                style={{ flex: 1 }}
                date={new Date(values.date)}
                mode="date"
                placeholder="Selecionar data"
                format="DD/MM/YYYY"
                minDate="01/01/2020"
                maxDate="01/01/2030"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showIcon={false}
                onDateChange={(date: string) => {
                  setFieldValue('date', date);
                }}
                customStyles={{
                  dateInput: {
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 5,
                    borderRadius: 5,
                  },
                }}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={{ flex: 1 }}>Valor:</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  flex: 1,
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <NumericInput
                  type="currency"
                  locale="pt-BR"
                  currency="BRL"
                  value={values.value}
                  onUpdate={(value: number) => setFieldValue('value', value)}
                />
              </View>
            </View>

            {/* <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={{ flex: 1 }}>Categoria:</Text>
              <Picker
                selectedValue={values.category}
                style={{ height: 50, width: 100, flex: 1 }}
                onValueChange={(itemValue: string | number) =>
                  setFieldValue('category', itemValue)
                }
              >
                <Picker.Item label="Venda" value="Venda" />
                <Picker.Item label="Transferência" value="Transferência" />
              </Picker>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={{ flex: 1 }}>Conta:</Text>
              <Picker
                selectedValue={values.account}
                style={{ height: 50, width: 100, flex: 1 }}
                onValueChange={(itemValue: string | number) =>
                  setFieldValue('account', itemValue)
                }
              >
                <Picker.Item label="Dinheiro" value="Dinheiro" />
                <Picker.Item label="Caixa" value="Caixa" />
              </Picker>
            </View> */}

            <View style={styles.separator} />

            <Button onPress={() => handleSubmit()} title="Salvar" />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#ddd',
  },
});
