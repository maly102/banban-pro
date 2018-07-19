import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class UserList extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="用户列表">
        <Card>user list</Card>
      </PageHeaderLayout>
    );
  }
}
