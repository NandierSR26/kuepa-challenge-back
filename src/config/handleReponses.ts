import { Response } from "express";

interface ResponseProps {
  code: number;
  message: string;
  data?: any;
  res: Response;
  error?: any;
}

export const handleError = ({ code, message, res, data, error }: ResponseProps) => {

  console.log(error);

  return res.status(code).json({
    success: false,
    message
  })

}

export const handleSuccess = ({ code, message = '', res, data }: ResponseProps) => {
  return res.status(code).json({
    success: true,
    data,
    message
  })
}