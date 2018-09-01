import React, { PureComponent } from 'react';
import StandardTable from 'components/StandardTable';
import { Divider } from 'antd';

export default class StudentInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      editingKey: '',
    };
  }

  handleStandardTableChange = () => {};

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  render() {
    const { selectedRows } = this.state;
    const { loading, studentInfos } = this.props;

    const columns = [
      {
        title: '学生姓名',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '家长姓名',
        dataIndex: 'parentName',
        editable: true,
      },
      {
        title: '关系',
        dataIndex: 'relationShip',
        editable: true,
      },
      {
        title: '家长手机号',
        dataIndex: 'phone',
        editable: true,
      },
      {
        title: '操作',
        render: (text, record, index) => {
          const editable = this.isEditing(record);
          return (
            <Fragment>
              {editable ? (
                <div>
                  <a onClick={() => {}}>提交</a>
                  <Divider type="vertical" />
                  <a onClick={() => {}}>取消</a>
                </div>
              ) : (
                <a onClick={() => {}}>编辑</a>
              )}
            </Fragment>
          );
        },
      },
    ];

    return (
      <StandardTable
        showSelection="none"
        selectedRows={selectedRows}
        loading={loading}
        data={studentInfos || []}
        columns={columns}
        onChange={this.handleStandardTableChange}
      />
    );
  }
}
