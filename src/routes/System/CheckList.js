import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class CheckList extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="审核列表">
        <Card>check list</Card>
      </PageHeaderLayout>
    );
  }
}
