import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class PublishList extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="发布列表">
        <Card>publish list</Card>
      </PageHeaderLayout>
    );
  }
}
