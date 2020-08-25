import React from 'react';
import { ResponsiveGrid, Card } from '@alifd/next';
import PageHeader from '@/components/PageHeader';

const { Cell } = ResponsiveGrid;

const Analysis = () => (
  <ResponsiveGrid gap={20}>
    <Cell colSpan={12}>
      <PageHeader
        title="首页"
        breadcrumbs={[
          {
            name: '首页',
          },
        ]}
      />
    </Cell>
    <Cell colSpan={12}>
      <Card>
        TODO 后台管理系统
      </Card>
    </Cell>
  </ResponsiveGrid>
);

export default Analysis;
