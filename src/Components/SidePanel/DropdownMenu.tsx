import React, { useEffect, useRef } from 'react'

interface Props {
  triggerRef: React.RefObject<HTMLSpanElement | null>
  onClose: () => void
  userEmail?: string
  onLogout: () => void
}

const DropdownMenu = ({ triggerRef, onClose, userEmail, onLogout }: Props) => {
  const rect = triggerRef.current?.getBoundingClientRect()
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node

  if (
    triggerRef.current &&
    !triggerRef.current.contains(target) &&
    menuRef.current &&
    !menuRef.current.contains(target)
  ) {
    onClose()
  }
}

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, triggerRef])

  if (!rect) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: rect.bottom + 5,
        left: rect.left,
        background: 'white',
        zIndex: 999999,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        borderRadius: 6,
        minWidth: 220,
        overflow: 'hidden'
      }} ref={menuRef}
    >
      <div style={itemStyle({ disabled: true })}>
        Logged as: <strong>{userEmail}</strong>
      </div>

      <div style={itemStyle({ disabled: true })}>
        Change avatar
      </div>

      <div style={itemStyle()} onClick={onLogout}>
        Sign Out
      </div>
    </div>
  )
}

const itemStyle = ({ disabled = false }: { disabled?: boolean } = {}) => ({
  padding: '10px 15px',
  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.6 : 1,
  borderBottom: '1px solid #eee'
})

export default DropdownMenu