import {ReactNode} from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
  useRouteLoaderData,
} from 'react-router-dom'

export function App() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<>landing page</>} />
      <Route
        id="root"
        loader={({request}) => {
          // TODO: neet to authorize
          const isAuth = false

          if (!isAuth) {
            return redirect('/login')
          }
          return {isStudent: true}
        }}
        element={<>home/layout</>}
      >
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ? <>dashboard/student</> : <>dashboard/instructor</>
              }}
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ? <>history/student</> : <>history/instructor</>
              }}
            </RequireAuth>
          }
        />
        <Route
          path="/schedule"
          element={
            <RequireAuth>
              {({isStudent}) => {
                return isStudent ? <>schedule/student</> : <>schedule/instructor</>
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
