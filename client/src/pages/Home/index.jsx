import React from 'react';
import { ResponsiveGrid, Card, Paragraph, Divider } from '@alifd/next';
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
        <Card.Content>
          <Paragraph>
            <h1>TODO 后台管理系统</h1>
          </Paragraph>
          <Divider></Divider>
          <Paragraph>
            <h4>功能说明：</h4>
            代办事项：包含所有用户创建内容<br />
            用户列表：使用 TODO 小程序的所有用户。
          </Paragraph>
        </Card.Content>
    </Cell>
  </ResponsiveGrid>
);

export default Analysis;
