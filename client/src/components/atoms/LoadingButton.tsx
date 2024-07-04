import LottieView from 'lottie-react-native'
import React, { FC, PropsWithChildren } from 'react'
import {  Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Loader from './Loader'


interface LoadingButtonProps extends TouchableOpacityProps  {
    title: string
    isLoaing?: boolean
}
const LoadingButton: FC<LoadingButtonProps> = ({ isLoaing, title, ...rest }) => {

  return (
    <TouchableOpacity {...rest} className='border border-black flex justify-center items-center rounded bg-black text-white p-2'>
        {isLoaing ? <Loader/> : 
        <View className='text-white'>
            <Text className='text-white'>{title}</Text>
        </View>
        }
    </TouchableOpacity>
  )
}

export default LoadingButton