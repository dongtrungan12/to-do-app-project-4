import 'source-map-support/register'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { createTodo } from '../../businessLogic/todos'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  // ensure todoItem name is not empty
  if (!newTodo.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'name is empty'
      })
    }
  }

  const todoItem = await createTodo(event, newTodo)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: todoItem
    })
  }
}
