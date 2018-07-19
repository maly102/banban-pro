import React, { PureComponent } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card } from 'antd';

export default class GiveHand extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="助人列表">
        <Card>give hand list</Card>
      </PageHeaderLayout>
    );
  }
}
