import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

type StackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  SignIn: undefined;
  SignOut: undefined;
};

type StackParamProps = NativeStackScreenProps<StackParamList>;

type AuthContextType = {
  signIn?: (data: any) => Promise<void>;
  signOut?: () => void;
  signUp?: (data: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({});

function HomeScreen() {
  const authContext = useContext(AuthContext);
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Home!</Text>
      <Button
        title="signOut"
        onPress={() => {
          authContext.signOut?.();
        }}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Profile!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>settings!</Text>
    </View>
  );
}

function SignInScreen() {
  // const
  const authContext = useContext(AuthContext);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Sign in Page!</Text>
      <Button
        title="signIn"
        onPress={() => {
          authContext.signIn?.({});
          // todo sign
        }}
      />
    </View>
  );
}

function SignOutScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Sign out Page!</Text>
      <Button
        title="signOut"
        onPress={() => {
          // todo sign
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();

const LoginStacks = (
  <>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignOut" component={SignOutScreen} />
  </>
);

const MainStacks = (
  <>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </>
);

type State = {
  userToken: string | null;
  isLoading?: boolean;
  isSignOut?: boolean;
};

type Action = { type: 'RESTORE_TOKEN'; token: string | null } | { type: 'SIGN_IN'; token: string | null } | { type: 'SIGN_OUT' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignOut: true,
        userToken: null,
      };
  }
}

export default function AuthenticationNavigator() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignOut: false,
    userToken: null,
  });

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
      },
    }),
    []
  );

  // todo
  // add splash screen

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>{state.userToken === null ? LoginStacks : MainStacks}</Stack.Navigator>
    </AuthContext.Provider>
  );
}
