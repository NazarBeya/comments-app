import React, { FC } from 'react'
import {  Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Loader } from './Loader'


interface LoadingButtonProps extends TouchableOpacityProps  {
    title: string
    isLoaing?: boolean
}
export const LoadingButton: FC<LoadingButtonProps> = ({ isLoaing, title, ...rest }) => {

  return (
    <TouchableOpacity {...rest} className='border z-0 border-white flex justify-center items-center rounded bg-black text-white p-2'>
        {isLoaing ? <Loader/> : 
        <View className='text-white'>
            <Text className='text-white'>{title}</Text>
        </View>
        }
    </TouchableOpacity>
  )
}

