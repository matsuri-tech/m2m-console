import { Container, Layout, ListItem, Menu, Row } from "matsuri-ui"
import { useAuthCtx } from "../hooks/useAuth"
import React, { useCallback, useMemo, useState } from "react"
import styled from "styled-components"

const NavContainer = styled.nav`
    border-bottom: 3px solid #f46500;
`

const MenuContainer = styled.div`
    margin: 0 auto;
    padding: 2ex 0;
`

const NavMenu = styled.ul`
    display: flex;
    list-style: none;

    /* liのmarginに対するnegative margin */
    margin-left: -10px;

    li {
        margin: 0 10px;

        a {
            color: inherit;
            text-decoration: none;
        }
    }
`

const NavSpacer = styled.div`
    flex-grow: 1;
`

const NavRightMenu = styled.div`
    display: flex;
    list-style: none;
    justify-content: flex-end;

    a {
        text-decoration: none;
        color: inherit;
    }
`

export const AppHeader: React.FC = () => {
    const { authenticated, requestLogout } = useAuthCtx()
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const open = useMemo(() => Boolean(anchorEl), [anchorEl])
    const handleOpenAccountMenu = useCallback(
        ({ currentTarget }: React.SyntheticEvent) => {
            setAnchorEl((prev) => (prev ? null : currentTarget))
        },
        []
    )
    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    return (
        <NavContainer>
            <Container maxWidth="lg">
                <MenuContainer>
                    <Row>
                        <Layout.Item>
                            <NavMenu>
                                <li>m2m-users</li>
                            </NavMenu>
                        </Layout.Item>
                        <NavSpacer />
                        <Layout.Item>
                            {authenticated && (
                                <NavRightMenu>
                                    <a
                                        role="button"
                                        onClick={handleOpenAccountMenu}
                                    >
                                        アカウント
                                    </a>
                                    <Menu
                                        paperProps={{ elevation: 5 }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClickOutside={handleClose}
                                    >
                                        <ListItem onClick={requestLogout}>
                                            ログアウト
                                        </ListItem>
                                    </Menu>
                                </NavRightMenu>
                            )}
                        </Layout.Item>
                    </Row>
                </MenuContainer>
            </Container>
        </NavContainer>
    )
}
