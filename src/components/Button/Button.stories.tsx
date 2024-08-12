import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: { control: 'text', defaultValue: 'Click' },
    color: { control: 'text', defaultValue: 'red-500' },
    btnType: { control: 'text', defaultValue: 'lg' },
  },
};

export default meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '버튼',
  color: 'yellow-500',
  btnType: 'sm',
};
