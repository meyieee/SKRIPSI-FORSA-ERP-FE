import { FC } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { AccountTable } from "./AccountTable";
import { AddAccountWrapper } from "./add-edit/AddAccount";
import { EditAccountWrapper } from "./add-edit/EditAccount";

const accountBreadcrumbs: Array<PageLink> = [
    {
        title: 'Master',
        path: '/control-file/master/acc/view',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    }
]

const AccountPage: FC = () => {
return (
    <Routes>
        <Route element={<Outlet />}>
        <Route
            path='view'
            element={
            <>
                <PageTitle breadcrumbs={accountBreadcrumbs}>Account Table</PageTitle>
                <AccountTable />
            </>
            }
        />
        <Route
            path='add'
            element={
            <>
                <PageTitle breadcrumbs={accountBreadcrumbs}>Add Account</PageTitle>
                <AddAccountWrapper />
            </>
            }
        />
        <Route
            path='edit/:id'
            element={
            <>
                <PageTitle breadcrumbs={accountBreadcrumbs}>Edit Account</PageTitle>
                <EditAccountWrapper />
            </>
            }
        />
        </Route>
    </Routes>
  )
}

export default AccountPage
