import {ReactNode} from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  redirect,
  Route,
  RouterProvider,
  useRouteLoaderData,
} from 'react-router-dom'

import {InstructorDashboard, StudentDashboard} from './pages/dashboard/page'
import {InstructorHistory, StudentHistory} from './pages/history/page'
import {Layout} from './pages/layout'
import {LoginPage} from './pages/login/page'
import {LandingPage} from './pages/page'
import {purchaseLoader} from './pages/purchase/loader'
import {StudentPurchase} from './pages/purchase/page'
import {StudentSchedule} from './pages/schedule/page'
import {searchPageLoader} from './pages/search/loader'
import {SearchPage} from './pages/search/page'

export function App() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route id="root" loader={checkAuthLoader} element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              {({isStudent}) => (isStudent ? <StudentDashboard /> : <InstructorDashboard />)}
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              {({isStudent}) => (isStudent ? <StudentHistory /> : <InstructorHistory />)}
            </RequireAuth>
          }
        />
        <Route
          path="/schedule"
          element={<RequireAuth>{({isStudent}) => isStudent && <StudentSchedule />}</RequireAuth>}
        />
        <Route
          path="/search"
          loader={searchPageLoader}
          element={<RequireAuth>{({isStudent}) => isStudent && <SearchPage />}</RequireAuth>}
        />
        <Route
          path="/purchase"
          loader={purchaseLoader}
          element={<RequireAuth>{({isStudent}) => isStudent && <StudentPurchase />}</RequireAuth>}
        />
      </Route>
    </>,
  ),
)

function checkAuthLoader({request}: LoaderFunctionArgs) {
  // TODO: neet to authorize
  const isAuth = true
  const isStudent = true

  if (!isAuth) {
    return redirect('/login')
  }
  // TODO: need to set return type; type CheckAuthLoaderReturn
  return {isStudent}
}

interface RequireAuthProps {
  children: ReactNode | ((arg: any) => ReactNode)
}

function RequireAuth({children}: RequireAuthProps) {
  const user = useRouteLoaderData('root')

  return <>{typeof children === 'function' ? children(user) : children}</>
}
