import React, { PureComponent, Fragment } from 'react';
import {Redirect, Route, Switch} from 'dva/router'
import {getRoutes} from '../../../utils/utils'
import NotFound from '../../Exception/404'

export default class PublishInfo extends PureComponent {
  render() {
    const {match, routerData} = this.props

    return (
      <Fragment>
        <Switch>
          {getRoutes(match.path, routerData).map((item) => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          ))}
          <Redirect
            exact
            from="/publish/publishInfo"
            to="/publish/publishInfo/list"
          />
          <Route render={NotFound}/>
        </Switch>
      </Fragment>
    )
  }
}
