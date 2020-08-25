import React from 'react';
import { Button, Field, Table, Card, Pagination } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';
import { Link } from 'ice';
import userService from '@/services/users';

import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import styles from './index.module.scss';

const getTableData = ({ current, pageSize }, formData) => {
  if (!formData.status || formData.status === 'normal') {
    const res = userService.list({ current, pageSize }).then(data => {
      const { total, list } = data;
      return {
        total,
        list
      }
    })
    return res;
  }

  if (formData.status === 'empty') {
    return Promise.resolve([]);
  }

  if (formData.status === 'exception') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('data exception'));
      }, 1000);
    });
  }

  return Promise.resolve([]);
};

const defaultColumnWidth = {
  openId: 300,
  username: 200,
  todos: 500
};

const OperationColumn = (...args) => {
  const row = args[2];
  const { openId } = row;
  return (
    <Link to={{ pathname: `/users/${openId}` }}>查看 todo</Link>
  )
}

const DialogTable = () => {
  const [state, setState] = useSetState({
    columnWidth: defaultColumnWidth,
  });
  const { columnWidth } = state;
  const field = Field.useField([]);
  const { paginationProps, tableProps, error, refresh } = useFusionTable(getTableData, {
    field,
  });

  const onResizeChange = (dataIndex, width) => {
    const newWidth = { ...columnWidth };
    newWidth[dataIndex] += width;
    setState({
      columnWidth: newWidth,
    });
  };

  return (
    <div className={styles.DialogTable}>
      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            onResizeChange={onResizeChange}
            emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            primaryKey="id"
          >
            <Table.Column title="openId" dataIndex="openId" resizable width={columnWidth.openId} />
            <Table.Column title="username" dataIndex="username" resizable width={columnWidth.username} />
            <Table.Column title="操作" resizable cell={OperationColumn} />
          </Table>
          <Pagination
            style={{
              marginTop: 16,
              textAlign: 'right',
            }}
            totalRender={total => (
              <>
                共{' '}
                <Button text type="primary">
                  {total}
                </Button>{' '}
                个记录
              </>
            )}
            {...paginationProps}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default DialogTable;
