import React, { useState, ReactElement, cloneElement, useEffect } from 'react'
import NepaliCalendar from './NepaliCalendar'
import Popover from './core/Popover'
import NepaliDate from 'nepali-datetime'
import PickerInput from './core/PickerInput'

interface INepaliDatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  format?: string
  inputElement?: ReactElement | null
  onDateSelect?: ((value: string) => void) | null
}

const getNepaliDateOrNull = (
  nepaliDateStr: string,
  format: string
): NepaliDate | null => {
  try {
    return new NepaliDate(nepaliDateStr, format)
  } catch {
    return null
  }
}

const NepaliDatePicker: React.FC<INepaliDatePickerProps> = ({
  value = '',
  format = 'YYYY-MM-DD',
  inputElement = null,
  onDateSelect = null,
  ...rest
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const inputProps = { value: inputValue, readOnly: true }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const setDateValue = (dateValue: string) => {
    setInputValue(dateValue)
    if (onDateSelect) {
      onDateSelect(dateValue)
    }
  }

  const handleSetDate = (nepaliDate: NepaliDate) => {
    setDateValue(nepaliDate.format(format))
    setIsPopoverVisible(false)
  }

  // updating props to custom input element
  const customInputElement =
    inputElement && cloneElement(inputElement, { ...rest, ...inputProps })

  return (
    <Popover
      className="ndt-date-picker"
      open={isPopoverVisible}
      onOpenChange={newOpen => setIsPopoverVisible(newOpen)}
      content={
        <NepaliCalendar
          selectedNepaliDate={getNepaliDateOrNull(inputValue, format)}
          onDateSelect={handleSetDate}
        />
      }
    >
      {customInputElement || <PickerInput {...rest} {...inputProps} />}
    </Popover>
  )
}

export default NepaliDatePicker
