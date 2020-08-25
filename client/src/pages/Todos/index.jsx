import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import DialogTable from './components/DialogTable';

const { Cell } = ResponsiveGrid;

const FusionDialogTable = (props) => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="todo 列表"
          description="todo 列表"
        />
      </Cell>

      <Cell colSpan={12}>
        <DialogTable {...props}/>
      </Cell>
    </ResponsiveGrid>
  )
};

export default FusionDialogTable;
