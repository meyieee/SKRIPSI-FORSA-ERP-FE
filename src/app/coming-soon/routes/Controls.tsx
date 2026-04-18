import { FC } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { ChangePassword } from "../../../_metronic/partials/layout/header-menus/ChangePassword";
import { UsersTable } from "../../modules/cf/controls-user-management/UsersTable";
import { UserCreate } from "../../modules/cf/controls-user-management/add-edit/UserCreate";
import { UserUpdate } from "../../modules/cf/controls-user-management/add-edit/UserUpdate";
import { EmployeeRegisterAddAdminGate } from "../../modules/hr/hr-employee-admin/EmployeeRegisterAddAdminGate";
import { EmployeeManagementTable } from "../../modules/hr/hr-employee-admin/EmployeeManagementTable";
import { EmployeeRegisterEdit } from "../../modules/hr/hr-employee-admin/EmployeeRegisterEdit";
import { ProfileProvider } from "../../modules/fia/fia-resource/personal-info/components/ProfileContext";
import { RbacFeatureManagementPage } from "../../modules/cf/rbac-feature-management/RbacFeatureManagementPage";

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
        path='employee-management'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Employee Management</PageTitle>
          <ProfileProvider>
            <EmployeeManagementTable />
          </ProfileProvider>
        </>
        }
      />
      <Route
        path='employee-management/add'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Add Employee</PageTitle>
          <EmployeeRegisterAddAdminGate />
        </>
        }
      />
      <Route
        path='employee-management/edit/:id'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>Update Employee</PageTitle>
          <EmployeeRegisterEdit />
        </>
        }
      />
      <Route path='employee-register/add' element={<Navigate to='/controls/employee-management/add' replace />} />
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
      <Route
        path='rbac-features'
        element={
        <>
          <PageTitle breadcrumbs={accountSettingsBreadcrumbs}>RBAC Features</PageTitle>
          <RbacFeatureManagementPage />
        </>
        }
      />
      </Route>
      <Route index element={<Navigate to='/controls/account-settings' />} />
    </Routes>
  </>
)
}

export default ControlsPage
