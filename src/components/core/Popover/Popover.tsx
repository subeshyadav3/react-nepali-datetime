/*
 * Inspired from antd Popover (https://ant.design/components/popover)
 */
import { useRef } from 'react'
import PopoverContent from './PopoverContent'
import classNames from '../../../utils/classNames'

interface IPopoverProps {
  open: boolean
  children: React.ReactNode
  content: React.ReactNode
  onOpenChange?: (newOpen: boolean) => void
  className?: string
}

const Popover: React.FC<IPopoverProps> = ({
  children,
  content,
  open = false,
  onOpenChange,
  className,
}) => {
  const popoverChildRef = useRef<HTMLInputElement | null>(null)

  const setOpenValue = (openValue: boolean) => {
    if (!onOpenChange) {
      return
    }

    onOpenChange(openValue)
  }

  return (
    <div
      className={classNames('ndt-popover', className)}
      style={{ position: 'relative' }}
    >
      <div
        className="ndt-popover-child"
        ref={popoverChildRef}
        onClick={() => setOpenValue(true)}
      >
        {children}
      </div>
      {open && (
        <PopoverContent
          onOutsideClick={() => setOpenValue(false)}
          popoverChildRef={popoverChildRef}
        >
          {content}
        </PopoverContent>
      )}
    </div>
  )
}

export default Popover
