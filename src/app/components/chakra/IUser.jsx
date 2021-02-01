

import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import React from 'react';

export default function PasswordInput({...props}) {
    return (
      <FormControl mb="2%" id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input {...props} placeholder="Enter Username" />
      </FormControl>
    )
  }