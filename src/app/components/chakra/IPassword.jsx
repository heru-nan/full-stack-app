import { Input, InputGroup, Button, InputRightElement, FormControl, FormLabel } from "@chakra-ui/react";
import React from 'react';

export default function PasswordInput({...props}) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <FormControl id="password" isRequired>
       <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          {...props}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          isRequired
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      </FormControl>
    )
  }