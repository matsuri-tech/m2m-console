import { PageHeader } from "../components/PageHeader/PageHeader"
import { Table, Typography, UseTableCellProps, useTable } from "matsuri-ui"
import { User, displayAuthority, useUsers } from "../hooks/useUsers"
import { useAuthCtx } from "../hooks/useAuth"
import React, { useMemo } from "react"

export const AuthorityCell: React.FC<UseTableCellProps<User, "authority">> = ({
    cell,
}) => {
    return <>{displayAuthority(cell.value)}</>
}

export const ScopeCell: React.FC<UseTableCellProps<User, "scope">> = ({
    cell,
}) => {
    return <>{JSON.stringify(cell.value)}</>
}

export const ListUsers: React.FC = () => {
    const { token } = useAuthCtx()
    const { data: users } = useUsers(token)
    const usersTableData = useMemo(() => users ?? [], [users])

    const { headers, rows } = useTable({
        columns: {
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
                    </Table.Row>
                </Table.Header>
                <Table.Body striped>
                    {rows.map((row) => (
                        <Table.Row key={row.key}>
                            {row.cells.map((cell, i) => (
                                <Table.Cell key={cell.key}>
                                    {cell.render()}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}
