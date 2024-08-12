import { Meta, StoryFn } from '@storybook/react';
import { Input, InputProps } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'text',
      defaultValue: 'text',
    },
    bsize: {
      control: 'text',
      defaultValue: 'md',
    },
    placeholder: {
      control: 'text',
      defaultValue: '입력해주세요',
    },
  },
};

export default meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  bsize: 'lg',
  placeholder: '입력해주세요',
};
