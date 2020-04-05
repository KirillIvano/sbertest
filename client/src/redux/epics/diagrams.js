import {combineEpics, ofType} from 'redux-observable';
import {switchMap, exhaustMap, mergeMap, catchError} from 'rxjs/operators';
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

    renameDiagramErrorAction,
    renameDiagramSuccessAction,

    saveDiagramErrorAction,
    saveDiagramSuccessAction,
} from '@/redux/actions/diagrams';
import {
    GET_DIAGRAMS_PREVIEWS,
    DELETE_DIAGRAM,
    CREATE_DIAGRAM,
    RENAME_DIAGRAM,
    SELECT_DIAGRAM,
    SAVE_DIAGRAM,
} from '@/redux/names/diagrams';
import {
    getDiagramsPreviews,
    deleteDiagram,
    createDiagram,
    getDiagramXml,
    saveDiagram,
    renameDiagram,
} from '@/services/diagrams';
import {
    showNormalMessage,
    showErrorMessage,
    showUnknownErrorMessage,
} from '@/redux/actions/messages';

const getAllDiagramsEpic =
    action$ =>
        action$.pipe(
            ofType(GET_DIAGRAMS_PREVIEWS),
            switchMap(
                ({accessToken}) => from(
                    getDiagramsPreviews(accessToken),
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
            catchError(
                () => of(
                    showUnknownErrorMessage(),
                ),
            ),
        );

const deleteDiagramEpic =
    action$ =>
        action$.pipe(
            ofType(DELETE_DIAGRAM),
            exhaustMap(
                ({accessToken, payload: {diagramId}}) =>
                    from(
                        deleteDiagram(accessToken, diagramId),
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
            catchError(
                () => of(
                    showUnknownErrorMessage(),
                ),
            ),
        );


const createDiagramEpic =
    action$ =>
        action$.pipe(
            ofType(CREATE_DIAGRAM),
            exhaustMap(
                ({accessToken, payload: {name}}) =>
                    from(
                        createDiagram(accessToken, name),
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
            catchError(
                () => of(
                    showUnknownErrorMessage(),
                ),
            ),
        );

const renameDiagramEpic =
    action$ =>
        action$.pipe(
            ofType(RENAME_DIAGRAM),
            exhaustMap(
                ({accessToken, payload: {diagramId, name}}) =>
                    from(
                        renameDiagram(accessToken, diagramId, name),
                    ).pipe(
                        exhaustMap(({ok, error, diagram}) => {
                            if (!ok) {
                                return of(
                                    renameDiagramErrorAction(error),
                                    showErrorMessage('Переименование диаграммы', error),
                                );
                            }

                            return of(
                                renameDiagramSuccessAction(diagram),
                                showNormalMessage('Переименование диаграммы', 'Успешно переименовано'),
                            );
                        }),
                    ),
            ),
            catchError(
                () => of(
                    showUnknownErrorMessage(),
                ),
            ),
        );

const saveDiagramFileEpic =
    action$ =>
        action$.pipe(
            ofType(SAVE_DIAGRAM),
            exhaustMap(
                ({accessToken, payload: {diagramId, xmlContent}}) => from(
                    saveDiagram(accessToken, diagramId, xmlContent),
                ).pipe(
                    switchMap(({ok, error}) => {
                        if (!ok) {
                            return of(
                                showErrorMessage(
                                    'Сохранение диаграммы',
                                    'Произошла ошибка, попробуйте открыть диаграмму позже',
                                ),
                                saveDiagramErrorAction(error),
                            );
                        }

                        return of(
                            showNormalMessage('Сохранение диаграммы', 'Успешно сохранено'),
                            saveDiagramSuccessAction(),
                        );
                    }),
                ),
            ),
            catchError(
                () => of(
                    showUnknownErrorMessage(),
                ),
            ),
        );

const getDiagramFileEpic =
    (action$, state$) =>
        action$.pipe(
            ofType(SELECT_DIAGRAM),
            mergeMap(
                ({accessToken, payload: {diagramId}}) => {
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
                        getDiagramXml(accessToken, fileName),
                    ).pipe(
                        mergeMap(({ok, text}) => {
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
            catchError(
                () => of(
                    showUnknownErrorMessage(),
                ),
            ),
        );



export default combineEpics(
    getAllDiagramsEpic,
    deleteDiagramEpic,
    createDiagramEpic,
    renameDiagramEpic,
    saveDiagramFileEpic,
    getDiagramFileEpic,
);
