import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { logout } from '../userSlice'

export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Ноготочки</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="default"
            variant="flat"
            className="gap-2"
            onClick={handleLogout}
          >
            <CiLogout /> <span>Выйти</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
