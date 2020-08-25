import React, { useEffect, useImperativeHandle } from 'react';
import { Form, Field, Input, Switch } from '@alifd/next';
import { ACTION_TYPE } from './constants';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const Operation = (props, ref) => {
  const { actionType, dataSource } = props;
  const field = Field.useField([]);
  useEffect(() => {
    field.reset();

    let newValues = {
      completed: false
    }

    if (dataSource) {
      const { id, content, openId } = dataSource
      const { text, completed } = content;
      newValues = {
        id,
        text,
        completed,
        openId
      };
    }
    field.setValues(newValues);
  }, [field, dataSource]);
  useImperativeHandle(ref, () => ({
    getValues(callback) {
      field.validate((errors, values) => {
        const { text, completed, id, openId } = values;
        const newValues = {
          openId,
          content: {
            text,
            completed
          },
          id
        }
        if (errors) {
          return;
        }

        callback(newValues);
      });
    },
  }));
  const isPreview = actionType === ACTION_TYPE.preview;

  return (
    <>
      <Form
        isPreview={isPreview}
        fullWidth
        labelAlign={isPreview ? 'left' : 'top'}
        field={field}
        {...formItemLayout}
      >
        {
          (actionType !== ACTION_TYPE.add) ? (
            <FormItem label="id:" required={!isPreview} requiredMessage="必填" >
              <Input name="id" disabled={actionType === ACTION_TYPE.edit} />
            </FormItem>
          ) : ''
        }
        <FormItem label="所属用户:" required={!isPreview} requiredMessage="必填">
          <Input name="openId" />
        </FormItem>
        <FormItem label="内容:" required={!isPreview} requiredMessage="必填">
          <Input.TextArea {...field.init('text')} />
        </FormItem>
        <FormItem label="完成情况:" required={!isPreview} requiredMessage="必填">
          <Switch name="completed" />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(Operation);
