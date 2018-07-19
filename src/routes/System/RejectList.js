import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class RejectList extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="拒绝列表">
        <Card>reject list</Card>
      </PageHeaderLayout>
    );
  }
}
