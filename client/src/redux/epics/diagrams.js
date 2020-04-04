import {combineEpics, ofType} from 'redux-observable';
import {switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';

import {
    getDiagramsPreviewsSuccessAction,
    getDiagramsPreviewsErrorAction,
} from '@/redux/actions/diagrams';
import {
    GET_DIAGRAMS_PREVIEWS,
} from '@/redux/names/diagrams';
import {getDiagramsPreviews} from '@/services/diagrams';

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

                        return of(getDiagramsPreviewsSuccessAction(diagrams));
                    }),
                ),
            ),
        );

export default combineEpics(getAllDiagramsEpic);
