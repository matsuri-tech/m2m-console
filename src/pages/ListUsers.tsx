import {
    Button,
    Column,
    InputBase,
    Layout,
    ListItem,
    Menu,
    Modal,
    Row,
    SelectField,
    Table,
    Typography,
    UseTableCellProps,
    useAlert,
    useTable,
} from "matsuri-ui"
import { PageHeader } from "../components/PageHeader/PageHeader"
import {
    ScopeAction,
    ScopeResource,
    User,
    UserScope,
    availableScopeActions,
    availableScopeResources,
    castToScopeActions,
    castToScopeResources,
    displayAuthority,
    requestSetScope,
    useUsers,
} from "../hooks/useUsers"
import { useAuthCtx } from "../hooks/useAuth"
import { useHistory } from "react-router"
import MoreIcon from "@material-ui/icons/MoreHoriz"
import React, {
    Reducer,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react"

const scopeReducer: Reducer<
    UserScope,
    | { type: "add"; resource: ScopeResource }
    | { type: "delete"; resource: ScopeResource }
    | {
          type: "update"
          resource: ScopeResource
          value: ScopeAction
      }
    | { type: "set"; value: UserScope }
> = (state, action) => {
    switch (action.type) {
        case "add":
            return action.resource in state
                ? state
                : { ...state, [action.resource]: "none" }
        case "delete":
            return Object.fromEntries(
                Object.entries(state).filter(([key]) => key !== action.resource)
            )
        case "update":
            return action.resource in state
                ? { ...state, [action.resource]: action.value }
                : state
        case "set":
            return action.value
        default:
            throw new Error("unreachable")
    }
}

const ScopeModal: React.FC<{
    open?: boolean
    onClose: () => void
    onClickOutside: () => void
    onSubmit: (scope: UserScope) => void
    defaultScope?: UserScope
}> = ({ defaultScope, onSubmit, ...props }) => {
    const [state, dispatch] = useReducer(scopeReducer, {})
    useEffect(() => {
        if (defaultScope) {
            dispatch({ type: "set", value: defaultScope })
        }
    }, [defaultScope])

    const handleDelete = useCallback(
        ({ currentTarget }: React.SyntheticEvent) => {
            const attr = currentTarget.getAttribute("data-resource")
            const resource = attr ? castToScopeResources(attr) : undefined

            if (resource) {
                dispatch({ type: "delete", resource })
            }
        },
        []
    )

    const handleUpdate = useCallback(
        (key: string) => ({
            currentTarget,
        }: React.ChangeEvent<HTMLInputElement>) => {
            const resource = castToScopeResources(key)
            const value = castToScopeActions(currentTarget.value)

            if (resource && value) {
                dispatch({ type: "update", resource, value })
            }
        },
        []
    )

    const [selectedResource, setSelectedResource] = useState<string>()
    const handleSelectResource = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedResource(event.currentTarget.value),
        []
    )

    const handleAdd = useCallback(() => {
        const resource = selectedResource
            ? castToScopeResources(selectedResource)
            : undefined

        if (resource) {
            dispatch({ type: "add", resource })
        }
    }, [selectedResource])

    const handleSubmit = useCallback(() => {
        onSubmit(Object.keys(state).length === 0 ? { listings: "none" } : state)
    }, [onSubmit, state])

    return (
        <Modal
            backdrop
            header={<Typography variant="h3">Scope</Typography>}
            body={
                <Column>
                    {Object.keys(state).map((key) => (
                        <Row key={key} gap={1} alignItems="center" nowrap>
                            <Layout.Item>
                                <InputBase
                                    readOnly
                                    defaultValue={key}
                                    style={{ minWidth: 200 }}
                                />
                            </Layout.Item>
                            <SelectField
                                defaultValue={state[key]}
                                data={availableScopeActions.map((action) => ({
                                    value: action,
                                }))}
                                style={{ minWidth: 150 }}
                                onChange={handleUpdate(key)}
                            />
                            <Layout.Item>
                                <Button
                                    color="error"
                                    data-resource={key}
                                    onClick={handleDelete}
                                >
                                    削除
                                </Button>
                            </Layout.Item>
                        </Row>
                    ))}
                    <Layout.Item>
                        <Row gap={1} alignItems="center" nowrap>
                            <Layout.Item>
                                <SelectField
                                    data={availableScopeResources
                                        .filter((key) => !(key in state))
                                        .map((value) => ({ value }))}
                                    style={{ minWidth: 200 }}
                                    // defaultValueに適当な値を設定しておかないと、選択時に何も表示されない？
                                    // 実際にはlistingsが選択肢にない場合があるのでここにlistingsを設定するのは特に意味がない
                                    defaultValue="listings"
                                    onChange={handleSelectResource}
                                />
                            </Layout.Item>
                            <Layout.Item>
                                <Button color="primary" onClick={handleAdd}>
                                    追加
                                </Button>
                            </Layout.Item>
                        </Row>
                    </Layout.Item>
                </Column>
            }
            footer={
                <Row justify="flex-end">
                    <Button
                        variant="filled"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        保存
                    </Button>
                </Row>
            }
            style={{ width: 600 }}
            {...props}
        />
    )
}

const AuthorityCell: React.FC<UseTableCellProps<User, "authority">> = ({
    cell,
}) => {
    return <>{displayAuthority(cell.value)}</>
}

const ScopeCell: React.FC<UseTableCellProps<User, "scope">> = ({ cell }) => {
    return <>{JSON.stringify(cell.value)}</>
}

export const ListUsers: React.FC = () => {
    const { token, authenticated } = useAuthCtx()

    // ログインしてなければログイン画面に飛ばす
    // usersはログインしてなくても使えるページ(パスワードリセットなど)とそうでないページがあるためここでリダイレクト処理をしているが、
    // 本当はrouterの分岐するところでauth guardを張るなどした方がいい
    const history = useHistory()
    useEffect(() => {
        if (!authenticated) {
            history.push("/login")
        }
    }, [authenticated, history])

    const { data: users, refetch } = useUsers(token)
    const usersTableData = useMemo(() => users ?? [], [users])

    const { headers, rows } = useTable({
        columns: {
            id: {
                Header: "Id",
            },
            name: {
                Header: "Name",
            },
            email: {
                Header: "Email",
            },
            authority: {
                Header: "Authority",
                Cell: AuthorityCell,
            },
            scope: {
                Header: "Scope",
                Cell: ScopeCell,
            },
        },
        data: usersTableData,
    })

    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const open = useMemo(() => Boolean(anchorEl), [anchorEl])
    const [selectedUserIndex, setSelectedUserIndex] = useState<number>()
    const handleClick = useCallback(
        ({ currentTarget }: React.SyntheticEvent) => {
            const attr = currentTarget.getAttribute("data-row-index")
            setSelectedUserIndex(attr ? parseInt(attr, 10) : undefined)
            setAnchorEl((prev) => (prev ? null : currentTarget))
        },
        []
    )
    const handleClose = useCallback(() => {
        setAnchorEl(null)
    }, [])

    const [scopeModalOpen, setScopeModalOpen] = useState(false)
    const handleEditScope = useCallback(() => {
        handleClose()
        setScopeModalOpen(true)
    }, [handleClose])
    const handleCloseEditScope = useCallback(() => setScopeModalOpen(false), [])

    const selectedUserScope = useMemo(
        () =>
            selectedUserIndex !== undefined
                ? usersTableData[selectedUserIndex].scope
                : undefined,
        [selectedUserIndex, usersTableData]
    )

    const { addAlert } = useAlert()

    const handleUpdateScope = useCallback(
        async (scope: UserScope) => {
            if (selectedUserIndex !== undefined) {
                const { error } = await requestSetScope(token, {
                    userId: usersTableData[selectedUserIndex].id,
                    scope,
                })

                if (error) {
                    addAlert(`Error: ${JSON.stringify(error)}`, {
                        severity: "error",
                    })
                } else {
                    addAlert(`Request succeeded`, {
                        severity: "success",
                        duration: 3500,
                    })
                }
            }

            handleCloseEditScope()
            refetch()
        },
        [
            addAlert,
            handleCloseEditScope,
            refetch,
            selectedUserIndex,
            token,
            usersTableData,
        ]
    )

    return (
        <>
            <PageHeader>
                <Typography variant="h2">ユーザー一覧</Typography>
            </PageHeader>

            <Table>
                <Table.Header>
                    <Table.Row>
                        {headers.map((column) => (
                            <Table.HeaderCell key={column.key}>
                                {column.render()}
                            </Table.HeaderCell>
                        ))}
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body striped>
                    {rows.map((row, index) => (
                        <Table.Row key={row.key}>
                            {row.cells.map((cell) => (
                                <Table.Cell key={cell.key}>
                                    {cell.render()}
                                </Table.Cell>
                            ))}
                            <Table.Cell>
                                <Button
                                    icon={<MoreIcon />}
                                    onClick={handleClick}
                                    data-row-index={index}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClickOutside={handleClose}
                    >
                        <ListItem onClick={handleEditScope}>
                            Scopeを編集
                        </ListItem>
                    </Menu>
                </Table.Body>
            </Table>

            <ScopeModal
                defaultScope={selectedUserScope}
                open={scopeModalOpen}
                onClose={handleCloseEditScope}
                onClickOutside={handleCloseEditScope}
                onSubmit={handleUpdateScope}
            />
        </>
    )
}
