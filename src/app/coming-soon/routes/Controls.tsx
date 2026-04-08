import { FC } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { ChangePassword } from "../../../_metronic/partials/layout/header-menus/ChangePassword";
import { UsersTable } from "../../modules/cf/controls-user-management/UsersTable";
import { UserCreate } from "../../modules/cf/controls-user-management/add-edit/UserCreate";
import { UserUpdate } from "../../modules/cf/controls-user-management/add-edit/UserUpdate";
import { EmployeeRegisterAddAdminGate } from "../../modules/hr/hr-employee-admin/EmployeeRegisterAddAdminGate";

const accountSettingsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Controls',
    path: '/controls/account-settings',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ControlsPage: FC = () => {
return (
  <>
    <Routes>
      <Route element={<Outlet />}>
      <Route
        path='account-settings'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Account Settings</PageTitle>
          <UsersTable />
        </>
        }
      />
      <Route
        path='account-settings/add'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Create User</PageTitle>
          <UserCreate />
        </>
        }
      />
      <Route
        path='account-settings/edit/:id'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Update User</PageTitle>
          <UserUpdate />
        </>
        }
      />
      <Route
        path='employee-register/add'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Add Employee</PageTitle>
          <EmployeeRegisterAddAdminGate />
        </>
        }
      />
      <Route
        path='change-password'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Change Password</PageTitle>
          <ChangePassword />
        </>
        }
      />
      <Route path='command-center' element={<Navigate to='/home/command_center' replace />} />
      </Route>
      <Route index element={<Navigate to='/controls/account-settings' />} />
    </Routes>
  </>
)
}

export default ControlsPage