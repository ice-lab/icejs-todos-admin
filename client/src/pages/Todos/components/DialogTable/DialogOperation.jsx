import React, { useRef, useCallback } from 'react';
import { Dialog } from '@alifd/next';
import Operation from './Operation';

const getDialogTitle = actionType => {
  switch (actionType) {
    case 'add':
    default:
      return '添加 TODO';

    case 'edit':
      return '编辑 TODO';

    case 'preview':
      return '查看 TODO';
  }
};

const DialogOperation = props => {
  const { actionType, dataSource, onOk = () => {}, ...lastProps } = props;
  const operationRef = useRef(null);
  const handleOk = useCallback(() => {
    if (actionType === 'preview') {
      return onOk(null);
    }

    operationRef.current.getValues(values => {
      onOk(values);
    });
  }, [actionType, onOk]);
  return (
    <Dialog
      shouldUpdatePosition
      isFullScreen
      title={getDialogTitle(actionType)}
      style={{
        width: 600,
      }}
      footerAlign="center"
      {...lastProps}
      onOk={handleOk}
    >
      <Operation ref={operationRef} actionType={actionType} dataSource={dataSource} />
    </Dialog>
  );
};

export default DialogOperation;
