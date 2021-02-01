import {Text, Link} from '@chakra-ui/react';
import {Link as RLink} from 'react-router-dom';
import React from 'react'

export default function(){
    return (
        <Text>
         Don't have an account? 
        <Link color="teal.500">
            <RLink to="/signin"> create one in no time</RLink>
        </Link>
        </Text>
    )
}