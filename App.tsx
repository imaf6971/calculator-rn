import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "SF": require("./assets/SFUIText-Regular.ttf")
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const [text, setText] = useState('')

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <Text style={{ fontFamily: 'SF', color: '#FFF', fontSize: 64 }}>{text}</Text>
      </View>
      <View style={{ flex: 4, justifyContent: 'space-evenly' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button text='C' color='gray' onPress={() => setText('')} />
          <Button text='+/-' color='gray' />
          <Button text='%' color='gray' onPress={() => setText(t => t + '%')} />
          <Button text='/' color='orange' onPress={() => setText(t => t + '/')} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button text='7' color='darkGray' onPress={() => setText(t => t + '7')} />
          <Button text='8' color='darkGray' onPress={() => setText(t => t + '8')} />
          <Button text='9' color='darkGray' onPress={() => setText(t => t + '9')} />
          <Button text='*' color='orange' onPress={() => setText(t => t + '*')} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button text='4' color='darkGray' onPress={() => setText(t => t + '4')} />
          <Button text='5' color='darkGray' onPress={() => setText(t => t + '5')} />
          <Button text='6' color='darkGray' onPress={() => setText(t => t + '6')} />
          <Button text='-' color='orange' onPress={() => setText(t => t + '-')} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button text='1' color='darkGray' onPress={() => setText(t => t + '1')} />
          <Button text='2' color='darkGray' onPress={() => setText(t => t + '2')} />
          <Button text='3' color='darkGray' onPress={() => setText(t => t + '3')} />
          <Button text='+' color='orange' onPress={() => setText(t => t + '+')} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button text='0' color='darkGray' isWide onPress={() => setText(t => t + '0')}/>
          <Button text='.' color='darkGray' onPress={() => setText(t => t + '.')}/>
          <Button text='=' color='orange' onPress={() => setText(eval(text))} />
        </View>
      </View>
    </View>
  );
}

type ButtonProps = {
  text: string;
  color: 'orange' | 'gray' | 'darkGray';
  isWide?: boolean;
  onPress?: (e: GestureResponderEvent) => void
}

function Button({ text, color, onPress, isWide = false }: ButtonProps) {
  const colors = {
    'orange': ORANGE,
    'gray': GRAY,
    'darkGray': DARK_GRAY,
  }
  const currentColor = colors[color]
  const textColor = currentColor === GRAY ? BLACK : '#FFF'

  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: currentColor,
        width: isWide ? 170 : 80,
      }}
      onPress={onPress}
    >
      <Text style={{ color: textColor, fontSize: 36, fontFamily: 'SF', textAlignVertical: 'bottom' }}>
        {text}
      </Text>
      {text === '0' && <Text> </Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // padding: 12,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    height: 80,
    width: 80,
  },
});

const ORANGE = '#FF9500';
const BLACK = '#1C1C1C';
const GRAY = '#D4D4D2'
const DARK_GRAY = "#505050";