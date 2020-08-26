import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  host: 'localhost',
})
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = Reactotron;
