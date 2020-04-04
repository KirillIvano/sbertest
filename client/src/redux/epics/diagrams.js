import {combineEpics, ofType} from 'redux-observable';
import {switchMap, exhaustMap} from 'rxjs/operators';
import {from, of} from 'rxjs';

import {
    getDiagramsPreviewsSuccessAction,
    getDiagramsPreviewsErrorAction,

    deleteDiagramErrorAction,
    deleteDiagramSuccessAction,
} from '@/redux/actions/diagrams';
import {
    GET_DIAGRAMS_PREVIEWS,
    DELETE_DIAGRAM,
} from '@/redux/names/diagrams';
import {getDiagramsPreviews, deleteDiagram} from '@/services/diagrams';
import {showNormalMessage, showErrorMessage} from '@/redux/actions/messages';

const getAllDiagramsEpic =
    action$ =>
        action$.pipe(
            ofType(GET_DIAGRAMS_PREVIEWS),
            switchMap(
                () => from(
                    getDiagramsPreviews(),
                ).pipe(
                    switchMap(({diagrams, error}) => {
                        if (error) {
                            return of(getDiagramsPreviewsErrorAction(error));
                        }

                        return of(
                            getDiagramsPreviewsSuccessAction(diagrams),
                        );
                    }),
                ),
            ),
        );

const deleteDiagramEpic =
    action$ =>
        action$.pipe(
            ofType(DELETE_DIAGRAM),
            exhaustMap(
                ({payload: {diagramId}}) =>
                    from(
                        deleteDiagram(diagramId),
                    ).pipe(
                        exhaustMap(({error}) => {
                            if (error) {
                                return of(
                                    deleteDiagramErrorAction(error),
                                    showErrorMessage('Удаление диаграммы', error),
                                );
                            }

                            return of(
                                deleteDiagramSuccessAction(diagramId),
                                showNormalMessage('Удаление диаграммы', 'Успешно удалено'),
                            );
                        }),
                    ),
            ),
        );


export default combineEpics(
    getAllDiagramsEpic,
    deleteDiagramEpic,
);
