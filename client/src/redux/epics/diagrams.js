import {combineEpics, ofType} from 'redux-observable';
import {switchMap, exhaustMap} from 'rxjs/operators';
import {from, of} from 'rxjs';

import {
    getDiagramsPreviewsSuccessAction,
    getDiagramsPreviewsErrorAction,

    deleteDiagramErrorAction,
    deleteDiagramSuccessAction,

    createDiagramSuccessAction,
    createDiagramErrorAction,

    getDiagramFileSuccessAction,
    getDiagramFileErrorAction,
} from '@/redux/actions/diagrams';
import {
    GET_DIAGRAMS_PREVIEWS,
    DELETE_DIAGRAM,
    CREATE_DIAGRAM,
    SELECT_DIAGRAM,
} from '@/redux/names/diagrams';
import {
    getDiagramsPreviews,
    deleteDiagram,
    createDiagram,
    getDiagramXml,
} from '@/services/diagrams';
import {showNormalMessage, showErrorMessage} from '@/redux/actions/messages';

const getAllDiagramsEpic =
    action$ =>
        action$.pipe(
            ofType(GET_DIAGRAMS_PREVIEWS),
            switchMap(
                () => from(
                    getDiagramsPreviews(),
                ).pipe(
                    switchMap(({ok, error, diagrams}) => {
                        if (!ok) {
                            return of(getDiagramsPreviewsErrorAction(error));
                        }

                        return of(
                            getDiagramsPreviewsSuccessAction(diagrams),
                        );
                    }),
                ),
            ),
        );

const getDiagramFileEpic =
    (action$, state$) =>
        action$.pipe(
            ofType(SELECT_DIAGRAM),
            switchMap(
                ({payload: {diagramId}}) => {
                    const {diagram} = state$.value;
                    const {diagrams} = diagram;

                    const selectedDiagram = diagrams.find(
                        ({id}) => diagramId === id,
                    );

                    if (!selectedDiagram) {
                        return of(
                            showErrorMessage(
                                'Поиск диаграммы',
                                'Диаграмма не найлена, обновите, пожалуйста, страницу',
                            ),
                        );
                    }

                    const {fileName} = selectedDiagram;

                    return from(
                        getDiagramXml(fileName),
                    ).pipe(
                        switchMap(({ok, text}) => {
                            if (!ok) {
                                return of(
                                    showErrorMessage(
                                        'Поиск диаграммы',
                                        'Произошла ошибка, попробуйте открыть диаграмму позже',
                                    ),
                                    getDiagramFileErrorAction(),
                                );
                            }

                            return of(
                                showNormalMessage('Поиск диаграммы', 'Успешно загружено'),
                                getDiagramFileSuccessAction(diagramId, text),
                            );
                        }),
                    );
                },
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
                        exhaustMap(({ok, error}) => {
                            if (!ok) {
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


const createDiagramEpic =
action$ =>
    action$.pipe(
        ofType(CREATE_DIAGRAM),
        exhaustMap(
            ({payload: {name}}) =>
                from(
                    createDiagram(name),
                ).pipe(
                    exhaustMap(({ok, error, diagram}) => {
                        if (!ok) {
                            return of(
                                createDiagramErrorAction(error),
                                showErrorMessage('Создание диаграммы', error),
                            );
                        }

                        return of(
                            createDiagramSuccessAction(diagram),
                            showNormalMessage('Создание диаграммы', 'Успешно создано'),
                        );
                    }),
                ),
        ),
    );


export default combineEpics(
    getDiagramFileEpic,
    getAllDiagramsEpic,
    deleteDiagramEpic,
    createDiagramEpic,
);
