type PickerInputProps = React.InputHTMLAttributes<HTMLInputElement>

import classNames from '../../../utils/classNames'
import styles from './PickerInput.module.scss'

const PickerInput: React.FC<PickerInputProps> = ({ className, ...props }) => {
  return (
    <input
      className={classNames('ndt-picker-input', styles.pickerInput, className)}
      type="text"
      {...props}
    />
  )
}

export default PickerInput
