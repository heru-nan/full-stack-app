import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const FormSection = ({ submit }) => {
  const [inInput, setInput] = useState(false);
  const [taskValue, setTaskValue] = useState("")
  const textInput = useRef(null);

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "row" }}>
        <InputGroup size="xs">
        <Input
                pr="4.5rem"
                type={"text"}
                placeholder="Enter task"
                value={taskValue}
                onChange={(e) => setTaskValue(e.target.value)}
                onClick={()=>setInput(true)}
              />
        {
          inInput && 
          <InputRightElement>        
            <Button type="submit" color="green.500" >
                <FontAwesomeIcon icon="check" />
            </Button>
            <Button   
                      type="button"
                      onClick={(e) => {
                        setTaskValue("");
                        setInput(false);
                      }}
                      name="cancel"
                      color="green.500"
                    >
                      <FontAwesomeIcon icon="window-close" />
            </Button>
          </InputRightElement>
        }
        </InputGroup>
      </form>
  );
};

export default FormSection;
