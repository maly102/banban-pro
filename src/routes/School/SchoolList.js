import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class SchoolList extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="校园列表">
        <Card>school list</Card>
      </PageHeaderLayout>
    );
  }
}
