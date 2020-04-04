import {
    POP_MESSAGE,
    PUSH_MESSAGE,
} from '@/redux/names/messages';

let messageId = 0;

const showMessage = (
    title,
    content,
    styling,
) => ({
    type: PUSH_MESSAGE,
    payload: {
        message: {
            id: ++messageId,
            title,
            content,
            styling,
        },
    },
});

export const showErrorMessage = (title, content) => showMessage(title, content, 'error');
export const showNormalMessage = (title, content) => showMessage(title, content, 'normal');

export const removeLastMessage = () => ({
    type: POP_MESSAGE,
});
