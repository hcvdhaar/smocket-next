import { revalidatePath } from 'next/cache';
import { ActionResponse } from './types';
import { isObject } from '../utils/is-object';

export function createResponse<DataType>(
  data: DataType | null,
  errorMessage: string | null
): ActionResponse<DataType> {
  const error = errorMessage ? { message: errorMessage } : null;

  return {
    data,
    error,
  };
}

export async function handleRequest<DataType>(
  dbAction: () => Promise<DataType>,
  revalidatePathAsString?: string
) {
  try {
    const response = await dbAction();

    if (revalidatePathAsString) {
      revalidatePath(revalidatePathAsString);
    }

    return createResponse(response, null);
  } catch (error: any) {
    if (isObject(error) && 'message' in error) {
      return createResponse(null, error.message);
    }

    return createResponse(null, 'Something went wrong');
  }
}
