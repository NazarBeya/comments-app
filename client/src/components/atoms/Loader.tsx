import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'

interface LoaderProps {
  style?: any
}
const Loader: React.FC<LoaderProps> = ({ style }) => {
  return (
    
    <View>
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 18,
          ...style
        }}
        source={require('../../../assets/loader-animated-icon.json')}
      />
    </View>
  )
}

export default Loader