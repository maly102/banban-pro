import React, { PureComponent, Fragment } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Redirect, Route, Switch} from 'dva/router'
import {Card} from 'antd'
import {getRoutes} from '../../utils/utils'
import NotFound from '../Exception/404'

export default class SchoolInfo extends PureComponent {
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
            from="/school/schoolInfo"
            to="/school/schoolInfo/list"
          />
          <Route render={NotFound}/>
        </Switch>
      </Fragment>
    )
  }
}
