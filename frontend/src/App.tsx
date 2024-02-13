import {ReactNode} from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunction,
  Outlet,
  redirect,
  Route,
  RouterProvider,
  useRouteLoaderData,
} from 'react-router-dom'

import {Sidebar} from './components/sidebar'
import {InstructorDashboard, StudentDashboard} from './pages/dashboard/page'
import {InstructorHistory, StudentHistory} from './pages/history/page'
import {StudentPurchase} from './pages/purchase/page'
import {StudentSchedule} from './pages/schedule/page'

const customLoader: LoaderFunction = ({request}) => {
  // TODO: neet to authorize
  const isAuth = true
  const isStudent = true

  if (!isAuth) {
    return redirect('/login')
  }
  return {isStudent}
}

export function App() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

function Layout() {
  return (
    <>
      <Sidebar.Root>
        <Sidebar.LinkList>
          <Sidebar.Link icon="home" to="/dashboard" label="홈" />
          <Sidebar.Link icon="history" to="/history" label="예약 내역" />
          <Sidebar.Link icon="makeReservation" to="/schedule" label="연수 예약" />
        </Sidebar.LinkList>
        <Sidebar.Footer>
          <Sidebar.ChatButton />
        </Sidebar.Footer>
      </Sidebar.Root>

      <Outlet />
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<>landing page</>} />
      <Route path="/login" element={<>login</>} />
      <Route id="root" loader={customLoader} element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ? <StudentDashboard /> : <InstructorDashboard />
              }}
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ? <StudentHistory /> : <InstructorHistory />
              }}
            </RequireAuth>
          }
        />
        <Route
          path="/schedule"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ?? <StudentSchedule />
              }}
            </RequireAuth>
          }
        />
        <Route
          path="/purchase"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ?? <StudentPurchase />
              }}
            </RequireAuth>
          }
        />
      </Route>
    </>,
  ),
)

interface RequireAuthProps {
  children: ReactNode | ((arg: any) => ReactNode)
}

function RequireAuth({children}: RequireAuthProps) {
  const user = useRouteLoaderData('root')

  return <>{typeof children === 'function' ? children(user) : children}</>
}
