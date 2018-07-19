import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class Accepted extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="被帮助列表">
        <Card>accepted list</Card>
      </PageHeaderLayout>
    );
  }
}
