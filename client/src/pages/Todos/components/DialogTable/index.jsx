import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog, Icon } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';
import todosService from '@/services/todos';
import EmptyBlock from './EmptyBlock';
import ExceptionBlock from './ExceptionBlock';
import DialogOperation from './DialogOperation';
import styles from './index.module.scss';
import { ACTION_TYPE } from './constants';

const getTableDataByOpenId = openId => {
  return ({ current, pageSize }, formData) => {
    if (!formData.status || formData.status === 'normal') {
      let params = {
        current,
        pageSize
      }
      if (openId !== undefined) {
        params = { ...params, openId}
      }
      return todosService.list(params);
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
}

const defaultColumnWidth = {
  id: 200,
  content: 500,
  openId: 200,
};

const addTodo = async ({ content, openId }) => {
  const res = await todosService.add({
    content,
    openId
  });
  return res;
}

const delTodo = async id => {
  const res = await todosService.del(id);
  return res;
}

const editTodo = async (id, { content, openId }) => {
  const res = await todosService.edit(id, { content, openId });
  return res;
}

const DialogTable = (props) => {
  const { match } = props;
  const { openId } = match.params;
  
  const [state, setState] = useSetState({
    columnWidth: defaultColumnWidth,
    optCol: null,
    actionType: 'preview',
    actionVisible: false,
  });
  const { actionVisible, columnWidth, optCol } = state;
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, error, refresh } = useFusionTable(getTableDataByOpenId(openId), {
    field
  });
  const { reset } = search;

  const onResizeChange = (dataIndex, width) => {
    const newWidth = { ...columnWidth };
    newWidth[dataIndex] += width;
    setState({
      columnWidth: newWidth,
    });
  };

  const operationCallback = useCallback(
    ({ actionType, dataSource }) => {
      setState({
        actionType,
        optCol: dataSource,
        actionVisible: true,
      });
    },
    [setState],
  );

  const handleCancel = useCallback(() => {
    setState({
      actionVisible: false,
    });
  }, [setState]);
  const handleOk = useCallback(async data => {
    const { actionType } = state;
    console.log(data);

    if (actionType === 'preview') {
      handleCancel();
      return;
    }

    switch(actionType) {
      case ACTION_TYPE.add: {
        const { openId, content } = data;
        await addTodo({content, openId});
        break;
      }
      case ACTION_TYPE.edit: {
        const { id, openId, content } = data;
        await editTodo(id, { openId, content });
        break;
      }
      default:
    }

    Message.success(actionType === 'add' ? '添加成功!' : '编辑成功!');
    reset();
    handleCancel();
  }, [handleCancel, reset, state]);
  const handleDelete = useCallback(
    data => {
      if (!data) {
        return;
      }

      const { id } = data;

      Dialog.confirm({
        title: '删除提醒',
        content: `确定删除 ${id} 吗`,

        async onOk() {
          await delTodo(id);
          Message.success(`删除 ${id} 成功!`);
          reset();
        },
      });
    },
    [reset],
  );

  const cellOperation = (...args) => {
    const record = args[2];
    return (
      <div>
        <Button
          text
          type="primary"
          onClick={() =>
            operationCallback({
              actionType: 'edit',
              dataSource: record,
            })
          }
        >
          编辑
        </Button>
        &nbsp;&nbsp;
        <Button text type="primary" onClick={() => handleDelete(record)}>
          删除
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() =>
            operationCallback({
              actionType: 'preview',
              dataSource: record,
            })
          }
        >
          查看
        </Button>
      </div>
    );
  };

  const contentColumn = (...args) => {
    const value = [...args][0];
    return (
      <div>
        {
          JSON.stringify(value)
        }
      </div>
    )
  }

  return (
    <div className={styles.DialogTable}>
      <Button
        type="primary"
        onClick={() =>
          operationCallback({
            actionType: 'add'
          })
        }
      >
        <Icon type="add" />添加 TODO
      </Button>
      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            onResizeChange={onResizeChange}
            emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            primaryKey="email"
          >
            <Table.Column title="id" dataIndex="id" resizable width={columnWidth.id} />
            <Table.Column title="内容" dataIndex="content" resizable width={columnWidth.content} cell={contentColumn} />
            <Table.Column title="所属用户" dataIndex="openId" resizable width={columnWidth.openId} />
            <Table.Column
              title="操作"
              resizable
              width={columnWidth.operation}
              cell={cellOperation}
            />
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
      <DialogOperation
        visible={actionVisible}
        actionType={state.actionType}
        dataSource={optCol}
        onOk={handleOk}
        onClose={handleCancel}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default DialogTable;
