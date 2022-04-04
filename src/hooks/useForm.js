import React, { useState } from "react";

export const useForm = (initialState = {}) => {

  const [state, setState] = useState(initialState);

  const handlerInputSend = ({target}) => {
    
    setState({
      ...state,
      [target.name] : target.value
    })

  }

  return [state,handlerInputSend]
  
}