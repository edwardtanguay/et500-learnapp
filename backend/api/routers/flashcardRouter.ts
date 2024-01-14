/* eslint-disable @typescript-eslint/no-namespace */
import { Router } from 'express';
import * as flashcardHandlers from '../handlers/flashcardHandlers';
import { IFlashcard, INewFlashcard, IPatchFlashcard } from '../../../src/shared/interfaces';
import { flashcardInfoRouter } from './flashcardInfoRouter';
import { flashcardGetCleanAndValidate } from '../middleware/flashcardGetCleanAndValidate';
import { flashcardPostCleanAndValidate } from '../middleware/flashcardPostCleanAndValidate';

export const flashcardRouter = Router();

declare global {
	namespace Express {
		interface Request {
			params: {
				suuid: string;
			};
		}
	}
}

// doesn't work
// Object.defineProperty(Object.getPrototypeOf(global.Express.Request), 'params', {
//   get: function () {
//     if (!this._params) {
//       this._params = { suuid: undefined };
//     }
//     return this._params;
//   },
//   set: function (value) {
//     this._params = value;
//   },
//   configurable: true,
//   enumerable: true,
// });

flashcardRouter.use('/info', flashcardInfoRouter);

flashcardRouter.get('/', (_req, res) => {
	try {
		const flashcards = flashcardHandlers.getAllFlashcards();
		res.status(200).json(flashcards);
	}
	catch (e) {
		throw new Error('')
	}
});

// flashcardRouter.get('/:suuid', (req: Express.Request, res: Express.Response, next: NextFunction) => {
// 	console.log('suuid:', req.params.suuid)
// 	next();
// })

// handler for the /user/:id path, which prints the user ID
// app.get('/user/:id', (req, res, next) => {
// 	res.send(req.params.id)
// })

flashcardRouter.get('/:suuid', flashcardGetCleanAndValidate, (req, res) => {
	const suuid = req.params.suuid;
	const flashcard = flashcardHandlers.getOneFlashcard(suuid);
	if (flashcard) {
		res.json(flashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
});

flashcardRouter.post('/', flashcardPostCleanAndValidate, async (req, res) => {
	const newFlashcard: INewFlashcard = req.body;
	const flashcard = await flashcardHandlers.addFlashcard(newFlashcard);
	res.status(201).json(flashcard);
});

flashcardRouter.put('/', async (req, res) => {
	const flashcard: IFlashcard = req.body;
	const replacedFlashcard = await flashcardHandlers.replaceFlashcard(flashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${flashcard.suuid}" not found.`)
	}
});

flashcardRouter.patch('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const patchFlashcard: IPatchFlashcard = req.body;
	const replacedFlashcard = await flashcardHandlers.replaceSomeFieldsInFlashcard(suuid, patchFlashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
});

flashcardRouter.delete('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const deletedFlashcard = await flashcardHandlers.deleteFlashcard(suuid);
	if (deletedFlashcard) {
		res.json(deletedFlashcard);
	} else {
		res.status(404).json(`Flashcard with suuid "${suuid}" not found.`)
	}
})