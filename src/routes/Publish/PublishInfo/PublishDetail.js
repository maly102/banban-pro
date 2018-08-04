import React, { PureComponent, Fragment } from 'react';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import FooterToolbar from 'components/FooterToolbar'
import DescriptionList from 'components/DescriptionList';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {Button, Card} from 'antd';

const { Description } = DescriptionList;

@connect(({ publish, loading }) => ({
  publish,
  loading: loading.models.publish,
}))
export default class PublishDetail extends PureComponent {
  handleReturnBack = (e) => {
    e.preventDefault();

    const {dispatch} = this.props
    dispatch(routerRedux.goBack())
  }

  render() {
    const { publish:{publishDetail} } = this.props;

    const action = (
      <Fragment>
        <Button type="primary" onClick={this.handleReturnBack}>返回</Button>
      </Fragment>
    );
    return (
      <PageHeaderLayout
        title={`发布单号：${publishDetail.publishNum}`}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
      >
        <Card title="发布人基础信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户编号">付小小</Description>
            <Description term="注册手机">32943898021309809423</Description>
            <Description term="孩子姓名">3321944288191034921</Description>
            <Description term="家长姓名">18112345678</Description>
            <Description term="任务生成时间">18112345678</Description>
            <Description term="帮助开始时间">18112345678</Description>
            <Description term="帮助结束时间">18112345678</Description>
            <Description term="助人币">18112345678</Description>
            <Description term="任务状态">18112345678</Description>
            <Description term="帮助类型">18112345678</Description>
          </DescriptionList>
        </Card>

        <Card title="帮助人基础信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="用户编号">付小小</Description>
            <Description term="注册手机">32943898021309809423</Description>
            <Description term="孩子姓名">3321944288191034921</Description>
            <Description term="家长姓名">18112345678</Description>
            <Description term="关系">18112345678</Description>
            <Description term="同学家长姓名">18112345678</Description>
          </DescriptionList>
        </Card>

        <Card title="发布人备注" style={{ marginBottom: 24 }} bordered={false}>
          <div>
            这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长
          </div>
        </Card>

        <FooterToolbar>
          <Button>
            取消发布
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
