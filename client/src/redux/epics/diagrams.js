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

    renameDiagramErrorAction,
    renameDiagramSuccessAction,
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

const renameDiagramEpic =
    action$ =>
        action$.pipe(
            ofType(RENAME_DIAGRAM),
            exhaustMap(
                ({payload: {diagramId, name}}) =>
                    from(
                        renameDiagram(diagramId, name),
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
        );

const saveDiagramFileEpic =
    action$ =>
        action$.pipe(
            ofType(SAVE_DIAGRAM),
            switchMap(
                ({payload: {diagramId, xmlContent}}) => from(
                    saveDiagram(diagramId, xmlContent),
                ).pipe(
                    switchMap(({ok, text}) => {
                        if (!ok) {
                            return of(
                                showErrorMessage(
                                    'Сохранение диаграммы',
                                    'Произошла ошибка, попробуйте открыть диаграмму позже',
                                ),
                                getDiagramFileErrorAction(),
                            );
                        }

                        return of(
                            showNormalMessage('Сохранение диаграммы', 'Успешно сохранено'),
                            getDiagramFileSuccessAction(diagramId, text),
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



export default combineEpics(
    getAllDiagramsEpic,
    deleteDiagramEpic,
    createDiagramEpic,
    renameDiagramEpic,
    saveDiagramFileEpic,
    getDiagramFileEpic,
);
