import { arrToMap } from './mapping'

export const addPermissionMap = profile => {
    const permissionMap = arrToMap(
        ({ permissionId }) => permissionId,
        profile.permissions
    )

    return {
        ...profile,
        permissionMap,
    }
}

export const hasAnyPermissions = (permissionList, { permissionMap }) =>
    permissionList.every(permission => permissionMap[permission])

export const hasAllPermissions = (permissionList, { permissionMap }) =>
    permissionList.some(permission => permissionMap[permission])

export const hasNoPermissions = (permissionList, { permissionMap }) =>
    permissionList.some(permission => !permissionMap[permission])
