import { rest } from 'msw';
import { user, board } from './mockData';

const baseUrl = 'http://localhost/api';

const handlers = [
  rest.get(`${baseUrl}/${user.id}/boards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([board]));
  }),
  rest.get(`${baseUrl}/b/${board.id}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(board));
  }),
];

export { handlers };
