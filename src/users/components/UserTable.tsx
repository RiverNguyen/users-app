/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect, useState, useMemo } from 'react'
import { fetchUsers } from '../../redux/users/usersSlice'
import { Loader } from 'lucide-react'

interface UserTableProps {
  page: number
}

const UserTable: React.FC<UserTableProps> = ({ page }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useSelector((state: RootState) => state.users)
  const { loading } = useSelector((state: RootState) => state.users)

  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'ascending' | 'descending'
  }>({ key: '', direction: 'ascending' })

  useEffect(() => {
    dispatch(fetchUsers(page))
  }, [dispatch, page])

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users]
    if (sortConfig.key) {
      sortableUsers.sort((a: any, b: any) => {
        let aValue: string, bValue: string

        if (sortConfig.key === 'name') {
          aValue = `${a.name.first} ${a.name.last}`
          bValue = `${b.name.first} ${b.name.last}`
        } else if (sortConfig.key === 'username') {
          aValue = a.login.username
          bValue = b.login.username
        } else {
          aValue = a[sortConfig.key as keyof typeof a]
          bValue = b[sortConfig.key as keyof typeof b]
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableUsers
  }, [users, sortConfig])

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="relative overflow-x-auto">
      <h1 className="my-4 text-2xl font-semibold text-center">User List</h1>
      {loading === true && (
        <div className="flex justify-center items-center my-10">
          <Loader className="h-8 w-8 text-sky-500 animate-spin" />
        </div>
      )}
      {loading === false && (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-50">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort('name')}
              >
                Full Name
              </th>
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort('username')}
              >
                Username
              </th>
              <th className="px-6 py-3">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user: any) => (
              <tr
                className="bg-white border-b hover:bg-gray-50 cursor-pointer "
                key={user.login.uuid}
              >
                <td className="px-6 py-3">{`${user.name.first} ${user.name.last}`}</td>
                <td className="px-6 py-3">{user.login.username}</td>
                <td className="px-6 py-3">
                  <img src={user.picture.thumbnail} alt="thumbnail" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserTable
