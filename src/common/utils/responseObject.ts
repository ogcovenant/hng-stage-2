interface response {
  status: string;
  message: string;
  data?: object,
  statusCode?: number
} 

export const responseObject = ({ status, message, data, statusCode }: response) => {
  return {
    status,
    message,
    data,
    statusCode
  }
}