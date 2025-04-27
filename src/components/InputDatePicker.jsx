import React from 'react'
import { Calendar } from 'react-bootstrap-icons';
import { InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const InputDatePicker = () => {
  return <InputGroup disabled>
  <DateInput value={new Date()} />
  <InputGroup.Addon>
    <Calendar />
  </InputGroup.Addon>
</InputGroup>
}

export default InputDatePicker