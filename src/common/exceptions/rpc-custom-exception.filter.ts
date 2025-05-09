import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const rpcError = exception.getError();

    const strRpcError = JSON.stringify(rpcError);

    if (strRpcError.includes('Empty response')) {
      response.status(500).json({
        status: 500,
        message: strRpcError.substring(0, strRpcError.indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      typeof rpcError.status === 'number' &&
      'message' in rpcError
    )
      return response.status(rpcError.status).json(rpcError);

    response.status(400).json({
      status: 400,
      message: 'Bad request exception',
    });
  }
}
