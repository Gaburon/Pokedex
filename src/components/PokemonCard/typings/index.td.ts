import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Pokemon: {id: string};
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Pokemon'
>;
