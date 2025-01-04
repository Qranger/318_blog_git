import { ElNotification } from 'element-plus';

// 定义一个通知类型的函数
interface NotificationOptions {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

const showNotification = ({ title, message, type }: NotificationOptions) => {
  ElNotification({
    title,
    message,
    type,
  });
};

// 简化命名
export const messageSucceed = (message: string) => {
  showNotification({
    title: 'Success',
    message,
    type: 'success',
  });
};

export const messageWarning = (message: string) => {
  showNotification({
    title: 'Warning',
    message,
    type: 'warning',
  });
};

export const messageInfo = (message: string) => {
  showNotification({
    title: 'Info',
    message,
    type: 'info',
  });
};

export const messageError = (message: string) => {
  showNotification({
    title: 'Error',
    message,
    type: 'error',
  });
};
