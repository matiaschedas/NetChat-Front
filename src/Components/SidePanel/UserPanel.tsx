import { observer } from 'mobx-react-lite'
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Header, Icon, Message, Image, Portal } from 'semantic-ui-react'
import { RootStoreContext } from '../../Stores/rootStore'
import DropdownMenu from './DropdownMenu'


const UserPanel = () => {
  const rootStore = useContext(RootStoreContext)
  const { user, logout, IsLoggedIn, appUserColors } = rootStore.userStore
  const { primaryAppColor } = appUserColors
  const channelStore = rootStore.channelStore
  const { setNavigate } = channelStore
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLSpanElement | null>(null)

  const triggerLogout = () => {
    setNavigate(navigate)
    logout(user?.id!)
    navigate('/login')
  }

  return (
    <Grid style={{ background: primaryAppColor, margin: 0 }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.25em', margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>NetChat</Header.Content>
          </Header>
        </Grid.Row>

        <Header style={{ padding: '0.25em' }} as="h4" inverted>
          {IsLoggedIn && user ? (
            <>
              <span
                ref={triggerRef}
                onClick={() => setOpen(prev => !prev)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Image
                  src={user.avatar ?? 'http://www.gravatar.com/avatar/?=identicon'}
                  spaced="right"
                  avatar
                />
                {user?.userName}
              </span>

              <Portal open={open}>
                <DropdownMenu
                  triggerRef={triggerRef}
                  onClose={() => setOpen(false)}
                  userEmail={user.email}
                  onLogout={triggerLogout}
                />
              </Portal>
            </>
          ) : (
            <Message>
              Don't you have an account? <Link to="/register">Register</Link>
              <br />
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          )}
        </Header>
      </Grid.Column>
    </Grid>
  )
}

export default observer(UserPanel)