import * as React from 'react'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'

import Home from './views/Home'
import AboutUs from './views/AboutUs'

const component: React.SFC = () => {
  return (
    <div>
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/contact'} component={AboutUs} />
      </Switch>
    </div>
  )
}

export default component
